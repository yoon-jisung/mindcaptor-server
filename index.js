require("dotenv").config();
const cors = require("cors");
const express = require('express');
const app = express();

app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
        methods: ["GET", "POST", "OPTIONS"],
    })
)
app.get('/', (req, res) => {
    res.send('hello World');
});

const HTTP_PORT = process.env.HTTP_PORT || 4000;

app.listen(HTTP_PORT, () => {
    console.log("server runnning ", HTTP_PORT)
});



module.exports = app;
//테스트