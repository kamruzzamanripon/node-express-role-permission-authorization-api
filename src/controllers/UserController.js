const permissionMiddleware = require("../middlewares/permissionMiddleware");
const Permission = require("../models/Permission");
const Role = require("../models/Role");
const RoleHasPermission = require("../models/RoleHasPermission");
const User = require("../models/User");
const UserHasRole = require("../models/UserHasRole");
const { matchData, hashMaker } = require("../utils/bcrypt");
const { createToken } = require("../utils/jwt");
const userAllInformation = require("../utils/userAllInformation");


module.exports = class UserController {

    //New User Create
    static createUser = async (req, res) => {
      let payload = req.body;
      //return console.log(payload)
      const { name, email, phone, password } = payload;
  
     try {
        const userCreate = await new User({name, email, phone, password:hashMaker(password)}).save();
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

    //User Login
    static userLogin = async(req, res)=>{
      const { email, password } = req.body;

      const user = await User.findOne({ email }).exec();
      //return console.log(user);
  
      if (!user)
        return res
          .status(401)
          .json({code: 401, message: "Email isn't registered."})
      else if (!matchData(password, user.password))
        return res.status(401).json({code: 401, message: "Password doesn't matched."})
      else if (!user.active)
        return res
          .status(401)
          .json({code: 401, message: "Your account is deactivated."})
      else {
        const { name, _id, email, phone } = user;
        const userAllInfo = await userAllInformation(_id)
        //return console.log(name);
        const data = {
          userAllInfo,
          jwt_token: "Bearer " + createToken({ _id, name, email, phone }),
        };
        //userAllInfo.jwt_token ="Bearer " + createToken({ _id, name, email, phone })
        return res.status(200).json({
          code: 200,
          message: "User data Information",
          data: data,
        });
      }
    }




    //Role assign on user base on user id
    static userRoleAssign = async(req, res)=>{
        const payload = req.body
        const {userId, roleId} = payload;
        //return console.log(roleId)
        
        try {
          const finduserIdOnTable = await UserHasRole.find().where({"userId":userId})
           // if role id found then update this collection/table
           if(finduserIdOnTable){
            const userRoleAssign = await UserHasRole.findOneAndUpdate({"userId":userId}, {"roleId":roleId}, {upsert: true})
            //return console.log(userRoleAssign)

           return res.status(200).json({
             code: 200,
             message: "User Role update Successfully",
             data: userRoleAssign,
           });
         }else{
           //if role id not found then create new collection/table
           const userRoleAssign = await new UserHasRole(payload).save();
           return res.status(200).json({
             code: 200,
             message: "user Role Assign Successfully",
             data: userRoleAssign,
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


    //user all information with role and role wise all permissons
    static singleUserInfo = async(req, res)=>{
        const id = req.params.id;
        
        try {
             const singleUserAllInfo = await userAllInformation(id);
            // return console.log(singleUserAllInfo)
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

    static userAllList = async(req, res)=>{
      try {
         const userAllList = await User.aggregate([
            {$lookup:
                {
                   from: "user_has_role",   // collection to join
                   localField: "_id",       //field from the input documents
                   foreignField: "userId",  //field from the documents of the "from" collection
                   as: "roleInformation"    // output array field
                }
            },
            {
              $lookup: {
                  from: "roles",
                  localField: "roleInformation.roleId",
                  foreignField: "_id",
                  as: "roleInfo"
              }
            },
            //For presentaiton
            {
              "$project": {
              "_id": 1,
              "name": 1,
              "email": 1,
              "phone": 1,
              "roleInfo.name": 1,
              "roleInfo._id": 1,
              
            }
          }
        ]
        ).exec();

       // return console.log(singleUserAllInfo)
      return res.status(200).json({
         code: 200,
         message: "User All Information",
         data: userAllList,
       });
     } catch (error) {
       res.status(501).json({
         code: 501,
         message: error.message,
         error: true,
       });
     }
    }


    


    //User Delete and also its related role assign delete
    static userDelete = async(req, res)=>{
      const id = req.params.id;
      //return console.log(id)
      try {
        const userRoleAssignDelete = await UserHasRole.deleteOne().where({userId:id});
        const userDelete = await User.findByIdAndDelete(id)
        
        return res.status(200).json({
          code: 200,
          message: "User Delete Successfully",
          data: userDelete,
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
