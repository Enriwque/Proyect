import { Router } from "express";
import { fetchCharacters, fetchCharacter, updateCharacter, postCharacter, deleteCharacter } from "../controllers/wikiData.js";
const router = Router();

/**
 * @swagger
 * /wikih:
 *   get:
 *     tags:
 *       - Characters
 *     servers:
 *       - url: https://proyect-7woy.onrender.com/api/v1
 *     summary: Retrieve a list of characters
 *     responses:
 *       200:
 *         description: A list of characters
 */
router.get('/', fetchCharacters);

/**
 * @swagger
 * /wikih/{id}:
 *   get:
 *     tags:
 *       - Characters    
 *     servers:
 *       - url: https://proyect-7woy.onrender.com/api/v1
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
 * /wikih/update/{id}/{token}:
 *   put:
 *     tags:
 *       - Characters    
 *     servers:
 *       - url: https://proyect-7woy.onrender.com/api/v1
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
 *                   extra:
 *                     type: object
 *                     properties:
 *                       somos_amigos_y_somos_amigos_y:
 *                        type: string
 *                       trivia:
 *                        type: array
 *                        items:
 *                          type: string
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
 * /wikih/new/{token}:
 *   post:
 *     tags:
 *       - Characters    
 *     servers:
 *       - url: https://proyect-7woy.onrender.com/api/v1
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
 *                   extra:
 *                     type: object
 *                     properties:
 *                       somos_amigos_y_somos_amigos_y:
 *                        type: string
 *                       trivia:
 *                        type: array
 *                        items:
 *                          type: string
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
 * /wikih/delete/{id}/{token}:
 *   delete:
 *     tags:
 *       - Characters    
 *     servers:
 *       - url: https://proyect-7woy.onrender.com/api/v1
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