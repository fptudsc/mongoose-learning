require('dotenv').config();

const mongoose = require('mongoose');

const Person = require('./models/person.model');
const Department = require('./models/department.model');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error(err));

// using populate you can reference docs in other collections

const person = new Person({
    name: 'Dat',
    height: 178,
    education: 'FPT'
});

// saving refs
// person.save(function (err, person) {
//     if (err) return console.error(err);

//     console.log('SAVED person', person);

//     // create a leader
//     const dept = new Department({
//         name: 'PRF',
//         leader: person.id
//     });

//     // create a list of staff
//     Person.insertMany([
//         { name: 'A' },
//         { name: 'B' }
//     ], function (err, staffs) {
//         staffs.forEach(staff => dept.staffs.push(staff.id));

//         // save the department
//         dept.save(function (err, dept) {
//             if (err) return console.error(err);
//             console.log('SAVED dept', dept);
//         });
//     });
// });

// population
Department
    .findOne({})    // populate s single obj
    // leadder is a property of dept and it refer to a person
    .populate('leader', 'name height')  // fields select: name, height
    // .populate({ path: 'leader', select: 'name height' }, ...options)
    .populate('staffs')  // multiples paths
    .exec(function (err, dept) {
        console.log('Our leaders :', dept.leader);
        // Our leaders : { _id: 5c418603dc2259626a31f6c4, name: 'Dat', height: 178 }
        // if no foreign doc found, "dept.leader" will be null

        // list of staffs (multiple paths)
        console.log('STAFFS :', JSON.stringify(dept.staffs, 0, 2));
    });

// other way
Department
    .findOne({})
    .exec(function (err, dept) {
        const options = [
            { path: 'staffs', select: 'name' , option: { limit: 5 } },
            { path: 'leader', select: 'name' }
        ];

        // assumed we already have a dept
        //  we're going to populate its "leader" and "staffs"
        Department.populate(dept, options, function (err, dept) {
            console.log('--------------', dept.leader);
        });
    });

Person
    .findOne({})
    .populate('department') // can not work because we didn't add a ref to person
    .exec(function (err, person) {
        console.log('My dept :', person.department); // undefined
    });

