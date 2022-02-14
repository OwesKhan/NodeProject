// const { append } = require('express/lib/response');
// const client = require('pg/lib/native/client');

let sqlUtils = require('../utils/queryUtils');



module.exports.insertIntoRestaurants= async(columns, values)=>{
    
    console.log("Values= "+ columns+": :"+values);

    let sql = await sqlUtils.insertIntoTable("restaurants", columns);
    let data = [...values];

    //getTransaction() will return client connected to DB.
    console.log("model");
    let client = await dbUtils.getTransaction();            
    try{
        console.log('in model')
        //sqlExecSingleRow() will query to DB and return result.
        let result = await dbUtils.sqlExecSingleRow(client, sql, data);  
        //Commit the changes.
        await dbUtils.commit(client); 
        return result;
    }
    catch(error){
        logger.error(`model_Companies: insertIntoCompanies: Error: ${error.message}`);
        //Rollback all changes.
        await dbUtils.rollBack(client);
        throw new Error(error.message);
    }
    
}

//----------------------------------------------
const client=  require('../db/dbConfig');

module.exports.getRestaurantsData= ()=> {
    // client.connect();
// app.get('/user', (req, res)=>{
//     client.query('select * from table', (err, result)=>{
//         if(!err) {
//             res.send(result.rows);
//         }
//     })
//     client.end;
// });
return "data"
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