import { createShortUrl, getShortCode, getShortCodeStat } from "../controller/urlShorten.controller"

const router = require('express').Router();

router.post('/shorten', createShortUrl);
router.get('/:shortCode', getShortCode);
router.get('/:shortCode/stats', getShortCodeStat);

export default router;