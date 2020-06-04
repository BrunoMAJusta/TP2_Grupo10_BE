
const categoryFunctions = require("./categoryFunctions")


function getCategory(req, result) {
    categoryFunctions.getCategory((error, success) => {
        if (error) {
            throw error;
            return;
        };
        result.json(success)
    })
}

module.exports = {
    getCategory:getCategory
}