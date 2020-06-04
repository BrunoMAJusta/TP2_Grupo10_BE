const mysql = require("mysql");
// const dbConfig = require("../../database/dbConfig.json");
// var connection = mysql.createConnection(dbConfig);
var connection = mysql.createConnection({host:process.env.HOST,user:process.env.USER,password:process.env.PASSWORD, database:process.env.DATABASE});



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
            epiOrder(lastId, epis)
        }
    });
    
}

function epiOrder(order_id, epis) {
    for (let e = 0; e < epis.length; e++) {
        const sqlEpis = `INSERT INTO tp2_order_epi (order_id, epi_id) VALUES ( ? , ?)`
        connection.query(sqlEpis, [order_id,epis[e]], function (error, rows, results, fields) {
            if (!error) {
                console.log("Done!")
                connection
            } else(error)
        });
    }
}

module.exports = {
    newOrder: newOrder
}