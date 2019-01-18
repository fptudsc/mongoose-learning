const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    nameOfDept: String,
    leader: { type: Schema.Types.ObjectId, ref: 'Person' },
    // array of ObjectId
    staffs: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

module.exports = mongoose.model('Department', departmentSchema);