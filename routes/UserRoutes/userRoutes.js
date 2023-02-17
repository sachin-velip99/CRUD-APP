"use strict";

const {
  userController: { UserController },
} = require("../../src/controllers/userController");

function UserRoutes(app, verifyToken) {
  app.post(
    "/v1/crudManagement/users/createUser",
    UserController.createUser
  );

  app.post(
    "/v1/crudManagement/users/login",
    UserController.loginUser
  );
  //app.post("/createUser", UserController.createUser);
}

module.exports.UserRoutes = UserRoutes;