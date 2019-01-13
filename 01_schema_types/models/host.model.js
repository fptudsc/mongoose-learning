const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hostSchema = new Schema({
    name: {
        type: String,
        uppercase: true,
        required: true,
        get: val => `My name is ${val}`,    // getter 
        set: val => val,    // setter
        alias: 'n',
        match: /[A-T2-6]/i  // Regular Expression (RegExp)
    },
    testString: {
        type: String,
        minlength: 2,   // min length is 2
        maxlength: 22,  // max length is 22
        trim: true, // similar to call .trim()
        enum: ['Tea', 'Coffee']
    },
    testNumber: {
        type: Number,
        min: 1, // greater than or equal to 1
        max: 10 // less than or equal to 10
    },
    testDate: {
        type: Date,
        min: new Date('01/01/2000'),
        max: new Date('12/31/2018')
    }
});

// console.log('HOST SCHEMA path(\'name\')');
// console.log(hostSchema.path('name'));

module.exports =mongoose.model('Host', hostSchema, 'hosts');