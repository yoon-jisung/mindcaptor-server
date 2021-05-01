const User = require('../models/index.js').users;
const Room = require('../models/index.js').rooms;
const Guest = require('../models/index.js').guests;
module.exports = function (room, io) {
    io.on('connection', function (socket) {
        socket.join(room.id);
        let interval = setInterval(async () => {
            console.log('here');
            let num =
                (await User.findAll({ where: { room_id: room.id } })) +
                (await Guest.findAll({ where: { room_id: room.id } }));
            if (num > 1) {
                // 1. 라운드 시작
                // 2. 출제자 정하기
                // 4. 출제자의 단어 선택
                // 5. 타이머 스타토
                // 그림 계속 그리고
                // 6. 열심히 정답 맞추기
                // 7. 타이머 종료
                // 8. 결과 출력

                // [server->client] "start round"
                io.to(room.id).emit('start round');
            } else {
                io.to(room.id).emit('less than two');
                socket.leave(room.id);
                clearInterval(interval);
            }
        }, 5000);
    });
};
