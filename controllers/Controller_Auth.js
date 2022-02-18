let jwtHelper = require('../JWT/jwt_Helper');
let JWTValidation = require('../JWT/JWTValidations');
let JWTQuerryUtils = require('../JWT/JWTQuerryUtils');
let modelJWT = require('../models/model_Auth');
let uuidGen = require('../utils/uuidGenerator');


// let {insertIntoTable} = require('../utils/queryUtils');


module.exports.signUp = async(req, res)=>{

    const {username, email, password} = req.body;

    let key = uuidGen.uuidGenerator();
    console.log(key);

    if(!email || !password || !username){
        res.send("Error: Bad Request! Fields can't be empty!");
    }

    try{
        let details = await modelJWT.signUp(email, password, username);

        if(details.rowCount == 0)
        { 
            console.log("Controller-Auth: Record doesn't exist");

            let validEmail = JWTValidation.validateEmail(email);
            let validUsername = JWTValidation.validateUsername(username);
            
            if(validEmail && validUsername)
            {
                let encodedPassword = await  JWTValidation.hashPassword(password);
                console.log(encodedPassword);

                let access_Token = await jwtHelper.generateAccessToken(email);
                let refresh_Token = await jwtHelper.generateRefreshToken(email);
                console.log("Token generated");

                let columns = ["email", "password", "name", "access_token", "refresh_token", "key"];
                let values = [email, encodedPassword, username, access_Token, refresh_Token, key];

                let insertDetails = await JWTQuerryUtils.insertRegistration(columns, values);
                console.log(insertDetails);

                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    message: "Registered successfully.",
                    username: username,
                    email: email,
                    accessToken: access_Token,
                    refreshToken: refresh_Token
                });

            }
            else{
                res.status(400).json({
                    status: "Bad Request",
                    statusCode: 400,
                    message: "Invalid Email Or Username"
                });
            }
        }
        else{
            res.status(200).json({
                status:"Bad request!",
                message:"Record already exists!"

            });
        }
       
    }
    catch(error){
        console.log('controller_JWTAuth: signUp: Error: ', error.message);
        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: error.message
        });
    }


    // let encodedPassword = JWTUtils.hash(password);

    // let isValidEmail= JWTUtils.validateEmail(email);
    // let isValidUsername = JWTUtils.validateUsername(username);
    //// let encodedPassword= await JWTUtils.hashPassword(password);

    // let access_Token = JWTHelper.generateAccessToken(email);
    // let refresh_Token = JWTHelper.generateRefreshToken(email);

    // try{
    //     let details = await modelJWT.signUp(columns, values);
    //     if(details.rowCount > 0){
    //         res.send
    //     }
    // }
    // catch(error){
    //     res.status(500).json({
    //         status: 'error',
    //         statusCode: 500,
    //         message: error.message
    //     });
    // }
    
}

module.exports.signIn = async (req, res)=>{

    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    // console.log(req);

    try{
        let validEmail = JWTValidation.validateEmail(email);
        // let validUsername= JWTValidation.validateUsername(username);
        
        if(validEmail)
        {

            console.log("Details verified");
            let details = await modelJWT.signIn(email);
            // console.log(details.rows);

            if(details.rowCount > 0)
            {
                console.log("Login");
                let passwordDB = details.rows[0].password;
                // console.log(passwordDB);
                let isValidPassword = await JWTValidation.validatePassword(password, passwordDB);
                // console.log(isValidPassword);

                if(isValidPassword)
                {
                    let access_Token = await jwtHelper.generateAccessToken(email);
                    let refresh_Token = await jwtHelper.generateRefreshToken(email);
                    // console.log(access_Token,":::", refreshToken);
                    
                    
                    let result = await JWTQuerryUtils.updateToken(email, access_Token, refresh_Token);
                    if(result.rowCount > 0)
                    {
                        console.log("Token updated");
                        res.status(200).json(
                        {
                            status: "success",
                            statusCode: 200,
                            message: 'Logged in successfully!',
                            username: username,
                            email: email,
                            access_Token: access_Token,
                            refresh_Token: refresh_Token,
                        });
                    }
                    else
                    {
                        console.log("Error In token updation");
                        res.status(400).json({
                            status: 'error',
                            statusCode: 400,
                            message: 'Could not update'
                        });
                    }

                }
                else{
                    res.status(401).json({
                        status: "Invalid",
                        statusCode: 401,
                        message: "Invalid Password"

                    });
                }
            }
            else
            {
                console.log("You need to signup first");
                res.status(404).json({
                    status: 'Bad Request',
                    statusCode: 400,
                    message: 'You need to signup first!'
                });
            }
        }
        else
        {
            console.log("Wrong Credentials!");
            res.status(400).json(
            {
                status: 'Bad Request',
                statusCode: 400,
                message: "Invalid username or Email"
            });
        }
    }
    catch(error){
        res.status(500).json({
            status: "error",
            statusCode : 500,
            message: error.message
        });
    }
}

