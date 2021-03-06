const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = function pastOrders(req, res, next) {
	const { userID } = req.body;
	let poTokens = [];

	if (userID !== undefined) {
		Order.find({ userID }).then((orders) => {
			orders.sort((a, b) => b.dateTime - a.dateTime);
			if (orders[0] !== undefined) {
				let dateTimeArray = orders[0].dateTime.toString().split(" ");
				let orderDate = [];
				orderDate.push(dateTimeArray[1]);
				orderDate.push(" ");
				orderDate.push(dateTimeArray[2]);
				orderDate.push(" ");
				orderDate.push(dateTimeArray[3]);
				let po1 = {
					id: orders[0].id,
					items: orders[0].items,
					total: orders[0].total,
					dateTime: orderDate,
				};
				const token = jwt.sign(
					po1,
					config.jwt.secret,
					config.jwt.options
				);
				poTokens.push(token);
			}
			if (orders[1] !== undefined) {
				let dateTimeArray = orders[1].dateTime.toString().split(" ");
				let orderDate = [];
				orderDate.push(dateTimeArray[1]);
				orderDate.push(" ");
				orderDate.push(dateTimeArray[2]);
				orderDate.push(" ");
				orderDate.push(dateTimeArray[3]);
				let po2 = {
					id: orders[1].id,
					items: orders[1].items,
					total: orders[1].total,
					dateTime: orderDate,
				};
				const token = jwt.sign(
					po2,
					config.jwt.secret,
					config.jwt.options
				);
				poTokens.push(token);
			}
			if (orders[2] !== undefined) {
				let dateTimeArray = orders[2].dateTime.toString().split(" ");
				let orderDate = [];
				orderDate.push(dateTimeArray[1]);
				orderDate.push(" ");
				orderDate.push(dateTimeArray[2]);
				orderDate.push(" ");
				orderDate.push(dateTimeArray[3]);
				let po3 = {
					id: orders[2].id,
					items: orders[2].items,
					total: orders[2].total,
					dateTime: orderDate,
				};
				const token = jwt.sign(
					po3,
					config.jwt.secret,
					config.jwt.options
				);
				poTokens.push(token);
			}
			res.status(200);
			res.send(JSON.stringify(poTokens));
			return;
		});
	} else {
		res.status(200);
		res.send(JSON.stringify("no orders found"));
	}
};
