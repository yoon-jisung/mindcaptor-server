const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/mypage.js');

// 팔로워 목록 가져오기
router.get('/followers', (req, res, next) => {
    controller.followers(req, res);
});

// 팔로잉 목록 가져오기
router.get('/followings', (req, res, next) => {
    // 컨트롤러 함수 호출
});

// 특정 이메일을 가진 유저 팔로우
router.post('/follow', (req, res, next) => {
    // 컨트롤러 함수 호출
});

// 유저 언팔로우
router.post('/unfollow', (req, res, next) => {
    // 컨트롤러 함수 호출
});

// 비밀번호 변경
router.post('/newpwd', (req, res, next) => {
    // 컨트롤러 함수 호출
});
module.exports = router;