module.exports.signOut = async (req, res) => {
    let token = req.body.token;
    console.log("res Token: ", token);
    if(!token)
    {
        res.status(401).json({
            status: '401 Unauthorized',
            statusCode: 401,
            message: 'You need to signIn first'
        });
    }
    let isVerifiedToken= await jwtHelper.validateAccessToken(token);
    if(!isVerifiedToken)
    {
        return res.status(401).json({"Expired":"Token expired"});
    }
    console.log("So",isVerifiedToken.userId);
    let email = isVerifiedToken.userId;

    try{
        let details = await modelJWT.signOut(email, token);
        if(details.rowCount > 0)
        {
            res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'You are logged Out successfully'
            });
        }
        else
        {
            res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Could not signOut! Login First or Try again later.'
            });
        }
    }
    catch(error){
        res.status(500).json({
            status: "error",
            statusCode : 500,
            message: error.message
        });
    }
}

module.exports.autoSignIn = async (req, res)=>{

    const authHeader = await req.headers['authorization'];
    const bearerToken = authHeader.split(" ")[1];;
    console.log("bearerToken:-", bearerToken);
    // console.log(authHeader);
    

    let doesExistToken = await JWTQuerryUtils.doesExist("access_token", bearerToken);
    console.log("Exist?",doesExistToken.rowCount);
    
    
    // // let token = bearerToken[1];

    if(doesExistToken.rowCount > 0){
        let isValidToken = await jwtHelper.validateAccessToken(bearerToken);
        if(isValidToken.isValid){
            let email = isValidToken.userId;

            let newAccessToken = await jwtHelper.generateAccessToken(email);
            let newRefreshToken = await jwtHelper.generateRefreshToken(email);
            
            try{
                let details = await modelJWT.autoSignIn(email, newAccessToken, newRefreshToken);
                if(details.rowCount > 0){
                res.status(200).json({
                        status: 'success',
                        statusCode: 200,
                        message: 'Auto signIn successful!',
                        email: email,
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken
                    });
                }
                else{
                    res.status(200).json({
                        status: 'success',
                        statusCode: 200,
                        message: 'Auto signIn Failed!'
                    })
                }
            }
            catch(error){
                res.status(500).json({
                    status: "error",
                    statusCode: 500,
                    message: error.message
                });
            }
        }
        else{
            res.status(401).json({
                status: "unauthorized",
                statusCode: 401,
                message: "Invalid Token"
            });
        }
    }
    else{
        res.status(401).json({
            status: "unauthorized",
            statusCode: 401,
            message: "Invalid Token(Not Found)"
        })
    }

}

module.exports.refreshAllTokens = async (req, res) => {

    let refreshToken = req.body.refreshToken;
    try{
    let tokens = await modelJWT.refreshAllTokens(refreshToken);
    if(tokens!=0){
        
        console.log(tokens.accessToken,":::", tokens.refreshToken);

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Tokens refreshed successfully.'
        });
    }
    else{
        res.status(401).json({
            status:'unauthorized',
            statusCode: 401,
            message: 'Invalid refresh token'    
        });
    }

    }
    catch(error){

    }
}

module.exports.forgetPassword = async (req, res) => {
    let email= req.body.email;
    try{
        let details= await modelJWT.forgetPassword(email);
        if(details.rowCount > 0){
            res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: `reset link has been sent to your email valid for 20 minutes only,
In case you can't find mail in Inbox, Please check your spam as well.`
            });
        }
        else{
            res.status(404).json({
                status:'Not Found',
                statusCode: 404,
                message: 'Email not found!'
            });
        }
    }
    catch(error){
        res.status(500).json({
            status:'unauthorized',
            statusCode: 401,
            message: ''
        });
    }
}

