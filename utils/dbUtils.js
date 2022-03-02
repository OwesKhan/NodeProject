const { Pool } = require('pg');
const config = require('../db/dbConfig');

const pgconfig =
{
    user: config.user,
    database: config.database,
    password: config.password,
    host: config.host,
    port: 5432,
    ssl: config.ssl,
    idleTimeoutMillis: config.idleTimeoutMillis
}

const pool = new Pool(pgconfig);

console.log(`DB Connection Settings: ${JSON.stringify(pgconfig)}`);

pool.on('error', function (err, client) {
    console.log(`idle client error, ${err.message} | ${err.stack}`);
});

//pool.query("LISTEN testingEvent");
// Listen notification
//pool.on('notification', async (data)=>{
   // const payload = JSON.parse(data.payload);
   // console.log("Row added!", payload);
//});
/* 
 * Single Query to Postgres
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
module.exports.sqlToDB = async (sql, data) => {
    console.log(`sqlToDB() sql: ${sql} | data: ${data}`);
    try {
        let result = await pool.query(sql, data);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

/*
 * Retrieve a SQL client with transaction from connection pool. If the client is valid, either
 * COMMMIT or ROALLBACK needs to be called at the end before releasing the connection back to pool.
 */
module.exports.getTransaction = async () => {
    console.log(`getTransaction()`);
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        return client;
    } catch (error) {
        throw new Error(error.message);
    }
}

/* 
 * Execute a sql statment with a single row of data
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
module.exports.sqlExecSingleRow = async (client, sql, data) => {
    console.log(`sqlExecSingleRow() sql: ${sql} | data: ${data}`);
    try {
        let result = await client.query(sql, data);
// <<<<<<< HEAD
// =======
        console.log(`sqlExecSingleRow(): ${result.command} | ${result.rowCount}`);
// >>>>>>> 849968ebc27a2c3e8ca13bfc24bbcccbaa68fb47
        return result
    } catch (error) {
        console.log(`sqlExecSingleRow() error: ${error.message} | sql: ${sql} | data: ${data}`);
        throw new Error(error.message);
    }
}

/*
 * Execute a sql statement with multiple rows of parameter data.
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
module.exports.sqlExecMultipleRows = async (client, sql, data) => {
    console.log(`inside sqlExecMultipleRows()`);
    let result = [];
    if (data.length !== 0) {
        for(let item of data) {
            try {
                logger.debug(`sqlExecMultipleRows() item: ${item}`);
                logger.debug(`sqlExecMultipleRows() sql: ${sql}`);
                let res = await client.query(sql, item);
                result.push(res.rows[0]);
            } catch (error) {
                logger.error(`sqlExecMultipleRows() error: ${error}`);
                throw new Error(error.message);
            }
        }
    } else {
        logger.error(`sqlExecMultipleRows(): No data available`);
        throw new Error('sqlExecMultipleRows(): No data available');
    }
    return result;
}

/*
 * Rollback transaction
 */
module.exports.rollback = async (client) => {
    if (typeof client !== 'undefined' && client) {
        try {
            logger.info(`sql transaction rollback`);
            await client.query('ROLLBACK');
        } catch (error) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    } else {
        console.log(`rollback() not excuted. client is not set`);
    }
}

/*
 * Commit transaction
 */
module.exports.commit = async (client) => {
    try {
        await client.query('COMMIT');
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }
}

//-------------------------------------------------------
// const pool = new Pool(pgconfig);
// pool.on('error', function (err, client) {
//     console.log(`idle client error, ${err.message} | ${err.stack}`);
// });


// module.exports.getTransaction = async () => {
//     console.log(`getTransaction()`);
//     const client = await pool.connect();
//     try {
//         await client.query('BEGIN');
//         return client;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// module.exports.sqlExecSingleRow = async (client, sql, data) => {
//         try {console.log("In ClientQuery");
//         let result = await client.query(sql, data);
//         return result
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }
// /*
//  * Rollback transaction
//  */
// module.exports.rollback = async (client) => {
//     if (typeof client !== 'undefined' && client) {
//         try {
//             console.log(`sql transaction rollback`);
//             await client.query('ROLLBACK');
//         } catch (error) {
//             throw new Error(error.message);
//         } finally {
//             client.release();
//         }
//     } else {
//         console.log(`rollback() not excuted. client is not set`);
//     }
// }
// /*
//  * Commit transaction
//  */
// module.exports.commit = async (client) => {
//     try {
//         await client.query('COMMIT');
//     } catch (error) {
//         throw new Error(error.message);
//     } finally {
//         client.release();
//     }
// }