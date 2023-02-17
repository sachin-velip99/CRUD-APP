"use strict"
const { BadRequestError } = require('../../errors')



module.exports.createItem = async (reqBody, models) => {
    let transaction = await models.sequelize.transaction();

    try {
        await validatebody(reqBody);

        let item = await models.item.findOne({
            where: {
                itemName: reqBody.itemName
            }
        })

        if(item){
            throw new BadRequestError("item already exists");
        }

        await models.item.create({
            itemName: reqBody.itemName,
            price: reqBody.price
        });

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