const { sequelize, UserScore, User } = require('../models/index.js');
const { decodeToken } = require('./User');

/**
 * UserScores controller
 */

const getScoresByEmail = async (sellerEmail) => {
	try {
		const scores = await UserScore.findAll({
			attributes: [[sequelize.fn('AVG', sequelize.col('uScore')), 'score']],
			include: [{
				model: User,
				where: { email: sellerEmail }
			}]
		});
		return scores;
	} catch (error) {
		console.error(error);
		return false;
	}
}

exports.getScore = async (req, res) => {
	let score = "";
	try {
		const score = await getScoresByEmail(req.query.email);
		res.json(score);
		return true;
	} catch {
		res.status(400).json({ "Error": score });
		return false;
	}
}
const scoredThisUser = async (userSend, userReceive) => {
	let msg = '';
	try {
		msg = 'Score added.';
		const score = await UserScore.findAll({
			where: { userReceive, userSend }
		});
		return !!score[0].length;
	} catch {
		return false;
	}
}


exports.addScore = async (req, res) => {
	let msg = '';
	let decodedToken = decodeToken(req.headers.authorization);
	let { userReceive, uScore, createdAt, updatedAt } = req.body;
	if (decodedToken.id == userReceive) return res.status(401).json({ error: "Cannot set score yourself" });
	if (await scoredThisUser(decodedToken.id, userReceive)) {
		return res.status(401).json({ error: "You scored this user already" });
	}
	/*let q2 = `INSERT INTO Images (productId, path, createdAt, updatedAt) 
		VALUES((SELECT MAX(id) FROM Products), ?, ?, ?);`;*/

	try {
		const newUserScore = await UserScore.create({
			sellerId: decodedToken.id, userReceive, uScore, createdAt, updatedAt
		});
		msg = 'Score added.';
		res.status(200).json({ message: "Good" + msg });
		return newUserScore;
	} catch {
		res.status(400)
			.json({ error: "Wrong" });
		return false;
	}
};
