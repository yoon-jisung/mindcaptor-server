const { users } = require('../models')

module.exports = {
    post: async function (req, res) {
        if (req.body.nickname!=='' && req.body.email!=='' && req.body.password!=='') {
            
            let [userInfo,created] = await users.findOrCreate({
                where:{nickname:req.body.email},
                defaults:{
                    nickname: req.body.nickname,
                    email: req.body.email,
                    password: req.body.password,
                }
            })

            if(created){
                res.status(201).json({ data: null,  message: 'created' });
            }else{
                res.status(409).json({ data: null,  message: '해당 이메일은 이미 존재합니다.' });
            }
            
        } else {
            res.status(422).json({ data: null, message: '누락된 값이 있습니다.' })
        }
    },
};
