const jwt = require('jsonwebtoken');
const { users } = require('../../models');
require('dotenv').config();

module.exports = {
    get: async (req, res) => {
        const authorization = req.headers.authorization;
        let accessTokenData;
        if (authorization) {
            let token = authorization.split(" ")[1];
            try {
                accessTokenData = jwt.verify(token, process.env.JWT_SECRET)
            }
            catch (e) {
                accessTokenData = null;
            }
        }
        if (!accessTokenData) {
            res.json({ data: null, message: "만료된 토큰입니다" })
        } else {
            let userInfo = await users.findOne({
                where: { email: accessTokenData.email }
            })
            if(!userInfo){
                res.status(200).json({ data: userInfo.dataValues, message: "게스트용 토큰이 발급되었습니다" })
            }else{
                delete userInfo.dataValues.password;
                res.status(200).json({ data: userInfo.dataValues, message: "토큰이 발급되었습니다" })
            }
            
        }
    }
};