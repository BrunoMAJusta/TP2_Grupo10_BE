const jwt = require('jsonwebtoken');
const config = require("./config.json");
// const dbConfig = require("./database/dbConfig.json");
const mysql = require("mysql"); 
// var connection = mysql.createConnection(dbConfig);
var connection = mysql.createConnection({host:process.env.HOST,user:process.env.USER,password:process.env.PASSWORD, database:process.env.DATABASE});



let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  console.log(token)
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }


  const sql = `SELECT token FROM tp2_blacklist WHERE token = ?`
  connection;
  connection.query(sql, [token], function (error, rows, fields) {
    if (rows.length !== 0) {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    } else if(rows.length === 0){
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  })
  connection
}

module.exports = {
  checkToken: checkToken
}