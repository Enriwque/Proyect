import { Router } from "express";
import { fetchChapters, fetchChapter, updateChapter, postChapter, deleteChapter } from "../controllers/chapters.js";
const router = Router();

/**
 * @swagger
 * /chapters:
 *   get:
 *     tags:
 *       - Chapters
 *     servers:
 *       - url: http://localhost:3000/api/v1/
 *     summary: Retrieve a list of chapters
 *     responses:
 *       200:
 *         description: A list of chapters
 */
router.get('/', fetchChapters);

/**
 * @swagger
 * /chapters/{id}:
 *   get:
 *     tags:
 *       - Chapters
 *     servers:
 *       - url: http://localhost:3000/api/v1/
 *     summary: Retrieve a single chapter by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The chapter ID
 *     responses:
 *       200:
 *         description: A single chapter
 */
router.get('/:id', fetchChapter);

/**
 * @swagger
 * /chapters/update/{id}/{token}:
 *   put:
 *     tags:
 *       - Chapters
 *     servers:
 *       - url: http://localhost:3000/api/v1/
 *     summary: Update a chapter by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The chapter ID
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The authentication token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               capOrder:
 *                 type: number
 *               capType:
 *                 type: string
 *               part:
 *                 type: number
 *               sinopsis:
 *                 type: string
 *               desarrollo:
 *                 type: string
 *               publishDate:
 *                 type: string
 *               titleImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chapter updated
 */
router.put('/update/:id/:token', updateChapter);

/**
 * @swagger
 * /chapters/new/{token}:
 *   post:
 *     tags:
 *       - Chapters
 *     servers:
 *       - url: http://localhost:3000/api/v1/
 *     summary: Create a new chapter
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The authentication token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               capOrder:
 *                 type: number
 *               capType:
 *                 type: string
 *               part:
 *                 type: number
 *               sinopsis:
 *                 type: string
 *               desarrollo:
 *                 type: string
 *               publishDate:
 *                 type: string
 *               titleImage:
 *                 type: string
 *     responses:
 *       201:
 *         description: Chapter created
 */
router.post('/new/:token', postChapter);

/**
 * @swagger
 * /chapters/delete/{id}/{token}:
 *   delete:
 *     tags:
 *       - Chapters
 *     servers:
 *       - url: http://localhost:3000/api/v1/
 *     summary: Delete a chapter by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The chapter ID
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The authentication token
 *     responses:
 *       200:
 *         description: Chapter deleted
 */
router.delete('/delete/:id/:token', deleteChapter);

export default router;