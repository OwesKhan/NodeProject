const {Client, Pool}= require('pg');
const connectionString= `postgressql://postgres:root@localhost:5432/FoodZone`

const client= new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "FoodZone"
    // ConnectionString: connectionString
});

module.exports=client;