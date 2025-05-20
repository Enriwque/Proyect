import { usuarios } from "../models/users.js";
import { WikiUsers } from "../services/index.js";
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
    let goodRol = true;
    const user = await WikiUsers.findOne({ id: req.params.id });
    if(req.body.name){user.name = req.body.name};
    if(req.body.email){user.email = req.body.email};
    if(req.body.password){user.password = await bcrypt.hash(req.body.password, 10)};
    if(req.body.age){user.age = req.body.age};
    if(req.body.rol){
        if(req.body.rol != 'admin' && req.body.rol != 'user' && req.body.rol != 'editor'){
            goodRol = false;
        }else{
            user.rol = req.body.rol;
        }
    };
    if(goodRol){
        await user.save();
        res.status(201).send(user);
    }else{
        res.status(400).send('Invalid rol');
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
    res.send(`User ${req.params.id} deleted`);
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
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
        return res.status(400).send('Invalid email');
    }

    const user = await WikiUsers.findOne({ email });
    if (!user) return res.status(400).send('Email not registered');

    const reseToken = jwt.sign(
        { id: user._id }, // ✅ cambiamos a "id"
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Crea una nueva contraseña',
        html: `
            <p>Haz click en el enlace de abajo para recuperar tu contraseña:</p>
            <a href="${process.env.FRONTEND_URL}/password/${reseToken}">
                Recuperar contraseña
            </a>
        `
    });

    res.status(201).send({ message: 'Email sent' });
}

async function resPassword(req, res) {
    const { newPassword } = req.body;
    const token = req.params.reseToken;

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
        return res.status(400).send('Invalid or too short password');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await WikiUsers.findById(decoded.id); // ✅ usamos decoded.id correctamente

        if (!user) {
            return res.status(400).send('Invalid token or user does not exist');
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).send('Password updated successfully');
    } catch (error) {
        console.error('Error verifying token or updating password:', error);
        res.status(400).send('Invalid or expired token');
    }
}

export { fetchUsers, fetchUser, updateUser, deleteUser, register, login, frPassword, resPassword };