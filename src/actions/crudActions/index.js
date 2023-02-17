"use strict"

const { createItem } = require('./createItem')
const { getItem } = require('./getItem')
const { updateItem } = require('./updateItem')
const { deleteItem } = require('./deleteItem')

module.exports.crudActions = {
    createItem: createItem,
    getItem: getItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
};