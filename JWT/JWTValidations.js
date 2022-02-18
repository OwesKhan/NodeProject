let bcrypt = require('bcrypt');
// let dbUtils = require('../utils/dbUtils');
// const logger = require('../utils/logger');




module.exports.hashPassword = async (password) =>{
    try{
        console.log("hashPassword() called!");
        // console.log("hashPassword() called!");
        const salt =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    catch(err){
        // res.send(err.message);
    }
}


module.exports.validatePassword = async (password, passwordDB) => {

    console.log("validatePassword() called!");
    let isValidPassword=await bcrypt.compare(password,passwordDB);
    // console.log("validPass",isValidPassword);

    return isValidPassword;
}

module.exports.validateEmail = (email) => {

    console.log("validateEmail() called");
    // let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let regex = /\S+@\S+\.\S+/
    if(email.match(regex))
    {
        return true;
    }
    else
    {
        return false;
    }
}

module.exports.validateUsername = (username)=>{

    console.log("validateUsername called!");
    // let usernameFormat = /^[a-zA-Z0-9_]+$/;
    // regex = /^[A-Za-z]\\w{5, 29}$/
    let regex = /^[a-zA-Z][a-zA-Z0-9._,$;]+$/
    if(username.match(regex))
    {
        return true;
    }
    else
    {
        return false;
    }
}