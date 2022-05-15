import { createShortUrl, getShortCode, getShortCodeStat } from "../controller/urlShorten.controller"
import { requestValidator } from "../middlewares";

import {validate} from './../validations'

const router = require('express').Router();

router.post('/shorten', validate('create-short-code'), requestValidator, createShortUrl);
router.get('/:shortCode', getShortCode);
router.get('/:shortCode/stats', getShortCodeStat);

export default router;