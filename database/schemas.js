const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    cart: Array,
    myBooks: Array
});
const bookSchema = new mongoose.Schema({
    author: String,
    description: String,
    genre: String,
    coverLink: String,
    count: Number,
    Borrow: Array,
    name : String,
});
module.exports.userSchema = userSchema;
module.exports.bookSchema = bookSchema;