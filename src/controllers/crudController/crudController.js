"use strict"
const { BaseController } = require('../baseController')
const { crudActions } = require('../../actions/crudActions')

class CrudController extends BaseController {
    constructor(req, res) {
        super(req, res);
    }

    async createItem() {
        try{
        let payload = await crudActions.createItem(this.reqBody, this.models)
        this.respondWithSuccess(payload);
        }
        catch(err){
            this.respondWithError(err);
        }
    }

    async getItem(){
        try{
            let payload = await crudActions.getItem(this.models, this.params)
            this.respondWithSuccess(payload);
        }
        catch(err){
            this.respondWithError(err);
        }
    }

    async updateItem(){
        try{
            let payload = await crudActions.updateItem(this.reqBody, this.models, this.params)
            this.respondWithSuccess(payload);
        }
        catch(err){
            this.respondWithError(err);
        }
    }

    async deleteItem(){
        try{
            let payload = await crudActions.deleteItem(this.models, this.params)
            this.respondWithSuccess(payload);
        }
        catch(err){
            this.respondWithError(err);
        }
    }
}

module.exports.CrudController = {
    CrudController: CrudController,
    createItem: async (req, res) => {
        return new CrudController(req, res).createItem();
    },
    getItem: async (req, res) => {
        return new CrudController(req, res).getItem();
    },
    updateItem: async (req, res) => {
        return new CrudController(req, res).updateItem();
    },
    deleteItem: async (req, res) => {
        return new CrudController(req, res).deleteItem();
    },
}