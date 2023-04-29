import {Router} from 'express';
import contacts from '../controllers/contacts.js';

const router = new Router();

router.get('/', contacts.getAll);
router.get('/:id', contacts.getSingle);
router.post('/', contacts.post);
router.put('/:id', contacts.put);

export default router;
