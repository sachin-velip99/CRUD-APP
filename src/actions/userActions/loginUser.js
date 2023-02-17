"use strict"
const { BadRequestError } = require('../../errors')
const { createToken } = require('../../../tokens')
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());



module.exports.loginUser = async (reqBody, models, response) => {
    let transaction = await models.sequelize.transaction();
    let password = reqBody.password

    try {
        await validatebody(reqBody);

        let user = await models.User.findOne({
            where: {
                userName: reqBody.userName
            }
        })

        if(!user){
            throw new BadRequestError("user does not exists");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            throw new BadRequestError("password incorrect")
        }

        let userCred = {
            id: user.id,
            userName: user.userName
        }

        let accessToken = await createToken(userCred);

        let tokens = {
            accessToken: accessToken
        }


        await transaction.commit();
        return Promise.resolve(tokens);
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