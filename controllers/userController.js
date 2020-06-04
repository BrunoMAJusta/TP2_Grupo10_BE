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

module.exports = {
    logout: logout,
    LoginValidation: LoginValidation,
}