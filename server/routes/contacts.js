import {Router} from 'express';
import contacts from '../controllers/contacts.js';

const router = new Router();

router.get('/', contacts.getAll);
router.get('/:id', contacts.getSingle);
router.post('/', contacts.postSingle);
router.put('/:id', contacts.putSingle);
router.delete('/:id', contacts.deleteSingle);

export default router;
