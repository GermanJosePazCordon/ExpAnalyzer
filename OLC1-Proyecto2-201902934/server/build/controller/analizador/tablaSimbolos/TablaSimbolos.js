"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tipo_1 = __importStar(require("./Tipo"));
class TablaSimbolos {
    //private func : Array<Func>;
    constructor(last) {
        this.last = last;
        this.tabla = new Map();
        this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO); //tipos.ENTERO es el valor por defecto
    }
    setVariable(simbolo) {
        for (var i = this; i != null; i = i.getLast()) {
            var found = (i.getTable().get(simbolo.getID()));
            if (found != null) {
                return `${simbolo.getID()} ya existe.`;
            }
            break;
        }
        this.tabla.set(simbolo.getID(), simbolo); //Se agrega la variable
        return `${simbolo.getID()} creada.`;
    }
    getVariable(id) {
        for (var i = this; i != null; i = i.getLast()) {
            var found = (i.getTable().get(id));
            if (found != null) {
                return found;
            }
        }
        return null;
    }
    getTable() {
        return this.tabla;
    }
    setTable(tabla) {
        this.tabla = tabla;
    }
    getLast() {
        return this.last;
    }
    setLast(last) {
        this.last = last;
    }
}
exports.default = TablaSimbolos;
