const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dogSchema = new Schema({
    name: {
        type: String,
    }
});

// Pre
dogSchema.pre('save', function (next) {
    console.log('PRE save');
    // doSomething
    next();
});

// ERROR handling
dogSchema.pre('validate', function (next) {
    const err = new Error('something went wrong');
    // if you call "next()" with an argument, that arg is assumed to be an error
    next(err);
});

// return a promise that rejects
dogSchema.pre('validate', function () {
    return new Promise((resolve, reject) => {
        reject(new Error('something went wrong'));
    });
});

// throw a synchronous error
dogSchema.pre('validate', function () {
    throw new Error('something went wrong');
});

// throw an error in an async function
dogSchema.pre('validate', async function () {
    await Promise.resolve();

    throw new Error('something went wrong');
});

// Document.remove() or Model.remove()
dogSchema.pre('remove', { query: true, document: false }, function () {
    console.log('Removing!');
});
module.exports = mongoose.model('Dog', dogSchema);