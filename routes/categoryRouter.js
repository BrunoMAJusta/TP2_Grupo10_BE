const Router = require("express").Router;
var router = Router();

const categoryController = require("../controllers/category/categoryController");


router.get('/categories', categoryController.getCategory)


module.exports = router;