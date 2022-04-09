const Permission = require('../models/Permission');
const RoleHasPermission = require('../models/RoleHasPermission');

module.exports = class PermissionController{

    //Create new Permission 
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

    //Edit Permission ##Pram: permission id
    static editPermission = async(req, res)=>{
      const id = req.params.id;
      const payload = req.body;
      try {
        const editPermission = await Permission.findByIdAndUpdate({"_id" : id}, payload);
        return res.status(200).json({
          code: 200,
          message: "Permission Create Successfully",
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

    //Delete Permision. ##Pram: permission id
    static deletePermission = async(req, res)=>{
        const id = req.params.id;
        //return console.log(id)

        try {

          //1st delete permission
          const deletePermission = await Permission.deleteOne({_id: id});

          //2nd fetch all data on role_has_permission collection/table by req id param      
          const roleHasPermissionList = await RoleHasPermission.where({"permissionId": {$in:id}});
          //update all role_has_permission data.
          for(var i=0; roleHasPermissionList.length > i; i++){
            //fetch only permission array
            var permissonArray = roleHasPermissionList[i].permissionId
            //delete permission id which is send by req id param. and reform again new array
            var permissionFilter = permissonArray.filter(item=> item !== id)
            //this new array push on role_has_permission table.
            await RoleHasPermission.findOneAndUpdate( { _id: roleHasPermissionList[i]._id }, {"permissionId": permissionFilter} );
            //return console.log(permissionFilter)
          }
          return res.status(200).json({
            code: 200,
            message: "Permission Delete Successfully",
            //data: roleHasPermissions,
          });
        } catch (error) {
          res.status(501).json({
            code: 501,
            message: error.message,
            error: true,
          });
        }
    }

    //permisson all info show
    static permissionList = async(req, res)=>{
      
      try{
        const permissionList = await Permission.find().lean().exec();

        // let refromPermissionList = [];
        // for(var i=0; permissionList.length> i; i++){
        //   var groupName = permissionList[i].groupName;
        //   var permisiionName = permissionList[i].name;
        //   //return console.log(permisiionName)
        //   var getpermisiionName = permisiionName.match(/.*(?=\.)/);
        //   //return console.log(getpermisiionName[0])
        //   var permissionDataArray = [];
        //   var dataFormat ={}
        //   if(groupName === getpermisiionName[0]){
        //     permissionDataArray.push(permisiionName)
        //     dataFormat = {
        //       permissionArray: permissionDataArray
        //     }
        //     refromPermissionList.push(dataFormat);
        //    // return console.log(dataFormat)
        //   }

        //   //refromPermissionList.push(dataFormat);

        // }

        //return console.log("hello", permissionList)
        return res.status(200).json({
          code: 200,
          message: "Permission List",
          data: permissionList,
        });

      }catch(error){
        res.status(501).json({
          code: 501,
          message: error.message,
          error: true,
        });
      }
    }
}