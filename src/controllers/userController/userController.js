"use strict"
const { BaseController } = require('../baseController')
const { userActions } = require('../../actions/userActions')

class UserController extends BaseController {
    constructor(req, res) {
        super(req, res);
    }

    async createUser() {
        try{
        let payload = await userActions.createUser(this.reqBody, this.models)
        this.respondWithSuccess(payload);
        }
        catch(err){
            this.respondWithError(err);
        }
    }

    async loginUser(){
        try{
            let payload = await userActions.loginUser(this.reqBody, this.models, this.response)
            this.respondWithSuccess(payload);
        }
        catch(err){
            this.respondWithError(err);
        }
    }
}

module.exports.UserController = {
    UserController: UserController,
    createUser: async (req, res) => {
        return new UserController(req, res).createUser();
    },
    loginUser: async (req, res) => {
        return new UserController(req, res).loginUser();
    },
}