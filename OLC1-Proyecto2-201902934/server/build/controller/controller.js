"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
class controller {
    hello(req, res) {
        res.send("Hola mundo");
    }
    personal(req, res) {
        res.json({ "Curso": "OLC1", "Proyecto": "2", "Nombre": "German José Paz Cordón", "Carnet": "201902934" });
    }
    test(req, res) {
        var parser = require('./analizador/grammar');
        var text = req.body.entrada;
        parser.parse(text);
    }
}
exports.controllers = new controller();
