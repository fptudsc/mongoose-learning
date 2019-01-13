const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    f: {
        type: String,
        alias: 'firstName'  // accessing property name "firstName" will return the value of "f", // setting is also
    },
    l: {
        type: String,
        alias: 'lastName'
    },
    className: String,
    birthday: { type: Date, default: new Date() },
});

// instance methods
studentSchema.methods.findSimilarClassName = function (cb) {
    return this.model('Student').find({ className: this.className }, cb);
};

// add static methods to a Student Model
studentSchema.statics.findByLastName = function (lastName, cb) {
    return this.find({ lastName: new RegExp(lastName, 'i') }, cb);
};

// query helpers
studentSchema.query.byFullName = function (fullName) {
    if (! fullName) throw new Error('incorrect fullName');
    const [firstName, lastName] = fullName.split(' ');
    return this.where( { firstName, lastName });
}

// getter and setter for combining fields
studentSchema.virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    })
    .set(function (val) {
        [this.firstName, this.lastName] = val.split(' ');
    });

module.exports = mongoose.model('Student', studentSchema, 'students');