const Permission = require("../models/Permission");
const Role = require("../models/Role");
const RoleHasPermission = require("../models/RoleHasPermission");
const User = require("../models/User");
const UserHasRole = require("../models/UserHasRole");

const userAllInformation = async(id)=>{

    //1st find user by id
    const singleUserInfo = await User.findById(id);
    const {_id, name, email, phone} = singleUserInfo;
    //seperate roleId from singleUserInfo
    //const  roleId = singleUserInfo.roleId.toString()
    
    //find user role id on user_has_role table
    const UserroleId = await UserHasRole.where({userId:_id}).exec()
    const {roleId} = UserroleId[0];
    //return console.log(roleId)

    //this roleId, query on Role table and find the role Name
    const roleInfo = await Role.findById(roleId);
    const {_id:userRoleId, name:role} = roleInfo;
    //return console.log(roleInfo)

    //and then this roleId query on RoleHasPermission table to fetch the permission list as role Id wise
    const roleWisePermissionId = await RoleHasPermission.where({roleId:roleId}).exec()
    //seperate permission Array id from the RoleHasPermission Object
    const permissionListArray = roleWisePermissionId[0].permissionId
    //this Permission Array Id query on Permission table to fetch id wise primission name.
    const permissionList = await Permission.find().where('_id').in(permissionListArray).exec();
   
    //const {name:permissions} = permissionList

    //user All information add
    const singleUserAllInfo = {_id,name, email, phone, userRoleId, role, permissionList};
    //return console.log(singleUserAllInfo)

    return singleUserAllInfo;

}

module.exports = userAllInformation;