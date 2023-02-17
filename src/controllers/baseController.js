"use strict";

const models = require("../../models");
const {
  BadRequestError,
  NotAuthorizedError,
  ResourceNotFoundError,
  InternalError,
  NotAuthenticatedError,
} = require("../errors");

class BaseController {
  constructor(req, res) {
    this.expressRequest = req;
    this.reqBody = req.body;
    this.params = req.params;
    this.query = req.query;
    this.headers = req.headers;
    this.response = res;
    this.models = models;
    this.file = req.file;
    this.files = req.files;
  }

  respond(payload, status = 200, headers = null) {
    this.response.status(status).send(payload);
  }

  respondWithError(err) {
    if (err instanceof ResourceNotFoundError) {
      this.respond({ type: "error", message: err.message }, 404);
    } else if (err instanceof BadRequestError) {
      this.respond({ type: "error", message: err.message }, 400);
    } else if (err instanceof NotAuthorizedError) {
      this.respond({ type: "error", message: err.message }, 403);
    } else if (err instanceof InternalError) {
      this.respond({ type: "error", message: err.data.error }, 500);
    } else if (err instanceof NotAuthenticatedError) {
      this.respond({ type: "error", message: err.message }, 401);
    } else {
      this.respond({ type: "error", message: err.message }, 500);
    }
  }

  respondWithSuccess(payload, headers = null, data = null) {
    if (headers) {
      this.respond({ type: "success", message: payload }, 200, headers);
    } else if (data) {
      this.respond({ type: "success", message: payload, data: data }, 200);
    } else {
      this.respond({ type: "success", message: payload }, 200);
    }
  }

}

module.exports = {
  BaseController: BaseController,
};
