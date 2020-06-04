const mysql = require("mysql");
const config = require("../config.json")
const dbConfig = require("../database/dbConfig.json");
var connection = mysql.createConnection(dbConfig);

function newOrder(userID, date, epis, callback) {
    connection
    const sql = `INSERT INTO tp2_order (user_id, date) VALUES (?, ?)`
    connection.query(sql, [userID, date], function (error, results) {
        if (error) {
            callback(error);
        } else {
            callback(null, {
                success: true,
                message: "Pedido de Encomenda Enviado"
            })
            let lastId = results.insertId
            epiOrder(lastId, epis, quantity)
        }
    });
}

function epiOrder(order_id, epis) {
    for (let e = 0; e < epis.length; e++) {
        const sqlDecor = `INSERT INTO tp2_order_epi (order_id, epi_id) VALUES ( ? , ?)`
        connection.query(sqlDecor, order_id, [epis[e], quantity], function (error, rows, results, fields) {
            if (!error) {
                console.log("Done!")
            } else(error)
        });
    }
}

module.exports = {
    newOrder: newOrder
}