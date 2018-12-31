const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	password: String,
	momOrDad: String,
  children: [{type: Schema.Types.ObjectId, ref: 'children'}],
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
