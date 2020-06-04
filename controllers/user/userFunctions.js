const mysql = require("mysql"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../../config.json")
const dbConfig = require("../../database/dbConfig.json");
var connection = mysql.createConnection(dbConfig);

function login(email, password, callback) {
    connection
    const sql2 = `SELECT user_id, name, email, password, userType_id FROM tp2_user WHERE email = ?;`
    connection.query(sql2, [email], function (error, rows, results, fields) {
        if (!error) {
            console.log(rows)
            //Verify Password
            bcrypt.compare(password, rows[0].password, function (err, res) {
                if (err) {
                    callback("Password Incorreta")
                }
                //Create Token
                if (res) {
                    console.log("works")
                    let token = jwt.sign({
                            email: email,
                        },
                        config.secret, {
                            expiresIn: '24h' // expires in 24 hours
                        }
                    );
                    callback(null, {
                        success: true,
                        message: 'Sessão Iniciada',
                        user:{
                            id: rows[0].user_id ,
                            name: rows[0].name,
                            email: email,
                            type: rows[0].userType_id,
                            token: token,
                        }
                    })
                } else {
                    console.log("Dados Invalidos")

                }
            })
        } else {
            callback("Email Invalido")
        }
        connection
    });
}



function logout(token, callback) {
    connection
    let sql = `INSERT INTO tp2_blacklist(token) VALUES(?)`
    connection.query(sql, [token], function (err, result) {
        if (err) callback(err);
        callback(null, {
            sucess: true,
            message: "Sessão Terminada!"
        })
    });
    connection
}

function register(name, email, hash, number, adress, zipcode, callback) {
    connection
    //Insert user into DB
    const sql = `INSERT INTO tp2_user (name, email, password, adress, zipcode, number, userType_id) VALUES ( ? , ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [name, email, hash, adress, zipcode, number, 2], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Conta criada com sucesso!"
        })
    });
    connection
}


function ordersByUserId(id, callback) {
    connection
    let sql = `select tp2_order.order_id , tp2_order.date from tp2_order where tp2_order.user_id = ?;`;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data:rows
        })
    })
    connection
}

function episByOrderId(id, callback) {
    connection
    let sql = `SELECT tp2_EPI.name, tp2_order_epi.order_id FROM tp2_order_epi, tp2_EPI WHERE tp2_EPI.order_id = tp2_order_epi.order_id;`;
    connection.query(sql, [id], function (error, rows, result) {
        if (error) callback(error);
        console.log(rows);
        callback(null, {
            success: true,
            data:rows
        })
    })
    connection
}


module.exports = {
    login: login,
    logout: logout,
    register:register,
    ordersByUserId:ordersByUserId
}