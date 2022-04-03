const Permission = require("../models/Permission");
const Role = require("../models/Role");
const RoleHasPermission = require("../models/RoleHasPermission");
const User = require("../models/User");
const UserHasRole = require("../models/UserHasRole");


module.exports = class UserController {

    //New User Create
    static createUser = async (req, res) => {
      let payload = req.body;
  
     try {
        const userCreate = await new User(payload).save();
        return res.status(200).json({
          code: 200,
          message: "User Create Successfully",
          data: userCreate,
        });
      } catch (error) {
        res.status(501).json({
          code: 501,
          message: error.message,
          error: true,
        });
      }
    };


    static userRoleAssign = async(req, res)=>{
        const payload = req.body
        //return console.log(payload.userId)
        
        try {
            const userRoleAssign = await new UserHasRole(payload).save();
            const userInfoUpdate = await User.findOneAndUpdate( { _id: payload.userId }, {roleId: payload.roleId} );
            return res.status(200).json({
              code: 200,
              message: "User Create Successfully",
              data: userRoleAssign,
            });
          } catch (error) {
            res.status(501).json({
              code: 501,
              message: error.message,
              error: true,
            });
          }
        
    }


    static singleUserInfo = async(req, res)=>{
        const id = req.params.id;

        try {
            
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
            const singleUserAllInfo = {name, email, phone, userRoleId, role, permissionList}
            //return console.log(singleUserAllInfo)


           return res.status(200).json({
              code: 200,
              message: "User Information",
              data: singleUserAllInfo,
            });
          } catch (error) {
            res.status(501).json({
              code: 501,
              message: error.message,
              error: true,
            });
          }

    }
}