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
    controller.followings(req, res);
});

// 특정 이메일을 가진 유저 팔로우
router.post('/follow', (req, res, next) => {
    // 컨트롤러 함수 호출
    controller.follow(req, res);
});

// 유저 언팔로우
router.post('/unfollow', (req, res, next) => {
    // 컨트롤러 함수 호출
    controller.unfollow(req, res);
});

// 비밀번호 변경
router.post('/newpwd', (req, res, next) => {
    // 컨트롤러 함수 호출
    controller.newpwd(req, res);
});

// 프로필 이미지 업데이트
router.post('/profile', (req, res, next) => {
    controller.profile(req, res);
});
module.exports = router;
