import { notas, getAll } from '../models/notas.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const notasDir = path.join(__dirname, '../models/notas');

// Ensure the notas directory exists
if (!fs.existsSync(notasDir)) {
    fs.mkdirSync(notasDir);
}

async function fetchNotas(req, res) {
    res.send(getAll(notas));
}

async function fetchNota(req, res) {
    res.send(getAll(notas).find(nota => nota.id === parseInt(req.params.id)));
}

async function createNota(req, res) {
    const { name, content } = req.body;
    if (!name || !content) {
        return res.status(400).send({ error: 'Name and content are required.' });
    }

    const newNota = {
        id: notas.length + 1,
        name,
        content
    };

    const rutaNota = path.join(notasDir, `${name}.note`);
    if (fs.existsSync(rutaNota)) {
        return res.status(400).send({ error: 'La nota ya existe.' });
    }

    fs.writeFileSync(rutaNota, content);
    notas.push(newNota);
    res.status(201).send(newNota);
}

async function updateNota(req, res) {
    const { id } = req.params;
    const { name, content } = req.body;

    if (!name || !content) {
        return res.status(400).send({ error: 'Name and content are required.' });
    }

    const nota = getAll(notas).find(nota => nota.id === parseInt(id));
    if (!nota) {
        return res.status(404).send({ error: 'Nota no encontrada.' });
    }

    const rutaNota = path.join(notasDir, `${name}.note`);
    fs.writeFileSync(rutaNota, content);
    nota.name = name;
    nota.content = content;
    res.send(nota);
}

async function deleteNota(req, res) {
    const { id } = req.params;

    const notaIndex = notas.findIndex(nota => nota.id === parseInt(id));
    if (notaIndex === -1) {
        return res.status(404).send({ error: 'Nota no encontrada.' });
    }

    const nota = notas[notaIndex];
    const rutaNota = path.join(notasDir, `${nota.name}.note`);
    fs.unlinkSync(rutaNota);
    notas.splice(notaIndex, 1);
    res.status(200).send({ message: 'Nota eliminada.' });
}

export { fetchNotas, fetchNota, createNota, updateNota, deleteNota };