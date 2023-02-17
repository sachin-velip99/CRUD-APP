"use strict"
const { BadRequestError, ResourceNotFoundError } = require('../../errors')



module.exports.getItem = async (models, params) => {
    let transaction = await models.sequelize.transaction();

    try {
        //await validatebody(reqBody);

        let item = await models.item.findOne({
            where: {
                id: params.itemId
            }
        })

        if(!item){
            throw new ResourceNotFoundError("item");
        }

        let message = {
            item: item.itemName,
            price: item.price
        }

        await transaction.commit();
        return Promise.resolve(message);
    }
    catch (err) {
        await transaction.rollback();
        if (err instanceof models.Sequelize.ValidationError) {
            throw new BadRequestError(err);
        }
        throw err;
    }
}

const validatebody = async(reqBody) => {

    if(!reqBody){
        throw new BadRequestError("reqBody is mandatory");
    }
    if(!reqBody.itemName){
        throw new BadRequestError("itemName is mandatory");
    }
};