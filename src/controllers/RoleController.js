const { json } = require('express/lib/response');
const Permission = require('../models/Permission');
const Role = require('../models/Role');
const RoleHasPermission = require('../models/RoleHasPermission');
const UserHasRole = require('../models/UserHasRole');
const roleAssignIntoPermissionSync = require('../utils/roleAssignIntoPermissionSync');


module.exports = class RoleController{

    // Role Create
    static createRole = async(req, res)=>{
        const {name, permissions} = req.body;
        //return console.log(payload.name)
        try {
            const roleCreate = await new Role({name}).save();
            const roleId = roleCreate._id
           
            //if permission have then assign
            if(permissions.length > 0){
              await roleAssignIntoPermissionSync(roleId, permissions)
            }

            return res.status(200).json({
              code: 200,
              message: "Role Create Successfully",
              data: roleCreate,
            });
          } catch (error) {
            res.status(501).json({
              code: 501,
              message: error.message,
              error: true,
            });
          }
    }

    //Role Edit/Update
    static editRole = async(req, res)=>{
      const id = req.params.id;
      const payload = req.body;
      try {
        const editPermission = await Role.findByIdAndUpdate({"_id" : id}, payload);
        return res.status(200).json({
          code: 200,
          message: "Role Update Successfully",
          data: editPermission,
        });
      } catch (error) {
        res.status(501).json({
          code: 501,
          message: error.message,
          error: true,
        });
      }
    }

    //include permission array into one role
    static roleAssignPermission = async(req, res)=>{
        const payload = req.body;
        const {roleId} = payload;
        const {permissionId} = payload;
        try {
            //find role id on role_has_permission table
            const findRoleIdOnTable = await RoleHasPermission.find().where({"roleId":roleId})

           // if role id found then update this collection/table
          if(findRoleIdOnTable){
             const roleAssignPermission = await RoleHasPermission.findOneAndUpdate({"roleId":roleId}, {"permissionId":permissionId}, {upsert: true})

            return res.status(200).json({
              code: 200,
              message: "roleAssignPermission update Successfully",
              data: roleAssignPermission,
            });
          }else{
            //if role id not found then create new collection/table
            const roleAssignPermission = await new RoleHasPermission(payload).save();
            return res.status(200).json({
              code: 200,
              message: "roleAssignPermission save Successfully",
              data: roleAssignPermission,
            });
          }
            
          } catch (error) {
            res.status(501).json({
              code: 501,
              message: error.message,
              error: true,
            });
          }
    }

    //role id base permission arry show
    static roleWisePermissionShow = async(req, res)=>{
        //const {roleId} = req.body;
        const roleId = req.params.id;
        //return console.log(req.user)
        try {
            const roleWisePermissionShow = await RoleHasPermission.find({ roleId: roleId }).exec();
            return res.status(200).json({
              code: 200,
              message: "role wise Permission show",
              data: roleWisePermissionShow,
            });
          } catch (error) {
            res.status(501).json({
              code: 501,
              message: error.message,
              error: true,
            });
          }
    }

    //role delete and also delete role id base user_has_role table and role_has_permissions table releted data delete
    static roleDelete = async(req, res)=>{
      const id = req.params.id;
      //return console.log(id)
      try {
        const roleDeleteInfo = await Role.findByIdAndDelete(id)
        const userHasRoleDataDelete = await UserHasRole.deleteOne().where({roleId:id});
        const roleHasPremissionDataDelete = await RoleHasPermission.deleteOne().where({roleId:id});

        return res.status(200).json({
          code: 200,
          message: "role Delete Successfully",
          data: roleDeleteInfo,
        });
      } catch (error) {
        res.status(501).json({
          code: 501,
          message: error.message,
          error: true,
        });
      }

    }

    //All role list 
    static roleList = async(req, res)=>{
      try{
          const roleList = await Role.find().lean().exec();
          return res.status(200).json({
            code: 200,
            message: "role List",
            data: roleList,
          });

      }catch(error){
        res.status(501).json({
          code: 501,
          message: error.message,
          error: true,
        });
      }
    }


     
    //All role list with their permissions List 
    static roleListWithPermissions = async(req, res)=>{
        try {
          //Fetch role_has_permission collection/table and also joind role collection/table. becasue role_has_permission collection has single roleId.
          const roleWithPermission = await RoleHasPermission.aggregate([{
          $lookup: {
              from: "roles", // collection name in db
              localField: "roleId",
              foreignField: "_id",
              as: "roleInformation"
              }
            }]
          ).exec();

          //1st gess roleWithPermissionArray has null array
          let roleWithPermissionArray = []
          for(var i=0; roleWithPermission.length > i ; i++){
              //2nd Seperate permission Array
              let permissionQueryArray = roleWithPermission[i].permissionId;
              //3rd permission array info is null
                  let permissionArray = []
                  //4th permissionQueryArray is also another array. so again loop for another query to fetch permission info into permisson collection
                  for(var j=0; permissionQueryArray.length > j; j++){
                    let {_id:permisiionId, name:permissionName, groupName }  = await Permission.findOne({_id:permissionQueryArray[j]})
                    let permissionInfoObject = {permisiionId, permissionName, groupName}
                    //5th permission all info push into permissionArray
                    permissionArray.push(permissionInfoObject)
                  }
            //6th destructuring role information
            let {_id:roleId, name:roleName} = roleWithPermission[i].roleInformation[0];
           // 7th permissionArray and destructuring role information data build a new object
            let totalObject = {
                roleInfo:{roleId, roleName},
                permissionArray
            }
            //8th this new object push into roleWithPermissionArray
            roleWithPermissionArray.push(totalObject);
          }
        return res.status(200).json({
          code: 200,
          message: "All role list with their permissions List",
          data: roleWithPermissionArray,
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