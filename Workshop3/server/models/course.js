const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    code: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
});

module.exports = mongoose.model('Course', courseSchema);
