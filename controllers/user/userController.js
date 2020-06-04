const bcrypt = require('bcrypt');
const userFunctions = require("./userFunctions")

class LoginValidation {
    login(req, result) {
        let email = req.body.email;
        let password = req.body.password;
        userFunctions.login(email, password, (error, success) => {
            if (error) {
                result.json(error)
            }
            result.json(success)
        })
    }
    index(req, res) {
        res.json({
            success: true,
            message: 'Index page',
        });
    }
}


function logout(req, result) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    console.log(token)
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    userFunctions.logout(token, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}

//Register User
function registerUser(req, result) {
    //Variaveis
    let name = req.body.name
    let email = req.body.email
    let adress = req.body.adress
    let zipcode = req.body.zipcode
    let number = req.body.number

    if (req.body.password === req.body.password2) {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            userFunctions.register(name, email, hash, number, adress, zipcode, (error, success) => {
                if (error) {
                    throw error;
                    return;
                }
                result.json(success)
            })
        })
    } else {
        console.log("Passwords nao coincidem!")
    }
}

function ordersByUserId(req, result) {
    let id = req.params.id
    userFunctions.ordersByUserId(id, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}


module.exports = {
    logout: logout,
    LoginValidation: LoginValidation,
    registerUser:registerUser,
    ordersByUserId: ordersByUserId
}



