"use strict";

const {
  crudController: { CrudController },
} = require("../../src/controllers/crudController");

function CrudRoutes(app, verifyToken) {
  app.post(
    "/v1/crudManagement/items/createItem",
    CrudController.createItem
  );

  app.get(
    "/v1/crudManagement/items/:itemId/getItem",
    CrudController.getItem
  );

  app.patch(
    "/v1/crudManagement/items/:itemId/updateItem",
    CrudController.updateItem
  );

  app.delete(
    "/v1/crudManagement/items/:itemId/deleteItem",
    CrudController.deleteItem
  );

  //app.post("/createUser", CrudController.createUser);
}

module.exports.CrudRoutes = CrudRoutes;