const epiFunctions = require("./epiFunctions")

//ADD NEW EPI
function addEpi(req, result){
        let name = req.body.name;
        let category_id = req.body.category_id;
        let img = req.body.img
        let price = req.body.price
    
        epiFunctions.addEpi(name, category_id, price, img ,(error, success) => {
            if (error) {
                console.log(error)
                throw error;
                return;
            }
            result.json(success)
    
        })
};
function getEpis(req, result) {
    epiFunctions.getEpis( (error, success) => {
        console.log(error)
        if (error) {
            
            throw error;
            return;
        };
        result.json(success)
    })
};
function getEpi(req, result) {
    let id = req.params.id
    epiFunctions.getEpi(id, (error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}

module.exports = {
    addEpi:addEpi,
    getEpis:getEpis,
    getEpi: getEpi,
}