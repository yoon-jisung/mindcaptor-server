const jwt = require("jsonwebtoken");
const {guests} = require("../models");
require("dotenv").config();

module.exports = {
    get: async (req, res) => {
			// 0. guest 회원정보 추가
            console.log(guests)
			const guest = await guests.create({
				nickname: "guest" + Date.now().toString(),
			});
			

			const accessToken = jwt.sign(
				{ id: guest.id },
				process.env.ACCESS_SECRET,
				{ expiresIn: "3h" }
			);
			const refreshToken = jwt.sign(
				{ id: guest.id },
				process.env.REFRESH_SECRET,
				{ expiresIn: "1d" }
			);
            res.cookie('refreshToken', refreshToken, { httpOnly: true });
            res.json({ data: { accessToken }, message: "Guest Login success!"  })
			// return res
			// 	.set("Refresh-Token", refreshToken)
			// 	.set("Access-Control-Expose-Headers", "Refresh-Token")
			// 	.status(200)
			// 	.json({
			// 		data: {accessToken},
			// 		message: "Guest Login success!",
			// 	});

	},
};
