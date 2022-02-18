const crypto = require('crypto');

const SECRET1 = crypto.randomBytes(32).toString("hex");
const SECRET2 = crypto.randomBytes(32).toString("hex");
const resetPassSECRET = crypto.randomBytes(32).toString("hex");

// let date = new Date();
// console.log(date);

console.log(SECRET1 ," : :", SECRET2,": :", resetPassSECRET);

