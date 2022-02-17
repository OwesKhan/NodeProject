const { Pool } = require('pg');
const config = require('../db/dbConfig');

const pgconfig =
{
    user: process.env.USER || config.user,
    database: process.env.DATABASE || config.database,
    password: process.env.PASSWORD || config.password,
    host: process.env.HOST || config.host,
    port: process.env.port || 5432,
    // ssl: config.db.ssl
}

const pool = new Pool(pgconfig);
pool.on('error', function (err, client) {
    console.log(`idle client error, ${err.message} | ${err.stack}`);
});


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

module.exports.sqlExecSingleRow = async (client, sql, data) => {
        try {console.log("In ClientQuery");
        let result = await client.query(sql, data);
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}
/*
 * Rollback transaction
 */
module.exports.rollback = async (client) => {
    if (typeof client !== 'undefined' && client) {
        try {
            console.log(`sql transaction rollback`);
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