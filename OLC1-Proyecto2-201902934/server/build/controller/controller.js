"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
class controller {
    interpretar(req, res) {
        var parser = require('./analizador/grammar');
        var text = req.body.entrada;
        var listaP = parser.parse(text);
        var tmp = '';
        for (let i of listaP) {
            tmp = tmp + i + "\n";
        }
        res.json({ valor: tmp });
        //res.send(tmp)
    }
    personal(req, res) {
        res.json({ "Curso": "OLC1", "Proyecto": "2", "Nombre": "German José Paz Cordón", "Carnet": "201902934" });
    }
}
exports.controllers = new controller();
