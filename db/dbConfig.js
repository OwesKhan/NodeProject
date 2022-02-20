const {Client, Pool}= require('pg');
require('dotenv').config()
// const connectionString= `postgressql://postgres:root@localhost:5432/FoodZone`

const client= new Client({
    // host: "localhost",
    // user: "postgres",
    // port: 5432,
    // password: "root",
    // database: "FoodZone"
    // ConnectionString: connectionString
    user: process.env.HEROKU_DB_USER,
    database: process.env.HEROKU_DB,
    password: process.env.HEROKU_DB_PASSWORD,
    host: process.env.HEROKU_DB_HOST,
    port: parseInt(process.env.HEROKU_DB_PORT),
    ssl: { rejectUnauthorized: false }, 
    max: 20
    // idleTimeoutMillis: 30000,
    // url: process.env.HEROKU_DB_URI,
});

module.exports=client;