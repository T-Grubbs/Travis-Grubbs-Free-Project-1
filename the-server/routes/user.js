const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');

//------- SIGNUP METHOD-------------------//

router.post('/signup', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	const momOrDad = req.body.momOrDad;
	const children = req.body.children;

	User.findOne({ username }, (err, foundUser) => {
		if (err) {
			res.json({ message: 'Username check went bad.' });
			return;
		}

		if (foundUser) {
			res.json({ message: 'Username taken. Choose another one.' });
			return;
		}

		const salt = bcrypt.genSaltSync(10);
		const hashPass = bcrypt.hashSync(password, salt);

		const theNewUser = new User({
			username: username,
			password: hashPass,
			momOrDad: momOrDad,
			children: children
		});

		theNewUser.save((err, newuser) => {
			if (err) {
				res.json({ message: 'Saving user to database went wrong.' });
				return;
			}

			console.log('this is the new user >===>', newuser);

			parent.create({
				user: newuser._id
			});

			req.login(theNewUser, (err) => {
				if (err) {
					res.json({ message: 'Login after signup went bad.' });
					return;
				}

				res.json(theNewUser);
			});
		});
	});
});

//---------------LOGIN METHOD-------------

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, theUser, failureDetails) => {
		if (err) {
			res.json({ message: 'Something went wrong authenticating user' });
			return;
		}

		if (!theUser) {
			res.json(failureDetails);
			return;
		}

		req.login(theUser, (err) => {
			if (err) {
				res.json({ message: 'Session save went bad.' });
				return;
			}

			res.json(theUser);
			console.log(theUser);
		});
	})(req, res, next);
});

//-------------LOGOUT METHOD----------------

router.post('/logout', (req, res, next) => {
	req.logout();
	res.json({ message: 'Log out success!' });
});

router.get('/loggedin', (req, res, next) => {
	if (req.isAuthenticated()) {
		res.json(req.user);
		return;
	}
	res.status(500).json({ message: 'Unauthorized' });
});

module.exports = router;
