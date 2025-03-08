import { Router } from 'express';
import validateToken from '../middlewares/middleware.js';
import { fetchUsers, fetchUser, updateUser, deleteUser, register, login, frPassword, resPassword } from '../controllers/users.js';
const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     servers:
 *      - url: http://localhost:3000/api/v1/users
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
 *     servers:
 *      - url: http://localhost:3000/api/v1/users
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
 *     servers:
 *      - url: http://localhost:3000/api/v1/users
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
 *     servers:
 *      - url: http://localhost:3000/api/v1/users    
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
 *     servers:
 *      - url: http://localhost:3000/api/v1/users    
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
 *     servers:
 *      - url: http://localhost:3000/api/v1/users    
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
 *     servers:
 *      - url: http://localhost:3000/api/v1/users    
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
 *     servers:
 *      - url: http://localhost:3000/api/v1/users    
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
router.post('/forgot/:reseToken', resPassword, validateToken);

export default router;