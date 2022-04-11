const RoleHasPermission = require("../models/RoleHasPermission");

const roleAssignIntoPermissionSync = async(roleId, permissionIdArray)=>{

    //return console.log(permissionIdArray)
    const roleAssignPermissions = await RoleHasPermission.findOneAndUpdate({"roleId":roleId}, {"permissionId":permissionIdArray}, {upsert: true})

    return roleAssignPermissions;
}

module.exports = roleAssignIntoPermissionSync;