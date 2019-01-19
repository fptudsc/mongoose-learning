const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// discriminatorKey
const options = { discriminatorKey: 'kind' }

const eventSchema = new Schema({
    time: Date
}, options );

module.exports = mongoose.model('Event', eventSchema);