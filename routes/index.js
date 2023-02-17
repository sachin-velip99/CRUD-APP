"use strict"

const { UserRoutes } = require('./UserRoutes')
const { CrudRoutes } = require('./CrudRoutes')

module.exports.Routes = {
    UserRoutes: UserRoutes,
    CrudRoutes: CrudRoutes,
}