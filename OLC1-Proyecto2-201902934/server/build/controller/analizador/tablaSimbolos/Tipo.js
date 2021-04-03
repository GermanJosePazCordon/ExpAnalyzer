"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipos = void 0;
class Tipo {
    constructor(tipos) {
        this.tipos = tipos;
    }
    equals(obj) {
        return this.tipos == obj.tipos;
    }
    getTipo() {
        return this.tipos;
    }
    setTipo(tipo) {
        this.tipos = tipo;
    }
}
exports.default = Tipo;
var tipos;
(function (tipos) {
    tipos[tipos["ENTERO"] = 0] = "ENTERO";
    tipos[tipos["DECIMAL"] = 1] = "DECIMAL";
    tipos[tipos["CARACTER"] = 2] = "CARACTER";
    tipos[tipos["BOOLEAN"] = 3] = "BOOLEAN";
    tipos[tipos["CADENA"] = 4] = "CADENA";
})(tipos = exports.tipos || (exports.tipos = {}));
