// const { append } = require('express/lib/response');
// const client = require('pg/lib/native/client');

const dbUtils=  require('../utils/dbUtils');
let sqlUtils = require('../utils/queryUtils');


module.exports.getRestaurants = async() => {
    console.log("getRestaurants called");
    let sqlQuery = `select * from "restaurants"`;
    let client = await dbUtils.getTransaction();
    try{
        let result = await dbUtils.sqlExecSingleRow(client,sqlQuery,[]);
        console.log(result.rows);
        await dbUtils.commit(client);
        return result;
    }
    catch(e){
        console.log(`model_Restaurants: getrestaurants: Error: ${error.message}`);
        await dbUtils.rollback();
        throw new Error(error.message);
    }
}


module.exports.insertIntoRestaurants= async(columns, values)=>{
    
    console.log("Data= "+ columns+": :"+values);

    let sql = await sqlUtils.insertIntoTable("restaurants", columns);
    let data = [...values];

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside InsertResto Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, data);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Restaurants: insertIntoRestaurants: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}


module.exports.deleteFromRestaurants= async(id)=>{

    let sql = `DELETE FROM restaurants WHERE restoid= ${id}`;

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside DeleteResto Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, []);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Restaurants: deleteRestaurants: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}


module.exports.getRestaurantById= async(id)=>{

    let sql = `SELECT * FROM restaurants WHERE restoid= ${id}`;

    //getTransaction() will return client connected to DB.
    let client = await dbUtils.getTransaction();            
    try{
        console.log("Inside RestoById Model");
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, []);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        console.log(`model_Restaurants: RestaurantById: Error: ${error.message}`);
        //rollback all changes.
        await dbUtils.rollback(client);
        throw new Error(error.message);
    }
    
}






//-------------------------------------------------
// client.connect();
// app.get('/user', (req, res)=>{
//     client.query('select * from table', (err, result)=>{
//         if(!err) {
//             res.send(result.rows);
//         }
//     })
//     client.end;
// });
// app.post('/users', (req, res)=>{
//     let data= req.body;
//     let insertQuery= `Insert into table (id, name) values'${data.id},${data.name})`;
//     client.query(insertQuery, (err, res)=>{
//         if(!err){
//             res.send(insertQuery);
//         }
//         else{
//             res.send("Not Inserted");   
//         }
//     })
//     client.end();
// });
//----------------------------------------------