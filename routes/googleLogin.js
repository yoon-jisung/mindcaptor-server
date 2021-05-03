const express = require('express');
const router = express.Router();
const controller = require('../controllers/googlecallback');

router.post('/', controller);



module.exports = router;