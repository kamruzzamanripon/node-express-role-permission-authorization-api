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
            const userCreate = await new UserHasRole(payload).save();
            const updateItem = await User.findOneAndUpdate( { _id: payload.userId }, {roleId: payload.roleId} );
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
        
    }
}