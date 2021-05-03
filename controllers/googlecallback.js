require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

module.exports = async (req, res) => {
    // try {
    //     console.log(req.body.authorizationCode)
    // let google = await axios({
    //     method: 'post',
    //     url: `https://oauth2.googleapis.com/token?code=${req.body.authorizationCode}&client_id=${clientID}&client_secret=${clientSecret}&redirect_uri=http://localhost:3000&grant_type=authorization_code`,//'https://oauth2.googleapis.com/token',
    //     // data:{
    //     // client_id: clientID,
    //     // client_secret: clientSecret,
    //     // //redirect_uri: 'http://localhost:3000',
    //     // code: req.body.authorizationCode,
    //     // grant_type: authorization_code
    //     // },
    //     headers: {
    //         //'Content-Type': 'application/x-www-form-urlencoded',
    //         "Accept": "application/json"
            
    //     }
    // })
    // console.log(google.data.access_token)
    // res.send(200, {
    //     accessToken: google.data.access_token
    // });
    // } catch (error) {
    //     console.log(error)
    // }
    

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
    
    res.send(200, {
        accessToken: google.data.access_token
    });
}