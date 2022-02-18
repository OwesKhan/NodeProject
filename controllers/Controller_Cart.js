let model_Cart= require('../models/model_Cart');
let model_Dishes= require('../models/model_Dishes');
let uuid= require("../utils/uuidGenerator");


//-------------------Get Cart Data------------------------
module.exports.getCart = async(req,res)=>{
    console.log("getCartController called");
    try{
        let details= await model_Cart.getCart();
        
        console.log("returned from getCartController()");
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
        console.log("error in getCartController: ",e);
        res.status(500).json(
            {
                status: 'Failure',
                statusCode: 500,
                message: `Something went wrong in fetching data! ${e}`,
                data: []
            });
    }
}


//----------------------------Insert Into Cart--------------------------------------
module.exports.insertIntoCart= async (req, res) => {
    
    let columns= Object.keys(req.body);
    let values= Object.values(req.body);
    // console.log("received: " + columns+ "    "+ values);

    // let uniqueKey = uuid.uuidGenerator();
    // console.log("Generated key: ", uniqueKey);
    // columns.push("restokey");
    // values.push(uniqueKey);


    const authHeader = await req.headers['authorization'];
    const bearerToken = authHeader.split(" ")[1];;
    console.log("bearerToken:-", bearerToken);
    // console.log(authHeader);

    //Required token for user identification.
    // let{dishName, price, dishId, quantity }= req.body;
    // console.log("RECEIVED: ", dishName, price, dishId, quantity);

    try{
        console.log("in Controller: InsertCart()");
        
        
        let details= await model_Cart.insertIntoCart(columns, values, bearerToken);

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


//----------------------------Delete From Cart--------------------------------------
module.exports.deleteFromCart= async (req, res) => {
    
    let idTobeDeleted= Object.values(req.body); 
    console.log("Requested id to be deleted: ", idTobeDeleted);

    try{
        console.log("in Controller: DeleteCart()");
         let details= await model_Cart.deleteFromCart(idTobeDeleted);

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


//----------------------------Get Cart By Id--------------------------------------
module.exports.getCartById= async (req, res) => {
    
    let id= Object.values(req.body); 
    console.log("Requested id to be fetched: ", id);

    

    try{
        console.log("in Controller: CartById()");
        
        let dishesResult= await model_Dishes.getDishById(id, "dish_catagory");
        // let availableDishes= dishesResult.rows;
        // columns.push("availabledishes");
        // values.push(dishesResult.rows);
        console.log(` DISHES: `, dishesResult.rows);

        let details= await model_Cart.getCartById(id);

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


