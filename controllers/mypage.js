const User = require('../models/index.js').users;
const Room = require('../models/index.js').rooms;
const Guest = require('../models/index.js').guests;
const Followlist = require('../models/index.js').sequelize.models.followlist;

module.exports = {
    followers: async (req, res) => {
        const userid = req.params.userid;

        const followerIDs = await Followlist.findAll({
            where: { followed_id: userid },
        });

        const followers = followerIDs.map(async (el) => {
            await User.findOne({ where: { id: el } });
        });
        res.status(200).send({
            data: followers,
            message: 'ok',
        });
    },
    followings: async (req, res) => {
        const userid = req.params.userid;

        const followingIDs = await Followlist.findAll({
            where: { following_id: userid },
        });

        const followings = followingIDs.map(async (el) => {
            await User.findOne({ where: { id: el } });
        });
        res.status(200).send({
            data: followings,
            message: 'ok',
        });
    },
    follow: async (req, res) => {
        let email = req.body.email;
        let userid = req.params.userid;

        const newFollowing = await User.findOne({
            where: { email: email },
            attributes: ['id'],
        });
        if (newFollowing.length === 0 || !newFollowing) {
            res.status(404).send({
                message: '해당 이메일을 사용하는 유저가 없습니다.',
            });
        } else {
            await Followlist.create({
                followed_id: newFollowing,
                following_id: user,
            });
            const user = await User.findOne({
                where: { id: userid },
                attributes: ['id'],
            });
            const followerIDs = await Followlist.findAll({
                where: { followed_id: userid },
            });

            const followers = followerIDs.map(async (el) => {
                await User.findOne({ where: { id: el } });
            });
            res.status(200).send({
                data: followers,
                message: 'ok',
            });
        }
    },
    unfollow: async (req, res) => {
        let email = req.body.email;
        let userid = req.params.userid;

        let unfollowUser = await User.findOne({
            where: { email: email },
            attributes: ['id'],
        });

        let numOfDeleted = await Followlist.destroy({
            where: { followed_id: unfollowUser, followed_id: userid },
        });

        if (numOfDeleted === 0 || !numOfDeleted) {
            res.status(404).send({
                message: '팔로우하지 않은 유저를 언팔로우할 수 없습니다.',
            });
        } else {
            const followingIDs = await Followlist.findAll({
                where: { following_id: userid },
            });

            const followings = followingIDs.map(async (el) => {
                await User.findOne({ where: { id: el } });
            });
            res.status(200).send({
                data: followings,
                message: 'ok',
            });
        }
    },
    newpwd: async (req, res) => {},
};
