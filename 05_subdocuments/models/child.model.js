const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const childSchema = new Schema({
    name: String
});

// pre middleware of subdocs
childSchema.pre('save', function (next) {
    console.log('3. Saved child');
    next(); // turn to the next middleware
});

childSchema.pre('validate', function (next) {
    console.log('2. Validated child');
    next();
});

module.exports = mongoose.model('Child', childSchema);