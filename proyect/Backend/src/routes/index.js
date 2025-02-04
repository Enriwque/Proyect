import { Router } from 'express';

import users  from './users.js';
import notas from './notas.js';
import mango from './mango.js';

const router = Router();

router.use('/users', users);
router.use('/notas', notas);
router.use('/mongo', mango);

export default router;