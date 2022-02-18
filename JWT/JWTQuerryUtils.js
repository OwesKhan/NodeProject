let bcrypt = require('bcrypt');
let dbUtils = require('../utils/dbUtils');
let {
    updateTable,
    insertIntoTable } = require('../utils/queryUtils');


    
    
module.exports.doesExist = async (column, value)=>{
    let sql= `SELECT * FROM "login" WHERE ${column} = $1`;
    let data = [value];
    let client = await dbUtils.getTransaction();
    try{
        let result = await dbUtils.sqlExecSingleRow(client, sql, data);
        await dbUtils.commit(client);
        return result;
    }
    catch(error){
        console.log('JWTQuerryUtils: doesExist: Error: ', error.message);
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
}



module.exports.insertRegistration = async (columns, values) => {
        
        console.log("Insert registration Called!");
        let sql = insertIntoTable("login", columns);
        let data = [...values];
        let client = await dbUtils.getTransaction();
        
        try{
            let result= await dbUtils.sqlExecSingleRow(client, sql, data);
            await dbUtils.commit(client);
            return result;
        }
        catch(error){
            console.log('JWTQuerryUtils: insertRegistration: Error: ', error.message);
            await dbUtils.rollback(client);
            throw new Error(error.message);
        }
}

module.exports.updateToken = async (email, access_token, refresh_token)=>{
    let sql = `UPDATE "login" SET access_Token= $1, refresh_Token= $2 WHERE email= $3`;
    
    // let sql = await updateToken("Users",)
    let data = [access_token, refresh_token, email];
    let client = await dbUtils.getTransaction();
    try{
        let result= await dbUtils.sqlExecSingleRow(client, sql, data);
        await dbUtils.commit(client);
        return result;
    }
    catch(error){
        console.log('JWTQuerryUtils: updateToken: Error: ', error.message);
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.updateSingleValue = async (column, value, email) => {
    let sql = `UPDATE "login" SET ${column}= $1 WHERE email= $2`;
    let data = [value, email];
    let client = await dbUtils.getTransaction();
    try{
        let result = await dbUtils.sqlExecSingleRow(client, sql, data);
        await dbUtils.commit(client);
        return result;
    }
    catch(error){
        console.log('JWTQuerryUtils: setNewPassword: Error: ', error.message);
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.deleteUserToken = async (email) => {
    let sql = 'DELETE FROM "login" WHERE email= $1';
    let data= [email];
    let client = await dbUtils.getTransaction();
    try{
        let result = await dbUtils.sqlExecSingleRow(client, sql, data);
        await dbUtils.commit(client);
        return result;
    }
    catch(error){
        connectionString.log('JWTQuerryUtils: deleteUser: Error: ', error.message);
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
}