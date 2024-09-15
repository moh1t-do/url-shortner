import { Router } from 'express';
import { handleRedirectUrl } from '../controller/redirectUrlController';

export const router = Router();
router.route("/:shortid").get(handleRedirectUrl);