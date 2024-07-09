import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		httpOnly: true, // more secure cookie cannot be parsed by browser
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
		sameSite: "strict", // CSRF attacks
	});

	return token;
};

export default generateTokenAndSetCookie;