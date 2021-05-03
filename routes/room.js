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

// 인게임이 이루어지는 곳
router.get('/:roomid', (req, res, next) => {
    controller.ingame(req, res);
});

module.exports = router;
