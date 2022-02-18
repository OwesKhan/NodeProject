let model_Login= require('../models/model_Login');
let uuid= require("../utils/uuidGenerator");


//-------------------Get Login Data------------------------
module.exports.getLogin = async(req,res)=>{
    console.log("getLoginController called");
    try{
        let details= await model_Login.getLogin();
        console.log("returned from getLoginController()");
        if(details.rowCount>=0)
        {
             res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Users Fetched Successfully!!!',
                data: details.rows
            });
        }
        else{
            res.status(500).json({
                status: 'success',
                statusCode: 200,
                message: 'users could not be fetched Successfully!!!',
                data: details.rows
            });
        }
    }
    catch(e){
        console.log("error in getLoginController: ",e);
        res.status(500).json(
            {
                status: 'Failure',
                statusCode: 500,
                message: `Something went wrong in fetching users! ${err}`,
                data: []
            });
    }
}


//----------------------------Insert Into Login (Sign-up)--------------------------------------
module.exports.insertIntoLogin= async (req, res) => {
    
    const {username, password} = req.body;
    console.log("received: " + username+ "    "+ password);
    // let uniqueKey = uuid.uuidGenerator();
    // console.log("Generated key: ", uniqueKey);
    // // columns.push("restokey");
    // // values.push(uniqueKey);

    if(!password || !username){
        res.send("Error: Bad Request! Fields can't be empty!");
    }

    try{
        console.log("in Controller: InsertLogin()");
         let details= await model_Login.insertIntoLogin(columns, values);

        if(details.rowCount >= 0){
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'User Inserted Successfully',
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


//----------------------------Delete From Login--------------------------------------
module.exports.deleteFromLogin= async (req, res) => {
    
    let idToBeDeleted= Object.values(req.body); 
    console.log("Requested id to be deleted: ", idToBeDeleted);

    try{
        console.log("in Controller: DeleteLogin()");
         let details= await model_Login.deleteFromLogin(idToBeDeleted);

        if(details.rowCount > 0){
            return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'User Deleted Successfully',
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


//----------------------------Get User By Id--------------------------------------
module.exports.getLoginById= async (req, res) => {
    
    let id= Object.values(req.body); 
    console.log("Requested id to be fetched: ", id);

    try{
        console.log("in Controller: DishById()");
         let details= await model_Login.getLoginById(id);

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


