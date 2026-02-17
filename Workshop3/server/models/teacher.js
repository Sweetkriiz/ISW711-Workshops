const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    cedula: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('Teacher', teacherSchema);
