const jwt = require("jsonwebtoken");
const secret = "@#$%^&*&*"

function createToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: 31556926 });
}

function decodeToken(payload) {
    return jwt.verify(payload, secret);
}
module.exports = { createToken, decodeToken }