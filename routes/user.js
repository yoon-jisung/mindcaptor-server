const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.js');

router.get('/search', (req, res, next) => {
    // 컨트롤러 함수 호출
    controller.search(req, res);
});
router.get('/logout', (req, res, next) => {
    // 컨트롤러 함수 호출
    controller.logout(req, res);
});

module.exports = router;
