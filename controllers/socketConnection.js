const SocketIO = require('socket.io');
const User = require('../models/index.js').users;
const Room = require('../models/index.js').rooms;

module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });

    app.set('io', io);

    io.on('connection', (socket) => {
        const roomParams = socket.handshake.headers.referer.split('/');
        const roomNum = String(roomParams[roomParams.length - 1]);
        let answer;
        let presenter;
        socket.join(roomNum);

        // 사용자가 나간 경우 - 미구현
        socket.on('disconnect', async () => {
            socket.leave(roomNum);
            if (io.to(roomNum).length < 2) {
                io.to(roomNum).emit('less than two');
                await Room.destroy({
                    where: {
                        id: roomNum,
                    },
                });
            }
        });

        // 0. 두명 이하....... 어케 구현

        // 1. 라운드 시작
        socket.on('start round', async () => {
            // 2. 출제자 정하기
            let users = await User.findAll({
                where: { room_id: Number(roomNum) },
            });
            presenter = users[Math.floor(Math.random() * users.length)];
            io.to(roomNum).emit('set presenter', randomUser);
        });

        // 3. 출제자의 단어 선택 후 ???
        socket.on('set answer', (arg) => {
            console.log(arg);
            answer = arg;
        });

        // 참여자들이 채팅을 보낼 때
        socket.on('send message', (userid, message) => {
            if (message === answer) {
                io.to(roomNum).emit('get right answer', userid);
            } else {
                io.to(roomNum).emit('show chat', userid, message);
            }
        });

        socket.on('end round', () => {
            answer = '';
        });
    });
};
