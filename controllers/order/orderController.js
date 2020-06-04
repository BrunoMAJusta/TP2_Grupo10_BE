const orderFuntions = require("./orderFuntions")

//Fazer encomenda da EPI
function newOrder(req, result) {
    //Variaveis
    let userID = req.body.userID
    let date = req.body.date
    let epis = req.body.epis

    orderFuntions.newOrder(userID, date, epis, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}

module.exports = {
    newOrder: newOrder,
}