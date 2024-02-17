const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'Male', 'Female', 'female', 'Other', 'other']
    },
    salary: {
        type: Number,
        required: true,
    }
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
