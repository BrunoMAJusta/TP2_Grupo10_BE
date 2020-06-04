
const mysql = require("mysql"); 
// const dbConfig = require("../../database/dbConfig.json");
// var connection = mysql.createConnection(dbConfig);
var connection = mysql.createConnection({host:process.env.HOST,user:process.env.USER,password:process.env.PASSWORD, database:process.env.DATABASE});


function getCategory(callback) {
    connection
    let sql = `SELECT category_id,description as category FROM tp2_category;`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data:rows
        })
    })
    connection
}

module.exports = {getCategory:getCategory}