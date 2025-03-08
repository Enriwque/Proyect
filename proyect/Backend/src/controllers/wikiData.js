import { characters } from "../models/personajes.js";
import { CharEntry } from "../services/index.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function fetchCharacters(req, res) {
    res.send(await characters());
}

async function fetchCharacter(req,res) {
    const char = await CharEntry.find({ id: req.params.id });
    res.send(char);
}

async function updateCharacter(req, res) {
    const {token, id} = req.params;
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }

    if (decoded.role !== 'admin' && decoded.role !== 'editor') {
        return res.status(403).send('Forbidden: Insufficient permissions');
    }
    const char = await CharEntry.findOne({ id: id });
    if (req.body.title){char.title = req.body.title}
    if (req.body.content){char.content = req.body.content}
    if (req.body.date){char.date = req.body.date}
    if (req.body.titleImage){char.titleImage = req.body.titleImage}
    if (req.body.images){char.images = req.body.images}
    if (req.body.name){char.name = req.body.name}
    if (req.body.age){char.age = req.body.age}
    if (req.body.sexo){char.sexo = req.body.sexo}
    if (req.body.dateOfBirth){char.dateOfBirth = req.body.dateOfBirth}
    if (req.body.species){char.species = req.body.species}
    await char.save();
    res.status(201).send(char);
}

async function postCharacter(req, res) {
    const token = req.params.token;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }

    if (decoded.role !== 'admin') {
        return res.status(403).send('Forbidden: Insufficient permissions');
    }

    const newchar = {
        title: req.body.title,
        content: req.body.content,
        date: new Date(),
        id: await CharEntry.countDocuments()+1,
        titleImage: req.body.titleImage,
        images: req.body.images,
        name: req.body.name,
        age: req.body.age,
        sexo: req.body.sexo,
        dateOfBirth: req.body.dateOfBirth,
        species: req.body.species,
    }

    const char = new CharEntry(newchar);
    await char.save();
    res.status(201).send(char);
}

async function deleteCharacter(req, res) {
    const {token, id} = req.params;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }

    if (decoded.role !== 'admin') {
          return res.status(403).send('Forbidden: Insufficient permissions');
    }

    await CharEntry.deleteOne({ id: id });
    res.send(`Character ${id} deleted`);
}
    

export { fetchCharacters, fetchCharacter, updateCharacter, postCharacter, deleteCharacter };