import { Router } from 'express';
import { swaggerUi, swaggerSpec } from '../loaders/swagger.js';

import users  from './users.js';
import wikih from './wikih.js';
import chapters from './chapters.js';
import posts from './posts.js';

const router = Router();

router.use('/users', users);
router.use('/wikih', wikih);
router.use('/chapters', chapters);
router.use('/posts', posts);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;