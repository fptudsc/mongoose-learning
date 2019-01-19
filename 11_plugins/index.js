require('dotenv').config();

const mongoose = require('mongoose');

const Computer = require('./models/computer.model');

// Global plugin
// register plugins for all schemas
// mongoose.plugin(require('./plugins/lastMod.plugin'));

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error(err);
    });

const computer = new Computer({
    name: 'Yoga'
});

computer.save(function (err, computer) {
    console.log(new Date);  // first save
    
    // modify after 5 seconds
    setTimeout(() => {
        // modify name
        computer.name = 'Lenovo';
        // save
        computer.save(function (err, computer) {
            console.log(computer);
        });
    }, 5000);
});