"use strict"
const { BadRequestError, ResourceNotFoundError } = require('../../errors')



module.exports.updateItem = async (reqBody, models, params) => {
    let transaction = await models.sequelize.transaction();

    try {
        await validatebody(reqBody);

        let item = await models.item.findOne({
            where: {
                id: params.itemId
            }
        })

        if(!item){
            throw new ResourceNotFoundError("item");
        }

        await models.item.update({
            itemName: reqBody.itemName,
            price: reqBody.price,
        },{
            where: {
                id: params.itemId
            }
        },{
            transaction: transaction
        })

        await transaction.commit();
        return Promise.resolve("success");
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
    if(!reqBody.price){
        throw new BadRequestError("price is mandatory");
    }
};