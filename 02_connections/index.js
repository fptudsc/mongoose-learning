const myEnv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
const mongoose = require('mongoose');

dotenvExpand(myEnv);

// const MONGODB_URL = process.env.MLAB_URL;
const MONGODB_URL = process.env.MONGODB_URL;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    // Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
    useFindAndModify: false,    // true by default
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6

    // to avoid "connection closed" errors
    keepAlive: true,    // true by default
    keepAliveInitialDelay: 300000   // the number of milliseconds to wait before initiating keepAlive on the socket.
};

// callback
// function connectToMongoDB(err) {
//     if (err) return console.error('ERROR : {}  Connect to MongoDB failed!');
//     console.log('Connected to MongoDB.');
// }

// connect to MongoDB
// using callback to check connection
// mongoose.connect(MONGODB_URL, options, connectToMongoDB);

// using Promise
mongoose.connect(MONGODB_URL, options)
    .then((connections) => {
        console.log('Connected to MongoDB.');
    })
    .catch(err => console.error('ERROR : {}  Connect to MongoDB failed!'));

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'ERROR : {}  Connect to MongoDB failed!'));
// db.once('open', function () {
//     console.log('Connected to MongoDB.');
// });