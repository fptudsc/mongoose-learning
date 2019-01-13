const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: String,
    openning: { type: Boolean, default: true },
    foods: [{
        _foodId: Schema.Types.ObjectId,
        name: String,
        price: Number
    }],
    mixed: Schema.Types.Mixed,  // can be anything
    address: {  // nested
        city: { name: String, zipCode: String },
        street: String,
    },
    staffNames: {    // map of String
        type: Map,
        of: String
    },
    cooks: [String] // array of String
});

module.exports = mongoose.model('Restaurant', restaurantSchema, 'restaurants');