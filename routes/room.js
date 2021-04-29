const express = require('express');
const router = express.Router();
const controller = require('../controllers/room.js');

// 방 만들기
router.post('/new', (req, res, next) => {
    // 컨트롤러 함수 호출
});

// 방 참여하기
router.post('/join', (req, res, next) => {
    // 컨트롤러 함수 호출
});

module.exports = router;
