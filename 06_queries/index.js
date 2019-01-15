require('dotenv').config();

const mongoose = require('mongoose');

const House = require('./models/house.model');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser : true })
    .then(() => {
        console.log('Connected to MongoDB.');
    })
    .catch(err => {
        console.error('ERROR : {}', err);
    });

// firstly, add a doc
// House.create({ name: 'Dat_House', year: 2018, address: { 
//     city: 'HCM',
//     district: '12',
//     street: 'TCH'
// }});

// EXECUTING A QUERY

// 1. pass in a callback function
// find the house that have the address-street of 'TCH'
// select fields "name" "address.city"
House.findOne({ 'address.street': 'TCH'}, 'name address.city', function (err, house) {
    if (err) return console.error(err);
    console.log('Pass in a callback function :');
    console.log(house);
    // expected ouput : { address: { city: 'HCM' },
    //                                _id: 5c3d87491efc3c305fcd8538,
    //                                name: 'Dat_House' }
});

// 2. execute the query at a later time
// use query builder
const query = House.findOne({ 'address.street': 'TCH'});

// select the "name" and "address.city"  fields
query.select("name address.city");

// executing
// the same as callback
query.exec(function (err, house) {
    if (err) return console.error(err);
    console.log('Execute the query at a later time :');
    console.log(house);
});

// 3. then
// Mongoose queries are not promises.
// They have a .then() function for co and async/await as a convenience.
// call then can execute the query multiple times

House.findOne({ 'address.street': 'TCH'}, 'name address.city')
    .then(function (house) {    // like promise.then
        console.log('Calling then :');
        console.log(house);
    });

// You should NOT use the callback and then with queries // that'll make duplicate operations

// BUILDING UP A QUERY
// chaining syntax

// JSON doc
House
    .find({
        name: /Dat/,
        'address.city': { $in: [ 'HCM', 'Ha Noi']},
        year: { $gt: 1900, $lt: 2020}
    })
    .limit(5)
    .sort({ name: -1})
    .select({ name: 1, 'address.city': 1})
    .exec(callback);    // must be the last chain

// query builder
House
    .find( { name: /Dat/ })
    .where('address.city').in([ 'HCM', 'Ha Noi'])
    .where('year').gt(1900).lt(2020)    // gt : greater , gte: greater of equal to
    .limit(5)
    .sort('-name')
    .select('name address.city')
    .exec(callback);    // must be the last chain

function callback(err, houses) {
    if (err) return console.error(err);
    console.log('List of houses :', houses);
}

// STREAMING

const cursor = House.find({ name: /Dat/ }).cursor();

cursor.on('data', function (doc) {
    console.log(new Date, 'Finding doc :', doc.name);
});

cursor.on('close', function () {
    console.log(new Date, 'Done!');
});

/*
    The callback pattern : callback(err, results);
    Results:}
        findOne() it is a potentially-null single document
        find() a list of documents
        count() the number of documents
        update() the number of documents affected

    Mongoose models provide several static helper functions for CRUD operations.
    Each of these functions returns a mongoose Query object.

        Model.deleteMany()
        Model.deleteOne()
        
        Model.find()
        Model.findById()
        Model.findByIdAndDelete()
        Model.findByIdAndRemove()
        Model.findByIdAndUpdate()
        
        Model.findOne()
        Model.findOneAndDelete()
        Model.findOneAndRemove()
        Model.findOneAndUpdate()
        
        Model.replaceOne()
        Model.updateMany()
        Model.updateOne()

    Aggregation Pipeline Operators :
        https://docs.mongodb.com/manual/reference/operator/aggregation/
*/