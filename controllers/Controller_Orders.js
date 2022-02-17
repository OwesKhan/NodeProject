let model_Orders= require('../models/model_Orders');
let uuid= require("../utils/uuidGenerator");


//-------------------Get Orders Data------------------------
module.exports.getOrders = async(req,res)=>{
    console.log("getOrdersController called");
    try{
        let details= await model_Orders.getOrders();
        console.log("returned from getOrderController()");
        if(details.rowCount>=0)
        {
             res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Order Fetched Successfully!!!',
                data: details.rows
            });
        }
        else{
            res.status(500).json({
                status: 'success',
                statusCode: 200,
                message: 'Order could not be fetched Successfully!!!',
                data: details.rows
            });
        }
    }
    catch(e){
        console.log("error in getOrderController: ",e);
        res.status(500).json(
            {
                status: 'Failure',
                statusCode: 500,
                message: `Something went wrong in fetching orders! ${err}`,
                data: []
            });
    }
}


//----------------------------Insert Into Orders--------------------------------------
module.exports.insertIntoOrders= async (req, res) => {
    
    let columns= Object.keys(req.body);
    let values= Object.values(req.body);
    console.log("received: " + columns+ "    "+ values);
    // let uniqueKey = uuid.uuidGenerator();
    // console.log("Generated key: ", uniqueKey);
    // // columns.push("restokey");
    // // values.push(uniqueKey);

    try{
        console.log("in Controller: InsertOrders()");
         let details= await model_Orders.insertIntoOrders(columns, values);

        if(details.rowCount >= 0){
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Order Inserted Successfully',
                data: details.rows
            });
        }
        else{
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Could not Inserted!',
                data: []
            });
        }
    }
    catch(err){
        res.status(500).json(
            {
                status: 'success',
                statusCode: 500,
                message: `something went wrong while Inserting! ${err}`,
                data: []
            });
    }
}


//----------------------------Delete From Orders--------------------------------------
module.exports.deleteFromOrders= async (req, res) => {
    
    let idToBeDeleted= Object.values(req.body); 
    console.log("Requested id to be deleted: ", idToBeDeleted);

    try{
        console.log("in Controller: DeleteOrders()");
         let details= await model_Orders.deleteFromOrders(idToBeDeleted);

        if(details.rowCount >= 0){
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Order Deleted Successfully',
                deletedId: idToBeDeleted,
                data: details.rows,
            });
        }
        else{
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Could not delete!',
                data: []
            });
        }
    }
    catch(err){
        res.status(500).json(
            {
                status: 'success',
                statusCode: 500,
                message: `something went wrong while deleting! ${err.message}`,
                data: []
            });
    }
}


//----------------------------Get Orders By Id--------------------------------------
module.exports.getOrdersById= async (req, res) => {
    
    let id= Object.values(req.body); 
    console.log("Requested id to be fetched: ", id);

    try{
        console.log("in Controller: OrdersById()");
         let details= await model_Orders.getOrdersById(id);

        if(details.rowCount > 0){
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Order By Id fetched Successfully',
                data: details.rows,
            });
        }
        else{
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Could not Fetch Id!',
                data: []
            });
        }
    }
    catch(err){
        res.status(500).json(
            {
                status: 'success',
                statusCode: 500,
                message: `something went wrong while fetching Id! ${err.message}`,
                data: []
            });
    }
}


