const router= require("express").Router();

//----------------------------------Controllers-----------------------------------
const controller_Restaurants = require("../controllers/controller_Restaurants")


// router.get('/', async (req, res) => {
//     console.log("Check OK");
//     res.send("Check Ok");
// });

router.get("/getRestaurantsData",controller_Restaurants.getRestaurants);

//Insert into Restaurants
router.post('/insertIntoRestaurants', controller_Restaurants.insertIntoRestaurants);

// Fetching Restaurants Data
router.post('/deleteFromRestaurants', controller_Restaurants.deleteFromRestaurants);

// //Fetching User By Key
router.post('/getRestaurantById', controller_Restaurants.getRestaurantById);

// //Update Restaurants Record
// router.post('/update_RestaurantsData', controller_Restaurants.update_RestaurantsDataByKey);



//-----------------------------Orders------------------------------------------------------
const controller_Orders = require("../controllers/Controller_Orders")

//Get from Orders
router.get("/getOrders",controller_Orders.getOrders);

//Insert into Orders
router.post('/insertIntoOrders', controller_Orders.insertIntoOrders);

// Fetching Orders Data
router.post('/deleteFromOrders', controller_Orders.deleteFromOrders);

// //Fetching User By id
router.post('/getOrdersById', controller_Orders.getOrdersById);



//-----------------------------Dishes------------------------------------------------------
const controller_Dishes = require("../controllers/Controller_Dishes")

//Get from Orders
router.get("/getDishes",controller_Dishes.getDishes);

//Insert into Orders
router.post('/insertIntoDishes', controller_Dishes.insertIntoDishes);

// Fetching Orders Data
router.post('/deleteFromDishes', controller_Dishes.deleteFromDishes);

// //Fetching User By id
router.post('/getDishesById', controller_Dishes.getDishById);


module.exports= router;