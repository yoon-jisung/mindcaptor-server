const SocketIO = require('socket.io');
const User = require('../models/index.js').users;
const Room = require('../models/index.js').rooms;

module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });

    app.set('io', io);

    io.on('connection', (socket) => {
        console.log('연결된 socketID : ', socket.id);
        io.to(socket.id).emit('my socket id', { socketId: socket.id });
        console.log(socket.handshake.headers);
        // const roomParams = socket.handshake.headers.referer.split('/');
        // const roomNum = String(roomParams[roomParams.length - 1]);
        // let answer;
        // let presenter;
        // socket.join(roomNum);

        // // 사용자가 나간 경우 - 미구현ß
        // socket.on('disconnect', async () => {
        //     socket.leave(roomNum);
        //     if (io.to(roomNum).length < 2) {
        //         io.to(roomNum).emit('less than two');
        //         await Room.destroy({
        //             where: {
        //                 id: roomNum,
        //             },
        //         });
        //     }
        // });

        // 0. 두명 이하....... 어케 구현

        // 1. 라운드 시작

        socket.on('start round', async () => {
            // 2. 출제자 정하기
            let users = await User.findAll({
                where: { room_id: Number(roomNum) },
            });
            presenter = users[Math.floor(Math.random() * users.length)];
            io.to(roomNum).emit('set presenter', presenter);
        });

        // 3. 출제자의 단어 선택 후 ???
        socket.on('set answer', (arg) => {
            answer = arg;
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

        socket.on('end round', () => {
            answer = '';
        });
    });
};
