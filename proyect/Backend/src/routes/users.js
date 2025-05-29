import { Router } from 'express';
import validateToken from '../middlewares/middleware.js';
import { fetchUsers, fetchUser, updateUser, deleteUser, register, login, frPassword, resPassword } from '../controllers/users.js';
const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *      - Users
 *     servers:
 *      - url: http://localhost:2005/api/v1/
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/', fetchUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *      - Users
 *     servers:
 *      - url: http://localhost:2005/api/v1/
 *     summary: Retrieve a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user
 */
router.get('/:id', fetchUser);

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     tags:
 *      - Users
 *     servers:
 *      - url: http://localhost:2005/api/v1/
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: number
 *               rol:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 */
router.put('/update/:id', updateUser);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     tags:
 *      - Users
 *     servers:
 *      - url: http://localhost:2005/api/v1/   
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete('/delete/:id', deleteUser);

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *      - Users
 *     servers:
 *      - url: http://localhost:2005/api/v1/
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: number
 *               rol:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */
router.post('/register', register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *      - Users
 *     servers:
 *      - url: http://localhost:2005/api/v1/
 *     summary: Login a user
 *     responses:
 *       200:
 *         description: User logged in
 */
router.post('/login', login);

/**
 * @swagger
 * /users/forgot:
 *   post:
 *     tags:
 *      - Users
 *     servers:
 *      - url: http://localhost:2005/api/v1/ 
 *     summary: Request password reset
 *     responses:
 *       200:
 *         description: Password reset requested
 */
router.post('/forgot', frPassword);

/**
 * @swagger
 * /users/forgot/{reseToken}:
 *   post:
 *     tags:
 *      - Users
 *     servers:
 *      - url: http://localhost:2005/api/v1/   
 *     summary: Reset password with token
 *     parameters:
 *       - in: path
 *         name: reseToken
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Password reset
 */
router.put('/forgot/:reseToken', resPassword, validateToken);

export default router;