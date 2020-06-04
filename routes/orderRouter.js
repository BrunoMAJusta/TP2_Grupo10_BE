const Router = require("express").Router;
var router = Router();

//___Import___
const orderController = require("../controllers/order/orderController");
const middleware = require("../middleware");


//___POST___
router.post('/orders', orderController.newOrder)

//___GET___

//___PUT___


//___DEL___


module.exports = router;