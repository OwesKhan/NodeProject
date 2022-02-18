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


//-----------------------------Catagories------------------------------------------------------
const controller_Catagories = require("../controllers/Controller_Catagories")

//Get from Orders
router.get("/getCatagories",controller_Catagories.getCatagories);

//Insert into Orders
router.post('/insertIntoCatagories', controller_Catagories.insertIntoCatagories);

// Fetching Orders Data
router.post('/deleteFromCatagories', controller_Catagories.deleteFromCatagories);

// //Fetching User By id
router.post('/getCatagoriesById', controller_Catagories.getCatagoriesById);



//-----------------------------Cart------------------------------------------------------
const controller_Cart = require("../controllers/Controller_Cart")

//Get from Orders
router.get("/getCart",controller_Cart.getCart);

//Insert into Orders
router.post('/insertIntoCart', controller_Cart.insertIntoCart);

// Fetching Orders Data
router.post('/deleteFromCart', controller_Cart.deleteFromCart);

// //Fetching User By id
router.post('/getCartById', controller_Cart.getCartById);


// //-----------------------------Login------------------------------------------------------
// const controller_Login = require("../controllers/Controller_Login")

// //Get from Orders
// router.get("/getLogin",controller_Login.getLogin);

// //Insert into Orders
// router.post('/insertIntoLogin', controller_Login.insertIntoLogin);

// // Fetching Orders Data
// router.post('/deleteFromLogin', controller_Login.deleteFromLogin);

// // //Fetching User By id
// router.post('/getLoginById', controller_Login.getLoginById);



//-------------------------JWTAuthentication APIs--------------------
const JWTAuthController = require('../controllers/controller_Auth');

router.post('/signUp', JWTAuthController.signUp);
router.post('/signIn', JWTAuthController.signIn);
router.post('/signOut', JWTAuthController.signOut);
// router.post('/autoSignIn', JWTAuthController.autoSignIn);
router.post('/refreshTokens', JWTAuthController.refreshAllTokens);

// router.post('/forgetPasswordGetLink', JWTAuthController.forgetPassword);
// router.post('/setNewPassword', JWTAuthController.setNewPassword)
// router.post('/resetPassword', JWTAuthController.resetPassword);
// router.post('/setNotificationToken', JWTAuthController.setNotificationToken);

module.exports= router;