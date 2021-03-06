const Order = require("../models/Order");

module.exports = function newOrder(req, res, next) {
	let items = req.body.items;
	let total = req.body.total;
	let userID = req.body.userID;
	let dateTime = new Date();
	Order.create({ items, total, userID, dateTime })
		.then((createdOrder) => {
			res.status(201);
			res.send(createdOrder);
		})
		.catch((err) => {
			res.status(400);
			res.send("error");
			console.log(err);
		});
};
