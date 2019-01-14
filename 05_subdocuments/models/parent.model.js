const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const childSchema = require('./child.model').schema;

const parentSchema = new Schema({
    // array of subdocuments
    children: [childSchema],

    // single nested subdocuments
    child: childSchema
});

// parent's pre middleware
parentSchema.pre('save', function (next) {
    console.log('4. Saved parent');
    next(); // turn to the next middleware
});

parentSchema.pre('validate', function (next) {
    console.log('1. Validated parent');
    next();
});

module.exports = mongoose.model('Parent', parentSchema);