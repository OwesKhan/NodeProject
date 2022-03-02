// const { append } = require('express/lib/response');
// const client = require('pg/lib/native/client');

const dbUtils=  require('../utils/dbUtils');
let sqlUtils = require('../utils/queryUtils');


module.exports.getCart = async() => {
    console.log("getCartModel called");

    let sqlQuery = `SELECT * FROM cart`;
    let client = await dbUtils.getTransaction();
    try{
        let result = await dbUtils.sqlExecSingleRow(client,sqlQuery,[]);
        console.log(result.rows);
        await dbUtils.commit(client);
        return result;
    }
    catch(e){
        console.log(`model_Cart: getCart: Error: ${error.message}`);
        await dbUtils.rollback();
        throw new Error(error.message);
    }
}


module.exports.insertIntoCart= async(columns, values, bearerToken)=>{
    
    console.log("Data= "+ columns+": :"+values);

    columns.push("user_id");
    console.log("COLUMNS: ", columns);
    let sql = await sqlUtils.insertIntoTable('cart', columns);
    let getUId_SQL= `select id from login where access_token= '${bearerToken}'`;
    let data = [...values];

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();  

    try{
        console.log("Inside InsertCart Model");
        //Fetching user id using token.
        let UId= await dbUtils.sqlExecSingleRow(client, getUId_SQL, []);
        // console.log(UId.rows[0].id);
        data.push(UId.rows[0].id);
        console.log("UID: ", data);

        // sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, data);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Cart: insertIntoCart: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}


module.exports.deleteFromCart= async(id)=>{

    let sql = `DELETE FROM cart WHERE catagory_id= ${id}`;

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside DeleteCart Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, []);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Cart: deleteCart: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}


module.exports.getCartById= async(id)=>{

    let sql = `SELECT * FROM cart WHERE catagory_id= ${id}`;

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside CartById Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, []);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Cart: CartById: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}
