const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    permissionId: {
        type: Array,
        required: true
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: "Role",
        required: true
    }
},{ timestamps: true, versionKey:false })


const RoleHasPermission = mongoose.model('RoleHasPermission', DataSchema, 'role_has_permissions');
module.exports = RoleHasPermission;