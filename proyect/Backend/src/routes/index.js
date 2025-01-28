import { Router } from 'express';

import users  from './users.js';
import notas from './notas.js';

const router = Router();

router.use('/users', users);
router.use('/notas', notas);

export default router;