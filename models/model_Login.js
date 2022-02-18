const dbUtils=  require('../utils/dbUtils');
let sqlUtils = require('../utils/queryUtils');


module.exports.getLogin = async() => {
    console.log("getLogin called");

    let sqlQuery = `SELECT * FROM login`;
    let client = await dbUtils.getTransaction();
    try{
        let result = await dbUtils.sqlExecSingleRow(client,sqlQuery,[]);
        console.log(result.rows);
        await dbUtils.commit(client);
        return result;
    }
    catch(e){
        console.log(`model_Login: getLogin: Error: ${error.message}`);
        await dbUtils.rollback();
        throw new Error(error.message);
    }
}


module.exports.insertIntoLogin= async(columns, values)=>{
    
    console.log("Data= "+ columns+": :"+values);

    let sql = await sqlUtils.insertIntoTable("login", columns);
    let data = [...values];

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside InsertLogin Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, data);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Login: insertIntoLogin: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}


module.exports.deleteFromLogin= async(id)=>{

    let sql = `DELETE FROM login WHERE id= ${id}`;

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside DeleteLogin Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, []);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Login: deleteLogin: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}


module.exports.getLoginById= async(id)=>{

    let sql = `SELECT * FROM login WHERE id= ${id}`;

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside LoginById Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, []);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Login: LoginById: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}
