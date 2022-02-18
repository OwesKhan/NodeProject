require('dotenv').config()
const JWT = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const randomNumber = require('random-number');
// const jwtValidations = require('../JWT/jwtValidations');
// const {createError} = require('create-error');

module.exports.generateAccessToken  = async function(email)
{  
    
    let accessToken = await new Promise((resolve, reject) =>
    {
        console.log("generateAccessToken() called");

        // let email =req.body.email;
        let secret = process.env.ACCESS_TOKEN_SECRET;
        // console.log(secret);

        let payload = {};
        let options ={
            issuer:"food-zone",
            audience: email,
            expiresIn:'1d' 
            };
        
        JWT.sign(payload, secret, options, (err, token) => {
            if(err){
                console.log("Token rejected");
                reject(err);
            }
            console.log("accessToken resolved");
            resolve(token);
        });
        
    });
    // console.log("accessToken:",accessToken);
    // res.status(200).json({"Access_Token": token});
    return accessToken;
}

module.exports.generateRefreshToken = async(email)=>
{
    // let email =req.body.email;
    console.log("generateRefreshToken() called")

    let refreshToken= await new Promise((resolve, reject) =>{

        let payload = {};
        let options ={
            issuer:"food-zone",
            audience: email,
            expiresIn:'1y'
        };

        JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, options, (err, refreshToken) =>{
            
            if(err){
                console.log("Token rejected!");
                reject(err);
            }
            console.log("refreshToken Resolved");
            resolve(refreshToken);
        });
        // return refreshToken;
        
    })
    // console.log("refreshToken: ",refreshToken);
    return refreshToken;
    // res.status(200).json({"Refresh_Token": refreshToken});
    
}

module.exports.generateResetPasswordToken = async(email)=>{
    console.log("generateResetPasswordToken() called");

    let resetPasswordToken= await new Promise((resolve, reject) =>{

        let payload = {};
        let options ={
            issuer:"food-zone",
            audience: email,
            expiresIn:'20m'
        };

        JWT.sign(payload, process.env.RESET_PASSWORD_SECRET, options, (err, resetToken) =>{
            
            if(err){
                console.log("Token rejected!");
                reject(err);
            }
            console.log("resetToken Resolved");
            resolve(resetToken);
        });
        
    })
    return resetPasswordToken;
}

module.exports.validateResetPasswordToken = async function(token)
{
    console.log("validateResetToken() called")
    // let token = req.body.token;
    if(!token){
        console.log("ERROR: JWT must be provided!");
    }
    else{
        let isValid = await new Promise((resolve, reject) =>{

            JWT.verify(token, process.env.RESET_PASSWORD_SECRET, async(err, decoded)=>
            {   
                
                if(err)
                {
                    console.log("Token ERROR | ", err);
                    resolve({"Error": "Token Expired!", "userId": "" });
                    // res.send(err);
                    // reject(false);
                    // resolve(false);
                }
                else
                {
                    console.log("Token Valid | ",decoded);
                    resolve({"isValid": true, "userId": decoded.aud});
                }
            });
        });
        
        return isValid;
    }

    
    
}

module.exports.validateAccessToken = async function(token)
{
    console.log("validateAccessToken() called")
    // let token = req.body.token;
    if(!token){
        console.log("ERROR: JWT must be provided!");
    }
    else{
        let isValid = await new Promise((resolve, reject) =>{

            JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>
            {   
                // console.log("async")
                if(err)
                {
                    console.log("Token ERROR | ", err);
                    resolve({"Error": "Token Expired!", "userId": "" });
                    // res.send(err);
                    // reject(false);
                    // resolve(false);
                }
                else
                {
                    console.log("Token Valid | ",decoded);
                    resolve({"isValid": true, "userId": decoded.aud});
                }
            });
        });
        // res.status(200).json({"Validation": isValid});
        return isValid;
    }

    // console.log("Token")
  
    // console.log("isValid : ",isValid);
    
}

module.exports.validateRefreshToken = async function(token)
{
    // let token = req.body.token;
    console.log("validateRefreshToken() called")

    let isValid = await new Promise((resolve, reject) =>{

        JWT.verify(token,process.env.REFRESH_TOKEN_SECRET,async(err, options)=>
        {
            if(err)
            {
                console.log("Token Expired | ",err);
                // reject(false);
                resolve(false);
            }
            else
            {
                console.log("Refresh-Token Valid | ",options);
                resolve({"isValid": true,"userId":options.aud});
            }
        })
    })
    
    // res.status(200).json({"Validation": isValid});
    return isValid;
}

module.exports.refreshTheTokens = async (refreshToken) => {
    try{
        // let isValid = await validateRefreshToken(refresh_Token);
        console.log("Refreshing all:");
    }
    catch(error){

    }
}

module.exports.expireAccessToken = async (email)=>{
    let accessToken = await new Promise((resolve, reject) =>
    {
        console.log("expireAccessToken() called");

        // let email =req.body.email;
        let secret = process.env.ACCESS_TOKEN_SECRET;
        // console.log(secret);

        let payload = {};
        let options ={
            issuer:"food-zone",
            audience: email,
            expiresIn:'1s' 
            };
        
        JWT.sign(payload, secret, options, (err, token) => {
            if(err){
                console.log("Token rejected");
                reject(err);
            }
            console.log("accessToken resolved and expired");
            resolve(token);
        });
        
    });
    console.log("accessToken:",accessToken);
    // res.status(200).json({"Access_Token": token});
    return accessToken;
}

module.exports.sendEmail = (email, link, validationCode)=>{

    // "https://myaccount.google.com/lesssecureapp"                     (Required: Go to this link after loggingIn in 
    //                                                                   the email you are using and enable less secure app setting)
   console.log("sendEmail() called");
    try{
        let isSent;
        let transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',       //Email which will be used for sending mails
                pass: ''        //its password
            }
        });
        console.log("Creating Mail...");

        let mailOptions = {
            from: 'owes1199@gmail.com',
            to: 'oweskhan@onports.in',
            subject: `Reset Your Password`,
//             text: `This is an auto generated email please do not reply,
// click on the link below to reset your password.`,               
            html: `<div><b>Click here: </b><a href="${link}">reset password</a></div><div><b>Then enter your one-time validation code: ${validationCode}</b><div><div style="color: red">This is an auto generated mail please do not reply</div>`
        }

        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                console.log("Error in sending mail");
                isSent = 0;

            }
            else{
                console.log("Mail sent successfully:", info.response);
                isSent = 1;
            }
        });
        console.log(isSent);
    // return isSent;
    }
    catch(error){
        console.log(`jwt_Helper: sendEmail: Error: ${error.message}`);
    }
    

}

module.exports.randomNumber = ()=>{

    
    // let options = {
    //     min: 9874316514 // example input
    // }
    let gen1 = randomNumber.generator({
        min:  1000
      , max:  9999
      , integer: true
      })
      let gen2 = randomNumber.generator({
        min:  1000
      , max:  9999
      , integer: true
      })
    let num1= gen1();
    let num2 = gen2();
    let number = num1+num2;
    console.log("RANDOM", num1,"::", num2);
    return number;
}




// generateAccessToken("owes@gmail");
// validateAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg5MDI1MTUsImV4cCI6MTYxODkwNjExNSwiYXVkIjoic29oYWlsQGdtYWlsIiwiaXNzIjoicmhvIn0.ioxhE6dmqA0mLWOXQ2BV_gyNxoj5_DLgbaSZ_hcKLs8")