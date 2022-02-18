// const { append } = require('express/lib/response');
// const client = require('pg/lib/native/client');

const dbUtils=  require('../utils/dbUtils');
let sqlUtils = require('../utils/queryUtils');


module.exports.getCatagories = async() => {
    console.log("getCatagories called");

    let sqlQuery = `SELECT * FROM catagories`;
    let client = await dbUtils.getTransaction();
    try{
        let result = await dbUtils.sqlExecSingleRow(client,sqlQuery,[]);
        console.log(result.rows);
        await dbUtils.commit(client);
        return result;
    }
    catch(e){
        console.log(`model_Catagories: getCatagories: Error: ${error.message}`);
        await dbUtils.rollback();
        throw new Error(error.message);
    }
}


module.exports.insertIntoCatagories= async(columns, values)=>{
    
    console.log("Data= "+ columns+": :"+values);

    let sql = await sqlUtils.insertIntoTable("catagories", columns);
    let data = [...values];

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside InsertCatagories Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, data);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Catagories: insertIntoCatagories: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}


module.exports.deleteFromCatagories= async(id)=>{

    let sql = `DELETE FROM catagories WHERE catagory_id= ${id}`;

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside DeleteCatagories Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, []);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Catagories: deleteCatagories: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}


module.exports.getCatagoriesById= async(id)=>{

    let sql = `SELECT * FROM catagories WHERE catagory_id= ${id}`;

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside CatagoriesById Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, []);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Catagories: CatagoriesById: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}
