import request from 'supertest';
import express from 'express';
import { fetchChapters, fetchChapter, updateChapter, postChapter, deleteChapter } from '../../controllers/chapters.js';
import { ChapterEntry } from '../../services/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// filepath: proyect/Backend/src/controllers/chapters.test.js

jest.mock('../../services/index.js');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.get('/chapters', fetchChapters);
app.get('/chapters/:id', fetchChapter);
app.put('/chapters/:token/:id', updateChapter);
app.post('/chapters/:token', postChapter);
app.delete('/chapters/:token/:id', deleteChapter);

describe('Chapters Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchChapters', () => {
        test('should fetch all chapters', async () => {
            ChapterEntry.find.mockResolvedValue([{ id: 1 }]);
            const response = await request(app).get('/chapters');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ id: 1, title: 'Chapter 1' }]);
        });
    });

    describe('fetchChapter', () => {
        test('should fetch a single chapter by id', async () => {
            ChapterEntry.find.mockResolvedValue([{ id: 1, title: 'Chapter 1' }]);
            const response = await request(app).get('/chapters/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ id: 1, title: 'Chapter 1' }]);
        });
    });

    describe('updateChapter', () => {
        test('should update a chapter', async () => {
            jwt.verify.mockReturnValue({ role: 'admin' });
            ChapterEntry.findOne.mockResolvedValue({ save: jest.fn() });
            const response = await request(app)
                .put('/chapters/token/1')
                .send({ title: 'Updated Title' });
            expect(response.status).toBe(201);
        });

        test('should return 401 if token is invalid', async () => {
            jwt.verify.mockImplementation(() => { throw new Error(); });
            const response = await request(app)
                .put('/chapters/token/1')
                .send({ title: 'Updated Title' });
            expect(response.status).toBe(401);
        });

        test('should return 403 if user is not admin or editor', async () => {
            jwt.verify.mockReturnValue({ role: 'user' });
            const response = await request(app)
                .put('/chapters/token/1')
                .send({ title: 'Updated Title' });
            expect(response.status).toBe(403);
        });
    });

    describe('postChapter', () => {
        test('should create a new chapter', async () => {
            jwt.verify.mockReturnValue({ role: 'admin' });
            ChapterEntry.countDocuments.mockResolvedValue(1);
            const response = await request(app)
                .post('/chapters/token')
                .send({ part: 1, title: 'New Chapter' });
            expect(response.status).toBe(201);
        });

        test('should return 401 if token is invalid', async () => {
            jwt.verify.mockImplementation(() => { throw new Error(); });
            const response = await request(app)
                .post('/chapters/token')
                .send({ part: 1, title: 'New Chapter' });
            expect(response.status).toBe(401);
        });

        test('should return 403 if user is not admin', async () => {
            jwt.verify.mockReturnValue({ role: 'user' });
            const response = await request(app)
                .post('/chapters/token')
                .send({ part: 1, title: 'New Chapter' });
            expect(response.status).toBe(403);
        });
    });

    describe('deleteChapter', () => {
        test('should delete a chapter', async () => {
            jwt.verify.mockReturnValue({ role: 'admin' });
            const response = await request(app).delete('/chapters/token/1');
            expect(response.status).toBe(200);
        });

        test('should return 401 if token is invalid', async () => {
            jwt.verify.mockImplementation(() => { throw new Error(); });
            const response = await request(app).delete('/chapters/token/1');
            expect(response.status).toBe(401);
        });

        test('should return 403 if user is not admin or editor', async () => {
            jwt.verify.mockReturnValue({ role: 'user' });
            const response = await request(app).delete('/chapters/token/1');
            expect(response.status).toBe(403);
        });
    });
});