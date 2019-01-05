const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/profile/:id', (req, res, next) => {
	User.findById(req.params.id)
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			res.json(user);
		});
});
module.exports = router;
