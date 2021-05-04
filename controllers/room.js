const User = require('../models/index.js').users;
const Room = require('../models/index.js').rooms;
const Guest = require('../models/index.js').guests;
const socketConnection = require('./socketConnection');

const joinUser = async (req, room) => {
    // authorization 헤더 내용물이 `Bearer {Token}` 형식이기 때문에 가공해주어야 한다.
    const splited = authorization.split(' ')[1];
    const userData = jwt.verify(splited, process.env.ACCESS_SECRET);
    await User.update({ room_id: room.id }, { where: { id: userData.userId } });
};

module.exports = {
    ingame: async (req, res) => {
        res.send('ok');
    },
    join: async (req, res) => {
        // accessToken이 없으면 반려
        if (!req.headers.authorization) {
            res.status(401).send('accessToken이 없습니다.');
        } else if ((await Room.count()) === 0) {
            res.status(404).send('만들어진 방이 없습니다.');
        } else {
            let room;
            while (1) {
                // 1.방 하나를 가져온다
                await Room.create({ room_name: 1, id: 1 }); // 테스트용 방 생성
                room = await Room.findOne();

                // 2. 해당 방과 연결된 User와 Guest들을 찾는다
                let userNum = await User.count({ where: { room_id: room.id } });
                let guestNum = await Guest.count({
                    where: { room_id: room.id },
                });
                // 3-1. 유저들이 4명 이하이면 사용자를 해당 방에 입장시킨다
                if (userNum + guestNum < 4) {
                    await joinUser(req);
                    break;
                }
                // 3-2. 유저들이 4명 이상이면 다시 1번으로 돌아간다
            }
            res.redirect('../room/' + room.id); // 방에 입장
        }
    },
    new: async (req, res) => {
        if (!req.headers.authorization) {
            res.status(401).send('로그인하지 않은 사용자입니다.');
        } else {
            // 1. 새로운 방을 만든다.
            let newRoom = await Room.create({
                room_name: req.body.room_name,
                room_pw: null,
                limit_time: 3000,
                answer: null,
            });
            // await joinUser(req, newRoom); // 2. 사용자를 그 방과 연결시킨다.

            res.redirect('../' + newRoom.id);
        }
    },
};
