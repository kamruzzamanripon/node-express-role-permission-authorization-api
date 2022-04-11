const RoleHasPermission = require("../models/RoleHasPermission");

const roleAssignIntoPermissionSync = async(roleId, permissionIdArray)=>{

    const roleAssignPermissions = await RoleHasPermission.findOneAndUpdate({"roleId":roleId}, {"permissionId":permissionIdArray}, {upsert: true})
    return console.log(roleAssignPermissions)

    return roleAssignPermissions;
}

module.exports = roleAssignIntoPermissionSync;