const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: "Role",
        required: true
    }
},{ timestamps: true, versionKey:false })


const UserHasRole = mongoose.model('UserHasRole', DataSchema, 'user_has_role');
module.exports = UserHasRole;