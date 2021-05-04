const express = require('express');
const router = express.Router();
const controller = require('../controllers/signup');

router.post('/', controller.post);

module.exports = router;
