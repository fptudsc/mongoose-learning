require('dotenv').config();

const mongoose = require('mongoose');

const Dog = require('./models/dog.model')
    Cat = require('./models/cat.model');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

/*
    Mongoose has 4 types of middleware:
        -   document middleware
                validate
                save
                remove
                init (note: init hooks are synchronous)

        -   query middleware
                count
                deleteMany
                deleteOne
                find
                findOne
                findOneAndDelete
                findOneAndRemove
                findOneAndUpdate
                remove
                update
                updateOne
                updateMany

        -   aggregate middleware
                aggregate

        -   model middleware
                insertmany
*/

// All middleware types support pre and post hooks

const dog = new Dog({ name: 'BMK' });
// dog.save(function (err, dog) {
//     console.error('ERROR MESSAGE :', err.message);
//     console.log(err);
// });

const cat = new Cat({ name: 'BBB' });
cat.save(function (err, cat) {
    console.log(err, cat);
    cat.remove();
});

Cat.find(function () {
    console.log('Done.');
});

// Note :
//  pre(validate) --> post(validate) --> pre(save) --> post(save)
// pre "save" hooks are nto executed on update(), findOneAndUpdate()