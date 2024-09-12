import { Router } from 'express';
import { handleGetShortUrl } from '../controller/shortUrlController';
export const router = Router();

router.route("/:shortid").get(handleGetShortUrl);