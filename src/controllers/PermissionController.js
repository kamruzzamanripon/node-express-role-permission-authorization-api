const Permission = require('../models/Permission');

module.exports = class PermissionController{

    static createPermission = async(req, res)=>{
        const payload = req.body;

        try {
            const permissionCreate = await new Permission(payload).save();
            return res.status(200).json({
              code: 200,
              message: "Permission Create Successfully",
              data: permissionCreate,
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