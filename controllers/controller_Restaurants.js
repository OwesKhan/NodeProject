let model_Restaurants= require('../models/model_Restaurants');
let uuid= require("../utils/uuidGenerator");

module.exports.get = async(req,res)=>{
    console.log("get c called");
    try{
        await model_Restaurants.get();return;
    }
    catch(e){
        console.log("error : ",e);
        return;
    }
}

module.exports.insertIntoRestaurants= async (req, res) => {
    
    // let columns= Object.keys(req.body);
    // let values= Object.keys(req.body);

    // let uniqueKey = uuid.uuidGenerator();
    // columns.push("restaurant_id");
    // values.push(uniqueKey);
    let columns= "";
    let values= "";

    try{
        console.log("in controller");
         let details= await model_Restaurants.insertIntoRestaurants(columns, values);
         console.log("details: "+details);
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
                message: 'Could not Inserted!',
                data: []
            });
    }
}

module.exports.getRestaurantsData= async(req, res)=>{
    // let input= req.body;
    let data= await model_Restaurants.getRestaurantsData();
    res.send(data);
}

