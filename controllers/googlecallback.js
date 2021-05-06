require('dotenv').config();
const sha = require('sha256')
const { users } = require('../models')
const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

module.exports = async (req, res) => {
    console.log(req.body.authorizationCode)
    let google = await axios({
        method: 'post',
        url: `https://oauth2.googleapis.com/token?code=${req.body.authorizationCode}&client_id=${clientID}&client_secret=${clientSecret}&redirect_uri=http://localhost:3000&grant_type=authorization_code`,//'https://oauth2.googleapis.com/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'//"Accept": "application/json"
        }
    })
    console.log(google.data)
    let result = await jwt_decode(google.data.id_token)
    console.log('result=',result)
    const {email,name,picture,at_hash} = result
    
    try {
        let [userInfo,created] = await users.findOrCreate({
            where:{email:email},
            defaults:{
                nickname: name,
                email: email,
                password: at_hash,
            }
        })
        if(created){
            const accessToken = await jwt.sign(userInfo,process.env.ACCESS_SECRET,{ expiresIn: '30m' })
            const refreshToken = jwt.sign(
                userInfo,
                process.env.REFRESH_SECRET,
                { expiresIn: '1h' }
            );
            console.log('구글아이디로 회원가입')
            res.cookie('refreshToken', refreshToken, { httpOnly: true });
            res.send(200, {accessToken: accessToken});
        }else{
            const userInfo = {
                nickname: name,
                email: email,
                password: at_hash,
            }
            const accessToken = await jwt.sign(userInfo,process.env.ACCESS_SECRET,{ expiresIn: '30m' })
            const refreshToken = jwt.sign(
                userInfo,
                process.env.REFRESH_SECRET,
                { expiresIn: '24h' }
            );
            res.cookie('refreshToken', refreshToken, { httpOnly: true });
            console.log('구글아이디로 회원정보 있슴')
            res.send(200, {accessToken: accessToken});
        }
        

    } catch (error) {
        res.status(404).json({accessToken: null,message:'소셜로그인 실패'})
    }
    

    
    

    
}