const User = require('../fakeData/fakeUserData');
const Room = require('../fakeData/fakeRoomData');
const Guest = require('../fakeData/fakeGuestData');

const joinUser = async (req, room) => {
    // authorization 헤더 내용물이 `Bearer {Token}` 형식이기 때문에 가공해주어야 한다.
    const splited = authorization.split(' ')[1];
    const userData = jwt.verify(splited, process.env.ACCESS_SECRET);
    await User.update({ room_id: room.id }, { where: { id: userData.userId } });
};
module.exports = {
    join: async (req, res) => {
        // accessToken이 없으면 반려
        if (!req.headers.authorization) {
            res.status(401).send('accessToken이 없습니다.');
        } else if ((await Room.count()) === 0) {
            res.status(404).send('만들어진 방이 없습니다.');
        } else {
            let room;
            while (1) {
                // 1. 랜덤으로 방 하나를 가져온다
                room = await Room.findOne({ order: 'random()' });

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
            res.status(200).send('ok');
            // 4. 유저를 실시간 소켓에 연결시킨다
        }
    },
};
