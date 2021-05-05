require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const websocket = require('./controllers/socketConnection');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const guestRouter = require('./routes/guest');
const mypageRouter = require('./routes/mypage');
const roomRouter = require('./routes/room');
const userRouter = require('./routes/user');
const googleRouter = require('./routes/googleLogin');
const signupRouter = require('./routes/signup');
const { sequelize } = require('./models');
const tokenRouter = require('./routes/token_hendle');
const HTTP_PORT = process.env.HTTP_PORT || 4000;

// 서버가 실행될 때 시퀄라이저의 스키마를 DB에 적용

sequelize.sync(/* { force: true } */);

/* 테스트용 클라이언트(testClient/chat.ejs)를 위한 뷰 엔진 */

app.use(
    cors({
        origin: [
            'http://localhost:3000/*',
            'http://localhost:3000',
            'http://localhost:4000',
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
app.use('/guest', guestRouter);
app.use('/room', roomRouter);
app.use('/mypage/:userid', mypageRouter);
app.use('/user', userRouter);
app.use('/signup', signupRouter);
app.use('/googlelogin', googleRouter);
app.use('/', tokenRouter);

server.listen(HTTP_PORT, () => {
    console.log('server runnning ', HTTP_PORT);
});

websocket(server, app);
module.exports = server;
