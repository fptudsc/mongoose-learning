const mongoose = require('mongoose');

const Restaurant = require('./models/restaurant.model'),
    Host = require('./models/host.model');

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'ERROR :{} Failed to connect to mongod!'));
db.once('open', function () {
    console.log('INFO [__]  Connected to mongodb.');
});

const foods = [
    { _foodId: new mongoose.Types.ObjectId, name: 'AAA', price: 1200 },
    { _foodId: new mongoose.Types.ObjectId, name: 'BBB', price: 5600 },
    { _foodId: new mongoose.Types.ObjectId, name: 'CCC', price: 2500 }
];

const address = {
    city: {
        name: 'HCM',
        zipCode: '700000'
    },
    street: 'Tan Chanh Hiep 10'
}

const restaurant = new Restaurant({
    name: 'QDP',
    openning: true,
    foods, address
});

// mixed can be anything
restaurant.mixed = { any: { thing: 'i want'} };

// create new Map of staffNames
restaurant.staffNames = new Map([
    ['Dat', 'hello everybody'],
    ['Bao', 'good morning'],
]);
restaurant.set('staffNames.Bao', 'hello');
restaurant.staffNames.set('Bao', 'hi');

// cooks is an array of String
restaurant.cooks = [ 'a', 'b', 'c', 'd' ];

restaurant.save(function (err, restaurant) {
    if (err) return console.error(err);
    console.log('SAVED', restaurant);
});

// schemaType options
console.log('====schemaType options');

const host = new Host();

host.name = 'Dat';  // SETTER
console.log('====GETTER', host.name);

host.testString = 'Tea';    // only be 'Tea' or 'Coffee'
host.testNumber = 10;   //  greater than or equal to 1 and less than or equal to 10
host.testDate = new Date('02/02/2018');

host.save(function (err, host) {
    if (err) return console.error(err);
    console.log('SAVED', host);
});