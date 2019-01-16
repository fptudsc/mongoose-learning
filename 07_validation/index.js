require('dotenv').config();

const mongoose = require('mongoose');

const Mouse = require('./models/mouse.model'),
    Product = require('./models/product.model');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

const mouse = new Mouse({
    mouseId: new mongoose.Types.ObjectId,
    // name: 'AAA',
    brand: 'BBB',
    weight: 1250
});

//  Executes registered validation rules for this document.
mouse.validate(function (err) {
    console.log('MESSAGE :', err.message);
    console.log('NAME :', err.name);

    const errs = err.errors;
    
    for (let e in errs) {
        console.log(new Date, 'ERROR :{}', errs[e].message);
        console.log(errs[e].properties);
    }
});

// or using validateSync
const err = mouse.validateSync();

console.error(err.errors['name'].message);
console.error(err.errors['brand'].message);
console.error(err.errors['weight'].message);

// product has been custom with validate
const product = new Product({
    modelCode: 'aba2-aaa1-23as',
    name: 'ABC',
    price: 1200,
    color: '123'
});

product.save(function (err, product) {
    if (err) {
        for (let e in err.errors) {
            console.log(new Date, 'ERROR :{}', err.errors[e].message);
            console.log('Kind :', err.errors[e].kind);
            console.log('Path :', err.errors[e].path);
            console.log('Value :', err.errors[e].value);
        }
        return;
    }
    console.log('SAVED', product);
});