module.exports.setNewPassword = async (req, res) => {
    let token = req.body.token;
    let validationCode = req.body.validationCode;
    
    // const authHeader = await req.headers['authorization'];
    // const bearerToken = authHeader.split(" ")[1];;
    // console.log("bearerToken:-", bearerToken);
    try{
        let tokenDetails = await jwtHelper.validateResetPasswordToken(token);
        let validationCodeExistance = await JWTQuerryUtils.doesExist("password_reset_validation_code", validationCode);
        if(tokenDetails.isValid){
            if(validationCodeExistance.rowCount > 0){

                let email = tokenDetails.userId;
                let newPassword = req.body.newPassword;
                let reEnteredPassword = req.body.reEnteredPassword;
                // logger.info(email,"::", reEnteredPassword, "::", newPassword);

                if(newPassword === reEnteredPassword){
                    let encodedPassword = await JWTValidation.hashPassword(newPassword);
                    // console.log("New Hashed Pass: " + encodedPassword);
                    let details = await modelJWT.setNewPassword(encodedPassword, email, validationCode);
                    if(details.rowCount > 0){
                        console.log("password updated successfully by: " + email);

                        res.status(200).json({
                            status: 'success',
                            statusCode: 200,
                            message: 'New password updated successfully'
                        });
                    }
                    else{
                        console.log("Could not update new password");
                        res.status(200).json({
                            status: 'success',
                            statusCode: 200,
                            message: 'Could not update new password!'
                        });
                    }
                }
                else{
                    res.status(400).json({
                        status: 'Invalid password',
                        statusCode: 400,
                        message: 'Passwords does not matched correctly!'
                    });
                }
            }
            else{
                console.log("Validation code already been deleted");
                res.status(404).json({
                    status: 'Validation Code Expired',
                    statusCode: 404,
                    message: "Password have been changed using this validation code."
                });
            }
            
        }
        else{
            res.status(401).json({
                status:'unauthorized',
                statusCode: 401,
                message: 'Invalid token or token expired'
            });
        }
    }
    catch(error){
        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: error.message
        });
    }
}

module.exports.resetPassword = async(req,res)=>
{
    let email = req.body.email;
    let password = req.body.password;
    let newPassword = req.body.newpassword; 
    // console.log(req.body);
    if(password!= null && password!=undefined)
    {
        let details = await JWTQuerryUtils.doesExist("email", email);
        console.log("CHECKING DATA", details.rows);
        if(details.rowCount>0)
        {
            let passwordDB = details.rows[0].password;
            // console.log(passwordDB);
            let isVerified = await JWTValidation.validatePassword(password,passwordDB);
            if(isVerified)
            {
                newPassword = await JWTValidation.hashPassword(newPassword);
                console.log("NEW RESET HASH: " + newPassword);

                let result = await JWTQuerryUtils.updateSingleValue("password", newPassword, email);
                if(result.rowCount>0)
                {
                    return res.status(200).json({
                        status:"success",
                        statusCode:200,
                        message:"Password reset successfully",
                        data:[]
                    });
                }
                else
                {
                    return res.status(200).json({
                        status:"error",
                        statusCode:200,
                        message:"something went wrong",
                        data:[]
                    })
                }
            }
            else
            {
                return res.status(400).json({
                    status:"error",
                    statusCode:400,
                    message:"Invalid Password",
                    data:[]
                })
            }
        }
        else
        {
            return res.status(400).json({
                status:"error",
                statusCode:400,
                message:"User Not Found",
                data:[]
            })
        }
    }
    else
    {
        console.log("Inside Else");
        newPassword = await JWTValidation.hashPassword(newPassword);
        let result = await JWTQuerryUtils.updateSingleValue("password", newPassword, email);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"success",
                data:[]
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:200,
                message:"something went wrong",
                data:[]
            })
        }
    }   
}

module.exports.setNotificationToken = async (req, res) =>{
    let email = req.body.email;
    let notificationToken = req.body.notificationToken;
    try{
        let details = await modelJWT.setNotificationToken(notificationToken, email);
        if(details.rowCount > 0){
            res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'notification token row affected successfully',
                data: details.rows
            });
        }
        else{
            res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Could not set Token successfully!'
            })
        }
    }
    catch(error){
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: error.message
        })
    }


}
