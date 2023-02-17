"use strict"

const { createUser } = require('./createUser')
const { loginUser } = require('./loginUser')

module.exports.userActions = {
    createUser: createUser,
    loginUser: loginUser,
};