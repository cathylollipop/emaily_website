// this is the subdocument model of survey and not necessary required by index.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema ({
    email: String,
    responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;