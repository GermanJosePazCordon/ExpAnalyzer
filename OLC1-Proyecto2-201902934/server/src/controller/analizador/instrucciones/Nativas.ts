import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Primitivo from '../expression/Primitiva';
import Variable from '../expression/Variable';
import { nodoAST } from '../abstract/NodoAST';

export default class Nativas extends Instruccion {

    private operador: OperadorNativas;
    private express: Instruccion;

    constructor(line: Number, column: Number, operador: OperadorNativas, express: Instruccion) {
        super(new Tipo(tipos.CADENA), line, column);
        this.operador = operador;
        this.express = express;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        var valor = null, vector = null, lista = null;
        valor = this.express.interpretar(tree, table);
        if (valor instanceof Excepcion) return valor;
        if (null != this.operador) switch (this.operador) {
            case OperadorNativas.TOLOWER:
                if (valor.tipo.getTipo() == tipos.CADENA) {
                    return new Primitivo(valor.tipo, valor.value.toLowerCase(), this.line, this.column);
                } else {
                    return new Excepcion("Semántico", "Tipo de expresion invalido para toLower", this.line, this.column);
                }
                break;
            case OperadorNativas.TOUPPER:
                if (valor.tipo.getTipo() == tipos.CADENA) {
                    return new Primitivo(valor.tipo, valor.value.toUpperCase(), this.line, this.column);
                } else {
                    return new Excepcion("Semántico", "Tipo de expresion invalido para toUpper", this.line, this.column);
                }
                break;
            case OperadorNativas.LENGTH:
                if (valor.tipo.getTipo() == tipos.CADENA) {
                    return new Primitivo(new Tipo(tipos.ENTERO), valor.value.length, this.line, this.column);
                } else {
                    if (this.express instanceof Variable) {
                        vector = table.getVariable(this.express.getID());
                        if (vector) {
                            var t = vector.getTipoVec();
                            if (t?.getTipo() == tipos.VECTOR) {
                                return new Primitivo(new Tipo(tipos.ENTERO), vector.getValue().length, this.line, this.column);
                            } else if (t?.getTipo() == tipos.LISTA) {
                                return new Primitivo(new Tipo(tipos.ENTERO), vector.getValue().length, this.line, this.column);
                            } else {
                                return new Excepcion("Semántico", "Tipo de valor invalido para length", this.line, this.column);
                            }
                        } else {
                            return new Excepcion("Semántico", "Estructura no existente", this.line, this.column);
                        }
                    } else {
                        return new Excepcion("Semántico", "Tipo de valor invalido para length", this.line, this.column);
                    }
                }
                break;
            case OperadorNativas.TRUNCATE:
                if (valor.tipo.getTipo() == tipos.ENTERO) {
                    return new Primitivo(new Tipo(tipos.ENTERO), Math.trunc(valor.value), this.line, this.column);
                } else if (valor.tipo.getTipo() == tipos.DECIMAL) {
                    return new Primitivo(new Tipo(tipos.ENTERO), Math.trunc(valor.value), this.line, this.column);
                } else {
                    return new Excepcion("Semántico", "Tipo de valor invalido para truncate", this.line, this.column);
                }
                break;
            case OperadorNativas.ROUND:
                if (valor.tipo.getTipo() == tipos.ENTERO) {
                    return new Primitivo(new Tipo(tipos.ENTERO), Math.round(valor.value), this.line, this.column);
                } else if (valor.tipo.getTipo() == tipos.DECIMAL) {
                    return new Primitivo(new Tipo(tipos.ENTERO), Math.round(valor.value), this.line, this.column);
                } else {
                    return new Excepcion("Semántico", "Tipo de valor invalido para truncate", this.line, this.column);
                }
                break;
            case OperadorNativas.TYPEOF:
                if (this.express instanceof Variable) {
                    vector = table.getVariable(this.express.getID());
                    if (vector) {
                        var t = vector.getTipoVec();
                        if (t?.getTipo() == tipos.VECTOR) {
                            return new Primitivo(new Tipo(tipos.CADENA), "vector", this.line, this.column);
                        } else if (t?.getTipo() == tipos.LISTA) {
                            return new Primitivo(new Tipo(tipos.CADENA), "lista", this.line, this.column);
                        }
                    }
                }
                if (valor.tipo.getTipo() == tipos.ENTERO) {
                    return new Primitivo(new Tipo(tipos.CADENA), "int", this.line, this.column);
                } else if (valor.tipo.getTipo() == tipos.DECIMAL) {
                    return new Primitivo(new Tipo(tipos.CADENA), "double", this.line, this.column);
                } else if (valor.tipo.getTipo() == tipos.BOOLEAN) {
                    return new Primitivo(new Tipo(tipos.CADENA), "boolean", this.line, this.column);
                } else if (valor.tipo.getTipo() == tipos.CARACTER) {
                    return new Primitivo(new Tipo(tipos.CADENA), "char", this.line, this.column);
                } else if (valor.tipo.getTipo() == tipos.CADENA) {
                    return new Primitivo(new Tipo(tipos.CADENA), "string", this.line, this.column);
                } else {
                    return new Excepcion("Semántico", "Tipo de valor no valido para typeof", this.line, this.column);
                }
                break;
            case OperadorNativas.TOSTRING:
                if (valor.tipo.getTipo() == tipos.ENTERO) {
                    return new Primitivo(new Tipo(tipos.CADENA), valor.value.toString(), this.line, this.column);
                } else if (valor.tipo.getTipo() == tipos.DECIMAL) {
                    return new Primitivo(new Tipo(tipos.CADENA), valor.value.toString(), this.line, this.column);
                } else if (valor.tipo.getTipo() == tipos.BOOLEAN) {
                    return new Primitivo(new Tipo(tipos.CADENA), valor.value.toString(), this.line, this.column);
                } else {
                    return new Excepcion("Semántico", "Tipo de valor no valido para toString", this.line, this.column);
                }
                break;
            default:
                return new Excepcion("Semántico", "Tipo de funcion no valido", this.line, this.column);
        }
    }

    public getNodo() : nodoAST{
        var opera = "";
        if (null != this.operador) switch (this.operador) {
            case OperadorNativas.LENGTH:
                opera = "Length";
                break;
            case OperadorNativas.ROUND:
                opera = "Round";
                break;
            case OperadorNativas.TOLOWER:
                opera = "toLower";
                break;
            case OperadorNativas.TOSTRING:
                opera = "toString";
                break;
            case OperadorNativas.TOUPPER:
                opera = "toUpper";
                break;
            case OperadorNativas.TRUNCATE:
                opera = "Truncate";
                break;
            case OperadorNativas.TYPEOF:
                opera = "typeOf";
                break;
        }
        let nodo : nodoAST = new nodoAST(opera);
        nodo.addHijo("(");
        nodo.adddHijo(this.express.getNodo());
        nodo.addHijo(")");
        return nodo;
    }

}

export enum OperadorNativas {
    TOLOWER,
    TOUPPER,
    LENGTH,
    TRUNCATE,
    ROUND,
    TYPEOF,
    TOSTRING,
    TOCHARARRAY
}