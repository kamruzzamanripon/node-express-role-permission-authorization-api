const { decodeToken } = require("../utils/jwt");

function authMiddleware(req, res, next) {
    //return console.log("hellow auth")
    try {
        //return console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1];
        req.user = decodeToken(token);
        next();
    } catch (err) {
        res.status(400).send('Authentication Failed')
        
    }
}
module.exports = authMiddleware