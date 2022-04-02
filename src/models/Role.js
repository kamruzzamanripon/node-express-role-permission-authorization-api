const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        trim: true,
        maxLength: [100, 'name cannot exceed 100 characters']
    }
},{ timestamps: true, versionKey:false })


const Role = mongoose.model('Role', DataSchema, 'roles');
module.exports = Role;