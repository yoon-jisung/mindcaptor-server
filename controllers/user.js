const User = require('../models/index.js').users;

module.exports = {
    search: async (req, res) => {
        let query = req.query.email;
        let user = await User.findOne({ where: { email: query } });
        if (!user || user.length === 0) {
            res.status(401).send({
                message: '해당 이메일을 사용하는 유저가 없습니다.',
            });
        } else {
            res.status(200).send({
                data: {
                    userInfo: user,
                },
                message: 'ok',
            });
        }
    },
    logout: (req,res) =>{
        console.log('쿠키 삭제')
        console.log(req.cookies)
        res.clearCookie('refreshToken',{httpOnly:true})
    }
}
