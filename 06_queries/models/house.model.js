const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const houseSchema = new Schema({
    name: String,
    address: {
        street: String,
        district: String,
        city: String
    },
    year: Number
});

module.exports = mongoose.model('House', houseSchema);