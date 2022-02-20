const config= require('./db/dbConfig');
require('dotenv').config()
const express= require('express');
const bodyParser= require('body-parser');                        //Body-parser used to handle conversion to and from json;
const router= require('express').Router();
const routes= require('./routers/routes');
const PORT= process.env.PORT || 3000;

const app = express();

app.use(router);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/foodZone', routes);

app.listen(PORT, function(){
    console.log('listening on port: '+ 3000);
})
// router.get("/", async (req, res) => {
//     console.log("Check OK");
//     res.send("Check Ok");
// });
// const client=  require('./db/dbConfig');

// //module.exports.getRestaurantsData= ()=> {
// client.connect();
// app.get('/user', (req, res)=>{
//     console.log("inside user");
//     client.query(`select * from Login`, (err, result)=>{
//         if(!err) {
//             res.send(result.rows+ "");
//         }
//         else{res.send(err.message+ "ok")}
//     })
//     console.log("END");
//     // client.end();
// });
//return "data"
//}

