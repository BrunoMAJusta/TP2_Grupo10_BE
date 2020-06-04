const mysql = require("mysql"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../config.json")
const dbConfig = require("../database/dbConfig.json");
var connection = mysql.createConnection(dbConfig);

function login(email, password, callback) {
    connection
    const sql2 = `SELECT user_id, name, email, password FROM tp2_user WHERE email = ?;`
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



module.exports = {
    login: login,
    logout: logout,
}