const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mouseSchema = new Schema({
    mouseId: Schema.Types.ObjectId,
    name: {
        type: String,
         required: [
             function () { return this.mouseId != null; },    // require with function
             'Name is required if id is specified'  // custom err message
         ]
    },
    brand: {
        type: String,
        enum: ['Genius', 'Logitech']
    },
    weight: {
        type: Number,
        max: [ 1200, 'Over weight' ] // custom err message
    }
});

module.exports = mongoose.model('Mouse', mouseSchema);