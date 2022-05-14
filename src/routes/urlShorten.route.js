import { createShortUrl, getShortCode } from "../controller/urlShorten.controller"

const router = require('express').Router();

router.post('/shorten', createShortUrl);
router.post('/:shortCode', getShortCode);

export default router;