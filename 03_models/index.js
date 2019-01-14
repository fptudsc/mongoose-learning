// Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document.
require('dotenv').config();

const mongoose = require('mongoose');

const User = require('./models/user.model');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('ERROR :{}', err);
    });

// Constructing Documents
// "user" is a document (An instance of a model)
const user = new User({
    username: 'quangdatpham',
    password: '123456789',
    birthday: new Date('07/15/2000')
});

// Saving doc
// user.save(function (err, user) {
//     if (err) return console.error(err);
//     // saved
//     console.log('SAVED', user);
// });

// or
// User.create(user , function (err, user) {
//     // saved
// });

// for inserting many docs
// User.insertMany([ user , { username: 'dat' }], function (err, users) {
//     if (err) return console.error(err);
//     console.log('SAVED List of users :', users);
// });

// querying
// finding all docs that match the query
// User.find()
//     .where('birthday')
//     .gt(new Date('01/01/2000'))
//     .exec(function (err, users) {
//         if (err) return console.error(err);
//         console.log('Query List of users :', users);
//     });

// // updating
// // at most one doc
// User.updateOne(
//     { username: 'quangdatpham' },
//     { password: 'abcdef' },
//     function (err, res) {
//         if (err) return console.error(err);
//         console.log('Updating one doc', res);
// });

// deleting
// deleting one doc that match the given filter
User.deleteOne({ username: 'quangdatpham' }, function (err) {
    if (err) return console.error(err);
    console.log('Deleted');
});

/*
    // counting the number of docs that match the given filter
    Model.count(*filter:Obj*, *callback*);

    // Saving one or more documents to the db
    Model.create(*docs*, *options*, *callback*);
        docs «Array|Object» Documents to insert, as a spread or array
        // pass a spread of docs and a callback
        Candy.create({ type: 'jelly bean' }, { type: 'snickers' }, function (err, jellybean, snickers) {
            if (err) // ...
        });
    
    // deleting all docs that match the conditions from the collection (regardless of the single option.)
    Model.deleteMany(*conditions:Obj*, *options*, *callback*);

    // Deletes the first document that matches conditions from the collection
    Model.deleteOne()

    Model.find()

    Model.findById()

    Model.findOne()

    Model.insertMany()
    
    Model.update()
    
    Model.updateMany()
    
    Model.updateOne()

    // Removes all documents that match conditions from the collection
    Model.remove()

    ///////////// Prototype ////////////////
    Model.prototype.$where(*arg*)
        arg is a javascript string or anonymous function
        // or find({ $where: javascript })
        Blog.$where('this.username.indexOf("val") !== -1').exec(function (err, docs) {});

    // remove this doc from the db
    Model.prototype.remove(*callback*)

    Model.prototype.save()
    
*/