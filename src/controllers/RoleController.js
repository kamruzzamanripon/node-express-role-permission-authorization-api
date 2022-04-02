const Role = require('../models/Role');
const RoleHasPermission = require('../models/RoleHasPermission');


module.exports = class RoleController{

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

    static roleAssignPermission = async(req, res)=>{
        const payload = req.body;
        //return 
        try {
            const roleAssignPermission = await new RoleHasPermission(payload).save();
            return res.status(200).json({
              code: 200,
              message: "roleAssignPermission Successfully",
              data: roleAssignPermission,
            });
          } catch (error) {
            res.status(501).json({
              code: 501,
              message: error.message,
              error: true,
            });
          }
    }

    static roleWisePermissionShow = async(req, res)=>{
        const {roleId} = req.body;
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
}