const express = require('express');
const cors = require('cors');
const fs = require('fs');
const cookieParser = require("cookie-parser");
require("dotenv").config();

const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
    cors({
        origin: ["https://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST", "OPTIONS"],
    })
);


app.get('/', (req, res) => {
    res.send('hello World');
});


const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(HTTPS_PORT, () => { console.log("server runnning ", HTTPS_PORT) });
module.exports = httpsServer;