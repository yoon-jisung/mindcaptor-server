require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const guestRouter = require('./routes/guest');
const registerRouter = require('./routes/register');
const mypageRouter = require('./routes/mypage');
const roomRouter = require('./routes/room');
const userRouter = require('./routes/user');
const { sequelize } = require('./models');

const HTTP_PORT = process.env.HTTP_PORT || 4000;

// 서버가 실행될 때 시퀄라이저의 스키마를 DB에 적용
sequelize.sync({force:true});

/* 테스트용 클라이언트(testClient/chat.ejs)를 위한 뷰 엔진 */

app.set('io', io);
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://ec2-3-15-179-101.us-east-2.compute.amazonaws.com',
        ],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
    })
);
app.use(express.json()); // 요청의 본문을 req.body에 json 형식으로 넣어준다
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/guest', guestRouter);
app.use('/room', roomRouter);
app.use('/mypage/:userid', mypageRouter);
app.use('/user', userRouter);

server.listen(HTTP_PORT, () => {
    console.log('server runnning ', HTTP_PORT);
});

module.exports = server;
//테스트
