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
        this.router.post('/run', controller_1.controllers.interpretar);
        this.router.get('/personal', controller_1.controllers.personal);
    }
}
const indexroutes = new indexRoutes();
exports.default = indexroutes.router;
