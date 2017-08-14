const mongoose = require('mongoose');
const { Schema } = mongoose; //= const Schema = mongoose.Schema; es2015 destructuring

const userSchema = new Schema({
   googleId: String
});

mongoose.model('users', userSchema); // create a new model class