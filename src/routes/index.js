const router = require('express').Router();

import urlShortenRoute from './urlShorten.route';


router.use('/v1', urlShortenRoute);


export default router;