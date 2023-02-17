"use strict"

const express = require("express")
const cors = require("cors")
require('dotenv').config();

const { verifyToken } = require("./tokens")

const app = express();
const port = process.env.PORT || 2000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

module.exports = app;

const {
    Routes: {
        UserRoutes: {
            UserRoutes
        },
        CrudRoutes: {
            CrudRoutes
        }
    }
} = require('./routes');


UserRoutes(app, verifyToken);
CrudRoutes(app, verifyToken);

app.listen(port, () => {
    console.log(
        `server running on port ${port} in ${process.env.NODE_ENV} environment`
    )
});
