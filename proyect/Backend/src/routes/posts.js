import Router from 'express';
import { fetchPosts, fetchPost, commentOnPost, createPost, deletePost } from '../controllers/posts.js';

const router = Router();

router.get('/', fetchPosts);
router.get('/:id', fetchPost);
router.post('/comment/:id/:token', commentOnPost);
router.post('/post/:token', createPost);
router.delete('/delete/:id/:token', deletePost);

export default router;