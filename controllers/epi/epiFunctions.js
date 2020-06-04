// const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
// const config = require("../../config.json");
var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

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

function getEpis(id, callback) {
    connection
    let sql = `SELECT * FROM tp2_EPI`;
    connection.query(sql, function (error, rows, result) {
        if (error) callback(error);
        console.log(rows)
        callback(null, {
            success: true,
            data: rows
        });
    });
};


module.exports = {
    addEpi: addEpi,
    getEpis:getEpis,
}