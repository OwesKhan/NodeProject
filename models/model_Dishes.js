const dbUtils=  require('../utils/dbUtils');
let sqlUtils = require('../utils/queryUtils');


module.exports.getDishes = async() => {
    console.log("getDishes called");

    let sqlQuery = `SELECT * FROM dishes`;
    let client = await dbUtils.getTransaction();
    try{
        let result = await dbUtils.sqlExecSingleRow(client,sqlQuery,[]);
        console.log(result.rows);
        await dbUtils.commit(client);
        return result;
    }
    catch(e){
        console.log(`model_Dishes: getDishes: Error: ${error.message}`);
        await dbUtils.rollback();
        throw new Error(error.message);
    }
}


module.exports.insertIntoDishes= async(columns, values)=>{
    
    console.log("Data= "+ columns+": :"+values);

    let sql = await sqlUtils.insertIntoTable("dishes", columns);
    let data = [...values];

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside InsertDishes Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, data);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Dishes: insertIntoDishes: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}


module.exports.deleteFromDishes= async(id)=>{

    let sql = `DELETE FROM dishes WHERE dish_id= ${id}`;

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside DeleteDishes Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, []);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Dishes: deleteDishes: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}


module.exports.getDishById= async(id)=>{

    let sql = `SELECT * FROM dishes WHERE dish_id= ${id}`;

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside DishById Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, []);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Dishes: DishById: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}
