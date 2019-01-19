require('dotenv').config();

const mongoose = require('mongoose');
const async = require('async');

const Event = require('./models/event.model');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error(err);
    });

const options = { discriminatorKey: 'kind' };

// ClickedLinkEvent is a special type of Event  that has a url
const ClickedLinkEvent = Event.discriminator('ClickedLink',
    new mongoose.Schema({ url: String }, options)
);

// When you create a generic event, it can't have a URL field...
const genericEvent = new Event({time: Date.now(), url: 'google.com'});
console.log('GenericEvent: ', genericEvent.url);
// But a ClickedLinkEvent can
const clickedEvent = new ClickedLinkEvent({time: Date.now(), url: 'google.com'});
console.log('ClickedEvent :', clickedEvent.url);

// an instanceof discriminator "__t"
console.log(`this doc is an instanceof '${clickedEvent.__t}' discriminator`);

// save to the Event model's collection
var save = function (doc, callback) {
    doc.save(function (error, doc) {
      callback(error, doc);
    });
};
  
async.map([genericEvent, clickedEvent], save, function (error) {
    Event.countDocuments({}, function (error, count) {
            console.log('COUNT :', count);
        });

        // discriminatorKey to queries
        ClickedLinkEvent.find({}).exec(function (err, docs) {
            console.log(docs);  // only found clickedLinkEvent
        });
});


// creating Event with discriminatorKey "kind"
const events = [
    { time: Date.now() },
    { kind: 'ClickedLink', time: Date.now(), url: 'google.com'}
];

Event.create(events, function (err, docs) {
    console.log('CREATED :', docs);
});

