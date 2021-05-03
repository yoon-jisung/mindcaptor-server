const jwt = require('jsonwebtoken');
const { users } = require('../../models');
require('dotenv').config();

module.exports = {
    get: async (req, res) => {
        let refreshToken = req.cookies.refreshToken;
        let refreshTokenData;

        if (!refreshToken) {
            res.json({ data: null, message: "refresh토근을 찾을 수 없습니다" });
        } else {
            try {
                refreshTokenData = jwt.verify(refreshToken, process.env.JWT_SECRET);
            }
            catch (e) {
                refreshTokenData = null;
            }
        }
        if (!refreshTokenData) {
            res.json({ data: null, message: "refresh이 발급 되었습니다" });
        } else {
            let userInfo = await users.findOne({ where: { email: refreshTokenData.email } });
            delete userInfo.dataValues.password;
            const accessToken = jwt.sign(userInfo.dataValues, process.env.JWT_SECRET, { expiresIn: "30m" });
            res.json({ data: { accessToken, userInfo: userInfo.dataValues }, message: "재발급 완료" })
        }
    }
}