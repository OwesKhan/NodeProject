let model_Dishes= require('../models/model_Dishes');
let uuid= require("../utils/uuidGenerator");


//-------------------Get Dishes Data------------------------
module.exports.getDishes = async(req,res)=>{
    console.log("getDishesController called");
    try{
        let details= await model_Dishes.getDishes();
        console.log("returned from getDishesController()");
        if(details.rowCount>=0)
        {
             res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Dishes Fetched Successfully!!!',
                data: details.rows
            });
        }
        else{
            res.status(500).json({
                status: 'success',
                statusCode: 200,
                message: 'Dishes could not be fetched Successfully!!!',
                data: details.rows
            });
        }
    }
    catch(e){
        console.log("error in getDishController: ",e);
        res.status(500).json(
            {
                status: 'Failure',
                statusCode: 500,
                message: `Something went wrong in fetching dishes! ${err}`,
                data: []
            });
    }
}


//----------------------------Insert Into dishes--------------------------------------
module.exports.insertIntoDishes= async (req, res) => {
    
    let columns= Object.keys(req.body);
    let values= Object.values(req.body);
    console.log("received: " + columns+ "    "+ values);
    // let uniqueKey = uuid.uuidGenerator();
    // console.log("Generated key: ", uniqueKey);
    // // columns.push("restokey");
    // // values.push(uniqueKey);

    try{
        console.log("in Controller: InsertDishes()");
         let details= await model_Dishes.insertIntoDishes(columns, values);

        if(details.rowCount >= 0){
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Dish Inserted Successfully',
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


//----------------------------Delete From Dishes--------------------------------------
module.exports.deleteFromDishes= async (req, res) => {
    
    let idToBeDeleted= Object.values(req.body); 
    console.log("Requested id to be deleted: ", idToBeDeleted);

    try{
        console.log("in Controller: DeleteDishes()");
         let details= await model_Dishes.deleteFromDishes(idToBeDeleted);

        if(details.rowCount > 0){
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Dish Deleted Successfully',
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


//----------------------------Get Dish By Id--------------------------------------
module.exports.getDishById= async (req, res) => {
    
    let id= Object.values(req.body); 
    console.log("Requested id to be fetched: ", id);

    try{
        console.log("in Controller: DishById()");
         let details= await model_Dishes.getDishById(id);

        if(details.rowCount > 0){
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Dish By Id fetched Successfully',
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


