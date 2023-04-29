import {Router} from 'express';

const router = new Router();

router.get('/', (request, response) => {
	response.send('Jenny Sanderson');
});

export default router;
