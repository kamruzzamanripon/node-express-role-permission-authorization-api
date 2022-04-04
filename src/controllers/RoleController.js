const Role = require('../models/Role');
const RoleHasPermission = require('../models/RoleHasPermission');
const UserHasRole = require('../models/UserHasRole');


module.exports = class RoleController{

    // Role Create
    static createRole = async(req, res)=>{
        const payload = req.body;
        //return console.log(payload)
        try {
            const roleCreate = await new Role(payload).save();
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

           // return console.log(roleAssignPermission)
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
        //return console.log(roleId)
        try {
            const roleWisePermissionShow = await RoleHasPermission.find({ roleId: roleId }).exec();
            return res.status(200).json({
              code: 200,
              message: "roleAssignPermission Successfully",
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
}