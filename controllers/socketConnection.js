const SocketIO = require('socket.io');
const User = require('../models/index.js').users;
const Room = require('../models/index.js').rooms;
const START_SECOND = 5;
module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });

    app.set('io', io);

    io.on('connection', (socket) => {
        let answer;
        let presenter;
        let roomNum;
        let second = START_SECOND;

        // 클라이언트로부터 방 번호를 받는다
        socket.on('send roomNum', async (data) => {
            roomNum = data;
            socket.join(roomNum);
            let users = await User.findAll({
                attributes: ['nickname'],
                where: { room_id: roomNum },
            });
            io.to(roomNum).emit('renew userlist', users);
        });

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

        // 1. 라운드 시작

        socket.on('start round', async () => {
            // 2. 출제자 정하기

            let users = await User.findAll({
                where: { room_id: Number(roomNum) },
            });
            presenter = users[Math.floor(Math.random() * users.length)];
            io.to(roomNum).emit('set presenter', presenter.dataValues);
        });

        // 3. 출제자의 단어 선택 후 ???
        socket.on('set answer', (arg) => {
            if (arg.answer !== '') {
                answer = arg.answer;
                console.log(answer);
                io.to(roomNum).emit('get answer', answer); // 출제자가 선택한 단어를 뿌려줌
                let timer = setInterval(() => {
                    // 타이머(1초에 한번씩 보내줌)
                    if (second === 0) {
                        clearInterval(timer);
                        second = START_SECOND;
                        io.to(roomNum).emit('end round');
                    }
                    io.to(roomNum).emit('timer ticking', second);
                    second--;
                }, 1000);
            }
        });

        socket.on('message', ({ name, message }) => {
            io.emit('message', { name, message });
        });
        // 참여자들이 채팅을 보낼 때

        // socket.on('message', ({ name, message }) => {
        //     if (message === answer) {
        //         io.to(roomNum).emit('get right answer', name);
        //     } else {
        //         io.to(roomNum).emit('show chat', { name, message });
        //     }
        //   });

        socket.on('send paint', (x0, y0, x1, y1, color) => {
            io.to(roomNum).emit('show paint', x0, y0, x1, y1, color);
        });

        // 그림 보낼 때
        socket.on('send paint', (x0, y0, x1, y1, color) => {
            io.to(roomNum).emit('show paint', x0, y0, x1, y1, color);
        });
    });
};
