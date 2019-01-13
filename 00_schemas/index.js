const mongoose = require('mongoose');

const Student = require('./models/student.model');

mongoose.connect('mongodb://localhost:27017/test');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connect failed.'));
db.once('open', () => {
    console.log('Connected!');
});

var student = new Student({
    firstName: 'Dat',
    lastName: 'Pham',
    className: 'SE1404'
});

// save student
student.save(function (err, student) {
    if (err) return console.error(err);
    console.log('====SAVED', student);

    findByLastName();

    findSimilarClassName();

    findOneByFullName();

    findByFullName();
});

function findSimilarClassName() {
    student.findSimilarClassName(function(err, students) {
        if (err) return console.error(err); 
        console.log('====METHOD findSimilarClassName');
        console.log('List of students :', students);
    });
}

function findByLastName() {
    Student.findByLastName('Pham', function (err, students) {
        if (err) return console.error(err);
        console.log('====STATIC findByLastName');
        console.log('List of students :', students);
    });
}

function findByFullName() {
    Student.find()
        .byFullName('Dat Pham')
        .exec(function (err, students) {
            if (err) return console.error(err); 
            console.log('====QUERY HELPERS find & byFullName');
            console.log('List of students :', students);
        });
}

function findOneByFullName() {
    Student.findOne()
        .byFullName('Dat Pham')
        .exec(function (err, student) {
            if (err) return console.error(err);
            console.log('====QUERY HELPERS findOne & byFullName');
            console.log('Found student :', student);

            console.log('====VIRTUAL fullname');
            console.log(student.fullName);
        });
}