import { Router } from 'express';
import { ShortenLink, GetLink, Redirect } from '../controllers/linksController';
import { errorHandler } from '../middleware/errorHandling';

const router = Router();

router.post('/shorten', ShortenLink);
router.get('/:shortUrl', Redirect);
router.get('/:shortUrl/details', GetLink);

router.use(errorHandler);

export const linksRouter = router;
