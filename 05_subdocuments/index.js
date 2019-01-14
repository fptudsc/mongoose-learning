require('dotenv').config();

const mongoose = require('mongoose');

const Parent = require('./models/parent.model');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB.');
    })
    .catch(err => {
        console.error('ERROR :{}', err);
    });

createParent();
removeSubdocs();

// create parent and add childs
function createParent() {
    const parent = new Parent({ children: [{ name: 'Dat' }, { name: 'Pahm' }] });
    parent.children[0].name = 'Matthew';
    // to add subdocs to array use push, unshift, addToSet
    // parent.children.push( { name: 'Qua' });
    // parent.children[2].isNew;    // true

    parent.child = { name: "Mmm" };

    // subdocuments are not saved individually
    // they are saved whenever their top-level parent document is saved.
    parent.save(function (err, parent) {
        if (err) return console.error(err);
        console.log('SAVED', parent);
    });
}

// pre middleware of subdocs
// see in "05_subdocuments/models" folder

const subdoc_id = '5c3c560bcb18e915befe396d'; // copy it in your db

function removeSubdocs() {
    Parent.findOne()
    .exec(function (err, parent) {
        if (err) return console.error(err);
        // finding a subdoc
        const subdoc = parent.children.id(subdoc_id);
        // removing a subdoc
        subdoc.remove();    // equivalent to "parent.children.pull(subdoc_id);"

        // single doc
        parent.child.remove();    // equivalent to "parent.child = null;"

        // save parent
        parent.save(function (err, parent) {
            if (err) return console.error(err);
            console.log('REMOVED subdocs', parent);
        });
    });
}