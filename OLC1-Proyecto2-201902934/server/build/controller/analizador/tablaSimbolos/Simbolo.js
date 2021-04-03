"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Simbolo {
    constructor(tipo, id, value) {
        this.tipo = tipo;
        this.id = id;
        if (value) {
            this.value = value;
        }
        else {
            this.value = null;
        }
    }
    getID() {
        return this.id;
    }
    setID(id) {
        this.id = id;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
}
exports.default = Simbolo;
