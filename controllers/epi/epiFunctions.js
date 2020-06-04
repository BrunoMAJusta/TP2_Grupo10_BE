const mysql = require("mysql");
// const dbConfig = require("../../database/dbConfig.json");
// var connection = mysql.createConnection(dbConfig);
var connection = mysql.createConnection({host:process.env.host,user:process.env.user,password:process.env.password, database:process.env.database});




function addEpi(name, category_id, price, img, callback) {

    connection
    const sql = `INSERT INTO tp2_EPI (name, category_id, price, img) VALUES(?,?,?,?)`;
    connection.query(sql, [name, category_id, price, img], function (error, results, fields) {
        console.log(error)
        if (error) callback(error);

        callback(null, {
            success: true,
            message: "EPI Adicionado!"
        })
    });
    connection

};

function getEpis(callback) {
    connection
    let sql = `SELECT * FROM tp2_EPI`;
    connection.query(sql, function (error, rows, result) {
        console.log(error)
        if (error) callback(error);
        console.log(rows)
        callback(null, {
            success: true,
            data: rows
        });

    });
    connection

};

function getEpi(id, callback) {
    connection
    let sql = `SELECT * FROM tp2_EPI WHERE epi_id = ?`;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows)
        callback(null, {
            success: true,
            data: rows
        });
    });
    connection
};



module.exports = {
    addEpi: addEpi,
    getEpis: getEpis,
    getEpi: getEpi
}