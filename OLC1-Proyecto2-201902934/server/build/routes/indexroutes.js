"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller/controller");
class indexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.control();
    }
    control() {
        this.router.get('/', controller_1.controllers.hello);
        this.router.get('/personal', controller_1.controllers.personal);
        this.router.get('/test', controller_1.controllers.test);
        this.router.get("**", (req, res) => {
            res.send("Aqui no hay nada 🥺");
        });
    }
}
const indexroutes = new indexRoutes();
exports.default = indexroutes.router;
