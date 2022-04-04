const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter name'],
        trim: true,
        maxLength: [100, 'name cannot exceed 100 characters']
    },
    groupName: {
        type: String,
        required: [true, 'Please enter name'],
        trim: true,
        maxLength: [100, 'name cannot exceed 100 characters']
    }
},{ timestamps: true, versionKey:false })


const Permission = mongoose.model('Permission', DataSchema, 'permissions');
module.exports = Permission;