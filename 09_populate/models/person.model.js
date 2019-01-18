const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: String,
    height: Number,
    education: String,
    // the Id of dept
    department: { type: Schema.Types.ObjectId, ref: 'Department' }
});

module.exports = mongoose.model('Person', personSchema);