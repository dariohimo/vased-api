import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
	try {
		let token = null
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			token = req.headers.authorization.split(' ')[1]
			
		}
		if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) return res.status(400).json({ msg: "Invalid Authentication." });

			req.body.user = user;
			next();
		});
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};
