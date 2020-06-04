const Router = require("express").Router;
var router = Router();
const middleware = require("../middleware.js"); 

const epiController = require("../controllers/epi/epiControllers");

router.post('/epis', middleware.checkToken, epiController.addEpi)

router.get('/epis', epiController.getEpis)
router.get('/epis/:id',middleware.checkToken, epiController.getEpi)

module.exports = router