require('dotenv').config();

const mongoose = require('mongoose');

const Animal = require('./models/animal.model');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB.');
    })
    .catch(err => {
        console.error('ERROR :{}', err);
    });

// Create an animal to make sure you have docs in your db
Animal.create({ name: 'ABC' });

// to retrieve documents from db see the chapter QUERY.

// updating documents
// suppose you have the doc's _id
const id = '5c3c478aac98a936b994a520';  // copy it in your db

Animal.findById(id, function (err, animal) {
    if (err) return console.error(err);
    console.log('Found', animal);

    // update name
    animal.name = 'def';
    // animal.set({ name: 'def' });    // equivalent
    
    animal.save(function (err, updatedAnimal) {
        if (err) return console.error(err);
        console.log('UPDATED', updatedAnimal);
    });
});

// however if you don't need to get it and merely want to update its properties
Animal.update({ _id: id }, { $set: { name: 'def' } }, function (err, raw) {
    if (err) return console.error(err);
    console.log('UPDATED', raw);
});

// findById and Update then retrieving an updated doc
Animal.findByIdAndUpdate(id, { $set: { name: 'def' } }, function (err, updatedAnimal) {
    if (err) return console.error(err);
    console.log('UPDATED', updatedAnimal);
});