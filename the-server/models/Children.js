const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childrenSchema = new Schema({
	first: String,
	last: String,
	strikes: Number,
	timeouts: []
});

module.exports = User;
