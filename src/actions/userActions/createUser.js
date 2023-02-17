"use strict"
const { BadRequestError } = require('../../errors')
const bcrypt = require('bcrypt');


module.exports.createUser = async (reqBody, models) => {
    let transaction = await models.sequelize.transaction();
    let password = reqBody.password

    try {
        await validatebody(reqBody);

        let user = await models.User.findOne({
            where: {
                userName: reqBody.userName
            }
        })

        if(user){
            throw new BadRequestError("user already exists");
        }

        const hashpass = await bcrypt.hash(password,10)

        await models.User.create({
            userName: reqBody.userName,
            password: hashpass
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
    if(!reqBody.userName){
        throw new BadRequestError("username is mandatory");
    }
    if(!reqBody.password){
        throw new BadRequestError("password is mandatory");
    }
};