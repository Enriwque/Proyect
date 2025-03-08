import capitulos from '../models/chapters.js';
import { ChapterEntry } from '../services/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function fetchChapters(req, res) {
    res.send(await capitulos());
}

async function fetchChapter(req, res) {
    const chapter = await ChapterEntry.find({ id: req.params.id });
    res.send(chapter);
}

async function updateChapter(req, res) {
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
    const chapter = await ChapterEntry.findOne({ id: id });
    if(req.body.part){chapter.part = req.body.part};
    if(req.body.title){chapter.title = req.body.title};
    if(req.body.sinopsis){chapter.sinopsis = req.body.sinopsis};
    if(req.body.desarrollo){chapter.desarrollo = req.body.desarrollo};
    if(req.body.publishDate){chapter.publishDate = req.body.publishDate};
    if(req.body.titleImage){chapter.titleImage = req.body.titleImage};
    await chapter.save();
    res.status(201).send(chapter);
}

async function postChapter(req, res) {
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
    const newChapter = {
        id: await ChapterEntry.countDocuments()+1,
        capOrder: req.body.part,
        part: req.body.part,
        title: req.body.title,
        sinopsis: req.body.sinopsis,
        desarrollo: req.body.desarrollo,
        publishDate: req.body.publishDate,
        titleImage: req.body.titleImage
    }
    const chapter = new ChapterEntry(newChapter);
    await chapter.save();
    res.status(201).send(chapter);
}

async function deleteChapter(req, res) {
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
    await ChapterEntry.deleteOne({ id: id });
    res.send(`Chapter ${id} deleted`);
}

export { fetchChapters, fetchChapter, updateChapter, postChapter, deleteChapter };