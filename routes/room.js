const express = require('express');
const router = express.Router();
const controller = require('../controllers/room.js');

// 방 만들기
router.post('/new', (req, res, next) => {
    // 컨트롤러 함수 호출
    controller.new(req, res);
});

// 방 참여하기
router.post('/join', (req, res, next) => {
    controller.join(req, res);
});

module.exports = router;
