let model_Restaurants= require('../models/model_Restaurants');
let model_Dishes= require('../models/model_Dishes');
let uuid= require("../utils/uuidGenerator");


//-------------------Get Restaurants Data------------------------
module.exports.getRestaurants = async(req,res)=>{
    console.log("getRestaurantController called");
    try{
        let details= await model_Restaurants.getRestaurants();
        
        console.log("returned from getRestaurantController()");
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
        console.log("error in getRestaurantController: ",e);
        res.status(500).json(
            {
                status: 'Failure',
                statusCode: 500,
                message: `Something went wrong in fetching data! ${err}`,
                data: []
            });
    }
}


//----------------------------Insert Into Restaurants--------------------------------------
module.exports.insertIntoRestaurants= async (req, res) => {
    
    let columns= Object.keys(req.body);
    let values= Object.values(req.body);
    console.log("received: " + columns+ "    "+ values);

    let uniqueKey = uuid.uuidGenerator();
    console.log("Generated key: ", uniqueKey);
    columns.push("restokey");
    values.push(uniqueKey);

    try{
        console.log("in Controller: InsertRestaurants()");

        
        let details= await model_Restaurants.insertIntoRestaurants(columns, values);

        if(details.rowCount >= 0){
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Item Inserted Successfully',
                data: details.rows,
                key: uniqueKey
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


//----------------------------Delete From Restaurants--------------------------------------
module.exports.deleteFromRestaurants= async (req, res) => {
    
    let idTobeDeleted= Object.values(req.body); 
    console.log("Requested id to be deleted: ", idTobeDeleted);

    try{
        console.log("in Controller: DeleteRestaurants()");
         let details= await model_Restaurants.deleteFromRestaurants(idTobeDeleted);

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


//----------------------------Get Restaurants By Id--------------------------------------
module.exports.getRestaurantById= async (req, res) => {
    
    let id= Object.values(req.body); 
    console.log("Requested id to be fetched: ", id);

    

    try{
        console.log("in Controller: RestaurantById()");
        
        let dishesResult= await model_Dishes.getDishById(id, "restaurant_id");
        // let availableDishes= dishesResult.rows;
        // columns.push("availabledishes");
        // values.push(dishesResult.rows);
        console.log(` DISHES: `, dishesResult.rows);

        let details= await model_Restaurants.getRestaurantById(id);

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


