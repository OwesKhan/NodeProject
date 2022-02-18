let model_Catagories= require('../models/model_Catagories');
let model_Dishes= require('../models/model_Dishes');
let uuid= require("../utils/uuidGenerator");


//-------------------Get Catagories Data------------------------
module.exports.getCatagories = async(req,res)=>{
    console.log("getCatagoriesController called");
    try{
        let details= await model_Catagories.getCatagories();
        
        console.log("returned from getCatagoriesController()");
        if(details.rowCount>=0)
        {
             res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Item Fetched Successfully!!!',
                data: details.rows
            });
        }
        else{
            res.status(500).json({
                status: 'success',
                statusCode: 200,
                message: 'Item could not be fetched Successfully!!!',
                data: []
            });
        }
    }
    catch(e){
        console.log("error in getCatagoriesController: ",e);
        res.status(500).json(
            {
                status: 'Failure',
                statusCode: 500,
                message: `Something went wrong in fetching data! ${e}`,
                data: []
            });
    }
}


//----------------------------Insert Into Catagories--------------------------------------
module.exports.insertIntoCatagories= async (req, res) => {
    
    let columns= Object.keys(req.body);
    let values= Object.values(req.body);
    console.log("received: " + columns+ "    "+ values);

    // let uniqueKey = uuid.uuidGenerator();
    // console.log("Generated key: ", uniqueKey);
    // columns.push("restokey");
    // values.push(uniqueKey);

    try{
        console.log("in Controller: InsertCatagories()");

        
        let details= await model_Catagories.insertIntoCatagories(columns, values);

        if(details.rowCount >= 0){
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Item Inserted Successfully',
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


//----------------------------Delete From Catagories--------------------------------------
module.exports.deleteFromCatagories= async (req, res) => {
    
    let idTobeDeleted= Object.values(req.body); 
    console.log("Requested id to be deleted: ", idTobeDeleted);

    try{
        console.log("in Controller: DeleteCatagories()");
         let details= await model_Catagories.deleteFromCatagories(idTobeDeleted);

        if(details.rowCount > 0){
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Item Deleted Successfully',
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


//----------------------------Get Catagories By Id--------------------------------------
module.exports.getCatagoriesById= async (req, res) => {
    
    let id= Object.values(req.body); 
    console.log("Requested id to be fetched: ", id);

    

    try{
        console.log("in Controller: CatagoriesById()");
        
        let dishesResult= await model_Dishes.getDishById(id, "dish_catagory");
        // let availableDishes= dishesResult.rows;
        // columns.push("availabledishes");
        // values.push(dishesResult.rows);
        console.log(` DISHES: `, dishesResult.rows);

        let details= await model_Catagories.getCatagoriesById(id);

        if(details.rowCount > 0){
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Item By Id fetched Successfully',
                data: details.rows,
                associatedDishes: dishesResult.rows
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


