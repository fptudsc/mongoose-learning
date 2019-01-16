const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// custom a validator
const productSchema = new Schema({
    modelCode: {
        type: String,
        validate: {
            validator: function (val) {
                return /\d{4}-\d{4}-\d{4}/.test(val);
            },
            message: props => `Invalid modelCode : ${props.value}`
        },
        required: 'modelCode is required'
    },
    // Async custom validators (mongoose will wait for that promise to settle)
    // with promise // do not specific the "isAsync" option
    name: {
        type: String,
        validate: function (v) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve(false);
                }, 1000);
            });
        }
    },
    // with callback
    price: {
        type: Number,
        validate: {
            isAsync: true,  // set "isAsync" to true
            validator: function (v, cb) {   // mongoose will pass the 2nd arg to your validator fn
                setTimeout(function () {
                    let msg = `Invalid price :  ${v}`;
                    cb(false, msg);
                }, 2000);
            }
        }
    },
    color: String
});

function validator(value) {
    return /[a-z]+/.test(value);
}

productSchema.path('color').validate(validator, 
    'Color "{VALUE}" not valid', 'Invalid color');
    // validator, msg, kind

module.exports = mongoose.model('Product', productSchema);