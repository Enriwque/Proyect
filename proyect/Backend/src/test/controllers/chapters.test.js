import request from 'supertest';
import express from 'express';
import { fetchChapters, fetchChapter, updateChapter, postChapter, deleteChapter } from '../../controllers/chapters.js';
import capitulos from '../../models/chapters.js';
import jwt from 'jsonwebtoken';
import { jest, describe, test, expect, beforeAll } from '@jest/globals';

const app = express();
app.use(express.json());
app.get('/chapters', fetchChapters);
app.get('/chapters/:id', fetchChapter);
app.put('/chapters/:token/:id', updateChapter);
app.post('/chapters/:token', postChapter);
app.delete('/chapters/:token/:id', deleteChapter);

jest.mock('../../models/chapters.js', () => jest.fn());
jest.mock('../../services/index.js', () => ({
    ChapterEntry: {
        find: jest.fn(),
        findOne: jest.fn(),
        countDocuments: jest.fn(),
        deleteOne: jest.fn(),
        save: jest.fn(),
    },
}));

describe('Chapters Controller', () => {
    // eslint-disable-next-line no-unused-vars
    let token;

    beforeAll(() => {
        token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET);
    });

    test('fetchChapters should return chapters', async () => {
        const chapters = [{ id: 1, title: 'Chapter 1' }];
        capitulos.mockResolvedValue(chapters);

        const response = await request(app).get('/chapters');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(chapters);
    });
});