const bcrypt =  require("bcryptjs");


function hashMaker(str) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
}

function matchData(str, hash) {
    return bcrypt.compareSync(str, hash);
}

module.exports = {
    hashMaker,
    matchData
}