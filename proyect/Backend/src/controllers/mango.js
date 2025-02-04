import { connection, chapterEntry, charEntry, getCollection } from '../services/mongodb.js';

function connect(req, res) {
    connection.then(() => {
        res.status(200).send('Conexión exitosa');
    }).catch((error) => {
        res.status(500).send('Error de conexión');
    })
}

function CharEntry(req, res) {
    charEntry.then(() => {
        res.status(200).send('Conexión exitosa');
    }).catch((error) => {
        res.status(500).send('Error de conexión');
    })
}

function ChapterEntry(req, res) {
    chapterEntry.then(() => {
        res.status(200).send('Conexión exitosa');
    }).catch((error) => {
        res.status(500).send('Error de conexión');
    })
}

function GetCollection(req, res) {
    getCollection();
}

export { connect, CharEntry, ChapterEntry, GetCollection };