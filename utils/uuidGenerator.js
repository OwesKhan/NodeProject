const uuid = require('uuid');

console.log(uuid.v4());

module.exports.uuidGenerator = ()=>{
    return uuid.v4();
}