const Router = require("express").Router;
var router = Router();

//___Import___
const userController = require("../controllers/userController");
const middleware = require("../middleware");

let validate = new userController.LoginValidation();

//___POST___
router.post('/login', validate.login)
router.post('/logout',userController.logout)

//___GET___
router.get('/', validate.index);

//___PUT___


//___DEL___


module.exports = router;