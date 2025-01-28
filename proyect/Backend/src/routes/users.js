import { Router } from 'express';
import { fetchMembers, fetchMember, createMember, updateMemberName, deleteMember } from '../controllers/members.js';
const router = Router();

router.get('/', fetchMembers);
router.get('/:id', fetchMember);
router.post('/create', createMember);
router.put('/update/:id', updateMemberName);
router.delete('/delete/:id', deleteMember);

export default router;