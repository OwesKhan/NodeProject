// condition is optional parameter for special cases
const selectFromTable = (tableName, selectColumns, condition = null) => {
    let sqlQuery = "SELECT ";
    for (i = 0; i < selectColumns.length; i++) {
        sqlQuery += selectColumns[i];
        if (i != selectColumns.length - 1) {
            sqlQuery += ", ";
        }
        else {
            if (condition != null) {
                sqlQuery += condition;
                console.log("Condition exists");
            }
            console.log("Condition is null");
            sqlQuery += ' FROM ';
            // console.log(sqlQuery)
            sqlQuery += `${tableName}`;
        }
    }
    // console.log(sqlQuery)
    return sqlQuery;
}
////////////
const updateTable = (tableName, columns, conditionKey) => {
    // var query = ['UPDATE products'];
    // query.push('SET');
    // // Create another array storing each set command
    // // and assigning a number value for parameterized query
    // var set = [];
    // Object.keys(cols).forEach(function (key, i) {
    // set.push(key + ' = ($' + (i + 1) + ')'); 
    // });
    // query.push(set.join(', '));
    // // Add the WHERE statement to look up by id
    // query.push('WHERE pr_id = ' + id );
    // // Return a complete query string
    // return query.join(' ');
    // let sqlQuery = `UPDATE "${tableName}" SET `;
    let query = [`UPDATE "${tableName}"`];
    query.push('SET');
    let set = [];
    for (let i = 0; i < columns.length; i++) {
        set.push(columns[i] + '=($' + (i + 1) + ')');
        // sqlQuery += columns[i];
        // sqlQuery += "=";
        // sqlQuery += `"${values[i]}"`;
        // if(i!=columns.length-1){
        //     sqlQuery += ", ";
        // } else {
        //     sqlQuery += ` WHERE id=1`;
        // }
    }
    query.push(set.join(', '));
    let columnsCount = 1 + columns.length;
    query.push('WHERE ' + conditionKey + '=' + '$' + columnsCount);
    return query.join(' ');
}
/////////
const insertIntoTable = (tableName, columns) => {
    let sqlQuery = `INSERT INTO "${tableName}" (`;
    for (let i = 0; i < columns.length; i++) {
        sqlQuery += columns[i];
        if (i != columns.length - 1) {
            sqlQuery += ", ";
        } else {
            sqlQuery += ") VALUES ( ";
        }
    }
    for (let i = 0; i < columns.length; i++) {
        sqlQuery += "$";
        sqlQuery += `${i + 1}`;
        if (i != columns.length - 1) {
            sqlQuery += ", ";
        } else {
            sqlQuery += ") ";
        }
    }
    return sqlQuery;
}
module.exports = {
    selectFromTable,
    insertIntoTable,
    updateTable
}