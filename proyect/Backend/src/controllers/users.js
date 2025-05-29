import { usuarios } from "../models/users.js";
import { WikiUsers } from "../services/index.js";
import { PostEntry } from "../services/index.js";
// import { wikiPosts } from "../models/Posts.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import transporter from "../services/gmail.js";

async function fetchUsers(req, res) {
    res.send(await usuarios());
}

async function fetchUser(req, res) {
    const user = await WikiUsers.find({ id: req.params.id });
    res.send(user);
}

async function updateUser(req, res) {
  try {
    const user = await WikiUsers.findOne({ id: req.params.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const userOldName = user.name;

    // Actualizar campos del usuario si se proporcionan
    const { name, email, password, age } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (age) user.age = age;

    await user.save();

    // Actualizar nombre en los posts si ha cambiado
    let updatedPostsCount = 0;

    if (name && name.trim() !== userOldName.trim()) {
  const posts = await PostEntry.find();

  const postsToUpdate = posts.filter(post =>
    post.user.trim().toLowerCase() === userOldName.trim().toLowerCase() ||
    post.comments(comment =>
      comment.user && comment.user.trim().toLowerCase() === userOldName.trim().toLowerCase()
    )
  );

  await Promise.all(
    postsToUpdate.map(async (post) => {
      let updated = false;

      // Actualiza autor del post si coincide
      if (post.user.trim().toLowerCase() === userOldName.trim().toLowerCase()) {
        post.user = name;
        updated = true;
      }

      // Actualiza autores de comentarios si coinciden
      post.comments.forEach((comment) => {
        if (comment.user && comment.user.trim().toLowerCase() === userOldName.trim().toLowerCase()) {
          comment.user = name;
          updated = true;
        }
      });

      if (updated) {
        await post.save();
      }

      return post;
    })
  );

  updatedPostsCount = postsToUpdate.length;
}

    res.status(200).json({
      success: true,
      message: `Usuario actualizado correctamente${updatedPostsCount > 0 ? ` y ${updatedPostsCount} posts actualizados` : ', pero no se actualizaron posts'}`,
      user
    });

  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}

async function register(req, res) {
    let pass = true
    const user = await WikiUsers.findOne({ email: req.body.email });
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        age: req.body.age,
        id: await WikiUsers.countDocuments()+1,
        rol: 'user'
    }
    if (req.body.password === 'editor') {
        newUser.rol = 'editor';
    }else if (req.body.password === 'admin') {
        newUser.rol = 'admin';
    }else if(newUser.rol != 'admin' && newUser.rol != 'user' && newUser.rol != 'editor'){
        res.status(400).send('Invalid rol');
        pass = false;
    }else if (user){
        res.status(400).send('User already exists');
        pass = false;
    }

    if (pass){
        const usuario = new WikiUsers(newUser);
        await usuario.save();
        res.status(201).json({ success: true, message: "Usuario creado" });
    }else{
        res.status(400).send('try again');
    }

    
}

async function deleteUser(req, res) {
    await WikiUsers.deleteOne({ id: req.params.id });
    res.status(200).json({ success: true, message: 'Usuario eliminado correctamente' });
}

async function login(req, res) {
    const user = await WikiUsers.findOne({ email: req.body.email });
    if (!user) {res.status(400).send('Email not registered')};

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {res.status(400).send('Incorrect password')};

    const token = jwt.sign({
        userId: user.id,
        role: user.rol

    }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.status(201).send({
        token,
        success: true,
        user: {
            name: user.name,
            email: user.email,
            age: user.age,
            rol: user.rol
        }
    })
}

async function frPassword(req, res) {
    const user = await WikiUsers.findOne({ email: req.body.email });
    if (!user) {res.status(400).send('Email not registered')};

    const reseToken = jwt.sign({
        userEmail: user.email,
        userId: user.id
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const encodedToken = encodeURIComponent(reseToken);

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: 'Crea una nueva contraseña',
        text: "",
        html: `
        <p>Haz click en el enlace de abajo para recuperar tu contraseña:</p>
        <br>
        <a href="http://localhost:5173/password/${encodedToken}">Recuperar contraseña</a>
        `
    });
    
    res.status(201).send({ message: 'Email sent', token: reseToken });
}

async function resPassword(req, res) {
  const newPassword = req.body.newPassword;
  const token = req.params.reseToken;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    const user = await WikiUsers.findOne({ email: decoded.userEmail });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Token inválido o el usuario no existe' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ success: true, message: 'Contraseña actualizada correctamente' });
    
  } catch (error) {
    res.status(400).json({ success: false, message: 'Token inválido', error });
  }
}

export { fetchUsers, fetchUser, updateUser, deleteUser, register, login, frPassword, resPassword };