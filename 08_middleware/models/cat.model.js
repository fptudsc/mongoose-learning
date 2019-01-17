const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catSchema = new Schema({
    name: String
});

// Post
catSchema.post('init' , function (doc) {
    console.log(`${doc.id} has been initialized from the db`);
});

catSchema.post('validate', function (doc) {
    console.log(`${doc.id} has been validated`);
});

// taking 2 args, the second assumed to be "next"
catSchema.post('save', function (doc, next) {
    console.log(`${doc.id} has been saved`);
    // the next middleware (post "save") will not execute if you don't call "next()"
    next();
});

catSchema.post('remove', function (doc) {
    console.log(`${doc.id} has been removed`);
});

catSchema.pre('find', function () {
    this.start = Date.now();
});

catSchema.post('find', function (doc) {
    console.log(new Date, 'Found :');
    console.log(JSON.stringify(doc, 0, 4));
    console.log('find() took ' + ( Date.now() - this.start ) + ' millis');
});

module.exports = mongoose.model('Cat', catSchema);