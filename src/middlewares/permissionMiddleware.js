const userAllInformation = require("../utils/userAllInformation");



function permissionMiddleware(permissionName) {
    
    return async function (req, res, next) {
        
        let { _id } = req.user;
        let {permissionList} = await userAllInformation(_id);
        //return console.log(permissionList)

        const userExcess = permissionList.filter((permission) => permission.name === permissionName)
        if (userExcess.length > 0) next();
        else return res.status(401).send('You are not Authorized!');
    }
}
module.exports = permissionMiddleware