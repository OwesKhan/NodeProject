let JWTValidation = require('../JWT/JWTValidations');
let JWTQuerryUtils = require('../JWT/JWTQuerryUtils');
let jwtHelper = require('../JWT/jwt_Helper');

let dbUtils = require('../utils/dbUtils');





module.exports.signUp = async (email, password, username)=>{

   

    try{
        let doesExist = await JWTQuerryUtils.doesExist("email", email);
        // console.log(doesExist.rows[0]);
        if(doesExist.rowCount == 0){
            console.log("Record doesn't exist!");
            return doesExist;
        }
        else{
            console.log("already exist!");
            return doesExist;
        }


    //     console.log(username, email, password);
    //     console.log("Inside JWTAuth Model");
        
    //     let sql = dbUtils.updateTable("Users", columns);
    //     let data = [username, email, password, access_token, refresh_Token, key];
    //     let client = await dbUtils.getTransaction();

    //     try{
    //         let result = await JWTUtils.sqlExecSingleRow(client, sql, data);
    //         await sbUtils.commit(client);
    //         return result;
    //     }
    //     catch(error){
    //         logger.Error('model_JWTAuth: resister: Error: ', error.message);
    //         await dbUtils.rollback(client);
    //         throw new Error(error.message);
    //     }    
    //     // JWTUtils.validatePassword(hashedPassword, "$2b$10$okbc.N7TJqQYPLPVPN.bCOBqr5/$2b$10$fGFGLoNyxIx.wEjBChn2FeUDBcgrwF73NdTtfdq1.4qGw8/GAe49W.");
    //     // res.send({"Username":isValidEmail});
        
    }
    catch(err){
        console.log(`model_JWTAuth: signUp: Error: ${err.message}`);
        await dbUtils.rollback(client);
        throw new Error(err.message);
    }
}

module.exports.signIn = async (email)=>{
    
    try{
        let doesExist = await JWTQuerryUtils.doesExist("email", email);
        if(doesExist.rowCount > 0 ){
            console.log('Existing user');
            return doesExist;
        }
        else{
            console.log("Not an Existing user");
            return doesExist;
        }
    }
    catch(error){
        console.log('model_JWTAuth: signIn: Error: ',error.message);
        // await dbUtils.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.signOut = async (email, token)=>{
    
    try{
        // let details= await JWTQuerryUtils.deleteUserToken(email);
        // console.log("Rows affected: ",details.rowCount);
        // let expiringAccessToken = await jwtHelper.expireAccessToken(email);
        // let refreshToken = await jwtHelper.generateRefreshToken(email);
            try{
                console.log("in sign out check()");
                let doesExist = await JWTQuerryUtils.doesExist("access_token", token);
                // console.log("CHECKING: ", doesExist.rows);
                if(doesExist.rowCount > 0 ){
                    console.log('logged out');
                    let details = await JWTQuerryUtils.updateToken(email, "", ""); 
                    return details;
                }
                else{
                    console.log("Log in first");
                    return doesExist;
                }
            }
            catch(error){
                console.log('QuerryUtil: signOutCheck: Error: ',error.message);
                // await dbUtils.rollback(client);
                throw new Error(error.message);
            }
    }
    catch(error){
        console.log('model_JWTAuth: signOut: Error: ', error.message);
        throw new Error(error.message);
        
    }
}

module.exports.autoSignIn = async (email, access_token, refresh_token)=>{
    try{
        let details = await JWTQuerryUtils.updateToken(email, access_token, refresh_token); 
        
        return details;
    }
    catch(error){
        console.log('model_JWTAuth: autoSignIn: Error: ', error.message);
        throw new Error(error.message);
    }
}

module.exports.refreshAllTokens = async (refreshToken)=>{

    let isValid = await jwtHelper.validateRefreshToken(refreshToken);
    console.log(refreshToken);
    console.log("R: ", isValid);
    if(isValid.isValid){

        // jwtHelper.refreshTheTokens(refreshToken);
        let email = isValid.userId;
        // console.log("Email: ", email);
        try{

            let accessToken = await jwtHelper.generateAccessToken(email);
            let refreshToken = await jwtHelper.generateRefreshToken(email);
            let details = await JWTQuerryUtils.updateToken(email, accessToken, refreshToken);
            console.log(details.rowCount);
            return {accessToken: accessToken, refreshToken: refreshToken };
        }
        catch(error){
            console.log('model_JWTAuth: refreshAllTokens: Error: ', error.message);
            throw new Error(error.message);
        }

        // console.log(accessToken,":::" ,refreshToken);
        
    }
    else{
        console.log("INVALID");  
        return 0;  
    }
    
}

module.exports.forgetPassword = async (email) => {

    console.log("forgetPassword() called");

    let isValid = JWTValidation.validateEmail(email);
    try{
    console.log(isValid);
    if(isValid){
        let result = await JWTQuerryUtils.doesExist("email", email);
        // console.log("DoesExistEmail: ", doesExistEmail);
    
        if(result.rowCount > 0){

            let resetToken = await jwtHelper.generateResetPasswordToken(email);
            let link = 'https://rho-admin.web.app/admin/change_password?token='+ resetToken;
            console.log("RESET: ",link);

            let validationCode= jwtHelper.randomNumber();
            console.log(validationCode);

            let setCodeInDB = await JWTQuerryUtils.updateSingleValue("password_reset_validation_code", validationCode, email);
            
            if(setCodeInDB.rowCount > 0){
                console.log("Validation Code stored successfully in DB");
            }
            else{
                console.log(`Error: While storing validation code`);
                
            }

            let isEmailSent = jwtHelper.sendEmail(email, link, validationCode);
            console.log("SENT? ", isEmailSent);

            return result;

        }
        else{
            return result;
        }
        
    }
    else{
        return {"isValidEmail": false};
    }
    }
    catch(error){
        console.log('model_JWTAuth: forgetPassword: Error: ', error.message);
        throw new Error(error.message);  }
}

module.exports.setNewPassword = async (newPassword, email, validationCode) =>{
    try{
        let result = await JWTQuerryUtils.updateSingleValue("password", newPassword, email);
        let removeCode = await JWTQuerryUtils.updateSingleValue("password_reset_validation_code", "", email);
        console.log("validationCode removed successfully"+removeCode.rowCount);
        return result;
    }
    catch(error){
        console.log('model_JWTAuth: setNewPassword: Error: ', error.message);
        throw new Error(error.message);
    }
}

module.exports.setNotificationToken = async (notificationToken, email)=>{
    try{
        let result = await JWTQuerryUtils.updateSingleValue("notification_token", notificationToken, email);
        return result;
    }
    catch(error){
        console.log(`model_JWTAuth: setNotificationToken: Error: ${error.message}`);
        throw new Error(error.message);
    }
}
