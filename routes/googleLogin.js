const express = require('express');
const router = express.Router();
const controllers = require('../controllers/googlecallback');

router.post('/', controllers);



module.exports = router;