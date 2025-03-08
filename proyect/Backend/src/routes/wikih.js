import { Router } from "express";
import { fetchCharacters, fetchCharacter, updateCharacter, postCharacter, deleteCharacter } from "../controllers/wikiData.js";
const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     
 *     servers:
 *       - url: http://localhost:3000/api/v1/wikih
 *     summary: Retrieve a list of characters
 *     responses:
 *       200:
 *         description: A list of characters
 */
router.get('/', fetchCharacters);

/**
 * @swagger
 * /{id}:
 *   get:
 *     
 *     servers:
 *       - url: http://localhost:3000/api/v1/wikih/
 *     summary: Retrieve a single character by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The character ID
 *     responses:
 *       200:
 *         description: A single character
 */
router.get('/:id', fetchCharacter);

/**
 * @swagger
 * /update/{id}/{token}:
 *   put:
 *     
 *     servers:
 *       - url: http://localhost:3000/api/v1/wikih/update/
 *     summary: Update a character by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The character ID
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
 *               content:
 *                 type: object
 *                 properties:
 *                   intro:
 *                     type: string
 *                   appereance:
 *                     type: string
 *                   personality:
 *                     type: string
 *                   history_Plot:
 *                     type: object
 *                     properties:
 *                       past:
 *                        type: string
 *                       Al_campo:
 *                        type: string
 *                       vuelta_ciudad:
 *                        type: string
 *                       consorcio:
 *                        type: string
 *                       trabaja_en_ti:
 *                        type: string
 *                       el_bosque:
 *                        type: string
 *                       troncos_barrotes:
 *                        type: string
 *                       trivia:
 *                        type: array
 *                        items:
 *                         type: string
 *               titleImage:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               sexo:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               species:
 *                 type: string
 *     responses:
 *       200:
 *         description: Character updated
 */
router.put('/update/:id/:token', updateCharacter);

/**
 * @swagger
 * /new/{token}:
 *   post:
 *     
 *     servers:
 *       - url: http://localhost:3000/api/v1/wikih/new/
 *     summary: Create a new character
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
 *               content:
 *                 type: object
 *                 properties:
 *                   intro:
 *                     type: string
 *                   appereance:
 *                     type: string
 *                   personality:
 *                     type: string
 *                   history_Plot:
 *                     type: object
 *                     properties:
 *                       past:
 *                        type: string
 *                       Al_campo:
 *                        type: string
 *                       vuelta_ciudad:
 *                        type: string
 *                       consorcio:
 *                        type: string
 *                       trabaja_en_ti:
 *                        type: string
 *                       el_bosque:
 *                        type: string
 *                       troncos_barrotes:
 *                        type: string
 *                       trivia:
 *                        type: array
 *                        items:
 *                         type: string
 *               titleImage:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               sexo:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               species:
 *                 type: string
 *     responses:
 *       201:
 *         description: Character created
 */
router.post('/new/:token', postCharacter);

/**
 * @swagger
 * /delete/{id}/{token}:
 *   delete:
 *     
 *     servers:
 *       - url: http://localhost:3000/api/v1/wikih/delete/
 *     summary: Delete a character by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The character ID
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The authentication token
 *     responses:
 *       200:
 *         description: Character deleted
 */
router.delete('/delete/:id/:token', deleteCharacter);

export default router;