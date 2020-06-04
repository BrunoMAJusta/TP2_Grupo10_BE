const orderFunctions = require("./orderFunctions")

//Fazer encomenda da EPI
function newOrder(req, result) {
    //Variaveis
    let userID = req.params.id
    let date = req.body.date
    let epis = req.body.epis

    orderFunctions.newOrder(userID, date, epis, (error, success) => {
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