import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Primitivo from './Primitiva';

export default class Relacional extends Instruccion {

    private op1: Instruccion | undefined;
    private op2: Instruccion | undefined;
    //private opU : Instruccion | undefined;
    private operador: OperadorRelacional;

    constructor(operador: OperadorRelacional, row: Number, column: Number, operando1: Instruccion, operando2: Instruccion) {
        super(new Tipo(tipos.ENTERO), row, column);
        this.operador = operador;
        this.op1 = operando1;
        this.op2 = operando2;
        this.column = column;
        this.line = row;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        var left = null, right = null, unario = null, p1 = null, p2 = null, pu = null;

        p1 = this.op1?.interpretar(tree, table);
        if (p1 instanceof Excepcion) return p1;
        left = p1.value;
        //p1 = this.op1?.interpretar(tree, table);

        p2 = this.op2?.interpretar(tree, table);
        if (p2 instanceof Excepcion) return p2;
        right = p2.value;
        //p2 = this.op2?.interpretar(tree, table);

        this.tipo = new Tipo(tipos.BOOLEAN);

        if (p1.tipo.getTipo() == tipos.BOOLEAN) {
            if(left.toString().toLowerCase() == "true"){
                left = true;
            }else{
                left = false;
            }
        }
        if (p2.tipo.getTipo() == tipos.BOOLEAN) {
            if(right.toString().toLowerCase() == "true"){
                right = true;
            }else{
                right = false;
            }
        }
        if (null != this.operador) switch (this.operador) {
            case OperadorRelacional.MAYORQUE:
                if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(parseInt(left) > parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(parseInt(left) > parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(parseInt(left) > right.codePointAt(0));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(parseFloat(left) > parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(parseFloat(left) > parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(parseFloat(left) > right.codePointAt(0));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(left.codePointAt(0) > parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(left.codePointAt(0) > parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(left.codePointAt(0) > parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.CADENA && p2.tipo.getTipo() == tipos.CADENA) {
                    return this.retorno(left > right);
                }
                else if (p1.tipo.getTipo() == tipos.BOOLEAN && p2.tipo.getTipo() == tipos.BOOLEAN) {
                    return this.retorno(left > right);
                }
                else {
                    return new Excepcion("Semántico", "Error en operacion entre tipos.", this.line, this.column);
                }
                break;
            case OperadorRelacional.MENORQUE:
                if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(parseInt(left) < parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(parseInt(left) < parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(parseInt(left) < right.codePointAt(0));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(parseFloat(left) < parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(parseFloat(left) < parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(parseFloat(left) < right.codePointAt(0));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(left.codePointAt(0) < parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(left.codePointAt(0) < parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(left.codePointAt(0) < parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.CADENA && p2.tipo.getTipo() == tipos.CADENA) {
                    return this.retorno(left < right);
                }
                else if (p1.tipo.getTipo() == tipos.BOOLEAN && p2.tipo.getTipo() == tipos.BOOLEAN) {
                    return this.retorno(left < right);
                }
                else {
                    return new Excepcion("Semántico", "Error en operacion entre tipos.", this.line, this.column);
                }
                break;
            case OperadorRelacional.MAYORIGUAL:
                if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(parseInt(left) >= parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(parseInt(left) >= parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(parseInt(left) >= right.codePointAt(0));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(parseFloat(left) >= parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(parseFloat(left) >= parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(parseFloat(left) >= right.codePointAt(0));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(left.codePointAt(0) >= parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(left.codePointAt(0) >= parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(left.codePointAt(0) >= parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.CADENA && p2.tipo.getTipo() == tipos.CADENA) {
                    return this.retorno(left >= right);
                }
                else if (p1.tipo.getTipo() == tipos.BOOLEAN && p2.tipo.getTipo() == tipos.BOOLEAN) {
                    return this.retorno(left >= right);
                }
                else {
                    return new Excepcion("Semántico", "Error en operacion entre tipos.", this.line, this.column);
                }
                break;
            case OperadorRelacional.MENORIGUAL:
                if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(parseInt(left) <= parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(parseInt(left) <= parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(parseInt(left) <= right.codePointAt(0));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(parseFloat(left) <= parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(parseFloat(left) <= parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(parseFloat(left) <= right.codePointAt(0));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(left.codePointAt(0) <= parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(left.codePointAt(0) <= parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(left.codePointAt(0) <= parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.CADENA && p2.tipo.getTipo() == tipos.CADENA) {
                    return this.retorno(left <= right);
                }
                else if (p1.tipo.getTipo() == tipos.BOOLEAN && p2.tipo.getTipo() == tipos.BOOLEAN) {
                    return this.retorno(left <= right);
                }
                else {
                    return new Excepcion("Semántico", "Error en operacion entre tipos.", this.line, this.column);
                }
                break;
            case OperadorRelacional.IGUALACION:
                if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.ENTERO) {
                    debugger;
                    return this.retorno(parseInt(left) == parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(parseInt(left) == parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(parseInt(left) == right.codePointAt(0));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(parseFloat(left) == parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(parseFloat(left) == parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(parseFloat(left) == right.codePointAt(0));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(left.codePointAt(0) == parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(left.codePointAt(0) == parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(left.codePointAt(0) == parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.CADENA && p2.tipo.getTipo() == tipos.CADENA) {
                    return this.retorno(left == right);
                }
                else if (p1.tipo.getTipo() == tipos.BOOLEAN && p2.tipo.getTipo() == tipos.BOOLEAN) {
                    return this.retorno(left == right);
                }
                else {
                    return new Excepcion("Semántico", "Error en operacion entre tipos.", this.line, this.column);
                }
                break;
            case OperadorRelacional.DIFERENCIACION:
                if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(parseInt(left) != parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(parseInt(left) != parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.ENTERO && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(parseInt(left) != right.codePointAt(0));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(parseFloat(left) != parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(parseFloat(left) != parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(parseFloat(left) != right.codePointAt(0));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.ENTERO) {
                    return this.retorno(left.codePointAt(0) != parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.DECIMAL) {
                    return this.retorno(left.codePointAt(0) != parseFloat(right));
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER && p2.tipo.getTipo() == tipos.CARACTER) {
                    return this.retorno(left.codePointAt(0) != parseInt(right));
                }
                else if (p1.tipo.getTipo() == tipos.CADENA && p2.tipo.getTipo() == tipos.CADENA) {
                    return this.retorno(left != right);
                }
                else if (p1.tipo.getTipo() == tipos.BOOLEAN && p2.tipo.getTipo() == tipos.BOOLEAN) {
                    return this.retorno(left != right);
                }
                else {
                    return new Excepcion("Semántico", "Error en operacion entre tipos.", this.line, this.column);
                }
                break;
            default:
                return new Excepcion("Semántico", "Tipo de Operación Erróneo.", this.line, this.column);
        }
    }

    public retorno(result: any) {
        return new Primitivo(this.tipo, result, this.line, this.column);
    }

    public getNodo(): nodoAST {
        var opera = "";
        if (null != this.operador) switch (this.operador) {
            case OperadorRelacional.DIFERENCIACION:
                opera = "!=";
                break;
            case OperadorRelacional.IGUALACION:
                opera = "==";
                break;
            case OperadorRelacional.MAYORIGUAL:
                opera = ">=";
                break;
            case OperadorRelacional.MAYORQUE:
                opera = ">";
                break;
            case OperadorRelacional.MENORIGUAL:
                opera = "<=";
                break;
            case OperadorRelacional.MENORQUE:
                opera = "<";
                break;
        }
        let nodo: nodoAST = new nodoAST("Relacional");
            if (this.op1 && this.op2) {
                nodo.adddHijo(this.op1.getNodo());
                nodo.addHijo(opera);
                nodo.adddHijo(this.op2.getNodo());
            }
        return nodo;
    }

}

export enum OperadorRelacional {
    MAYORQUE,
    MENORQUE,
    MAYORIGUAL,
    MENORIGUAL,
    IGUALACION,
    DIFERENCIACION
}