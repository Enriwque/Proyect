import Router from 'express';
import { fetchPosts, fetchPost, commentOnPost, createPost, deletePost } from '../controllers/posts.js';

const router = Router();

/**
 * @swagger
 * /posts/:
 *   get:
 *     tags:
 *       - Posts
 *     servers:
 *       - url: http://localhost:2005/api/v1/
 *     summary: Retrieve a list of posts
 *     responses:
 *       200:
 *         description: A list of posts
 */
router.get('/', fetchPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     servers:
 *       - url: http://localhost:2005/api/v1/
 *     summary: Retrieve a single post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: A single post
 */
router.get('/:id', fetchPost);

/**
 * @swagger
 * /posts/comment/{id}/{token}:
 *   post:
 *     tags:
 *       - Posts
 *     servers:
 *       - url: http://localhost:2005/api/v1/
 *     summary: Comment on a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The user token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added to the post
 */
router.post('/comment/:id/:token', commentOnPost);

/**
 * @swagger
 * /posts/{token}:
 *   post:
 *     tags:
 *       - Posts
 *     servers:
 *       - url: http://localhost:2005/api/v1/
 *     summary: Create a new post
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The user token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Post created
 */
router.post('/post/:token', createPost);

/**
 * @swagger
 * /posts/delete/{id}/{token}:
 *   delete:
 *     tags:
 *       - Posts
 *     servers:
 *       - url: http://localhost:2005/api/v1/
 *     summary: Delete a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The user token
 *     responses:
 *       200:
 *         description: Post deleted
 */
router.delete('/delete/:id/:token', deletePost);

export default router;