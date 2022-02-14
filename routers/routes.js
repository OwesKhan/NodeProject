const router= require("express").Router();

//----------------------------------Controllers-----------------------------------
const controller_Restaurants = require("../controllers/controller_Restaurants")


router.get('/', async (req, res) => {
    console.log("Check OK");
    res.send("Check Ok");
});

//Insert into Restaurants
router.get('/insertInto_Restaurants', controller_Restaurants.insertIntoRestaurants);

// Fetching Restaurants Data
router.get('/get_RestaurantsData', controller_Restaurants.getRestaurantsData);

// //Fetching User By Key
// router.post('/get_RestaurantsDataById', controller_Restaurants.getRestaurantsDataByKey);

// //Update Restaurants Record
// router.post('/update_RestaurantsData', controller_Restaurants.update_RestaurantsDataByKey);


// //Delete Restaurant Data By Key
// router.post('/deleteRestaurantDataById', controller_Restaurants.deleteRestaurantsDataByKey);
module.exports= router;