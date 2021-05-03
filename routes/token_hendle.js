const express = require('express');
const router = express.Router();
const {accessTokenHandler, refreshTokenHandler} = require('../controllers/Token');

router.get('/accessTokenHandler', accessTokenHandler.get);
router.get('/refreshTokenHandler', refreshTokenHandler.get);


module.exports = router;