const Role = require('../models/Role');


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
}