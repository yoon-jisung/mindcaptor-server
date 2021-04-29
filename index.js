require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const guestRouter = require('./routes/guest');
const registerRouter = require('./routes/register');
const mypageRouter = require('./routes/mypage');
const roomRouter = require('./routes/room');
const userRouter = require('./routes/user');

const HTTP_PORT = process.env.HTTP_PORT || 4000;

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

app.listen(HTTP_PORT, () => {
    console.log('server runnning ', HTTP_PORT);
});

module.exports = app;
//테스트
