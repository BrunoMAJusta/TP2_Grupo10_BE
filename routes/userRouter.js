const Router = require("express").Router;
var router = Router();

//___Import___
const userController = require("../controllers/user/userController");
const middleware = require("../middleware");

let validate = new userController.LoginValidation();

//___POST___
router.post('/login', validate.login)
router.post('/logout',userController.logout)
router.post('/users',userController.registerUser)


//___GET___
router.get('/', validate.index);
router.get('/users/:id/orders',middleware.checkToken,userController.ordersByUserId)


//___PUT___


//___DEL___


module.exports = router;