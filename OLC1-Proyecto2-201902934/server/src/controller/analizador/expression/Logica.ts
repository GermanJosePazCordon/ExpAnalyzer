import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Primitivo from './Primitiva';

export default class Logica extends Instruccion {

    private op1: Instruccion | undefined;
    private op2: Instruccion | undefined;
    private opU: Instruccion | undefined;
    private operador: OperadorLogico;

    constructor(operador: OperadorLogico, row: Number, column: Number, operando1: Instruccion, operando2?: Instruccion) {
        super(new Tipo(tipos.ENTERO), row, column);
        this.operador = operador;
        this.line = row;
        this.column = column;
        if (!operando2) {
            this.opU = operando1;
        }
        else {
            this.op1 = operando1;
            this.op2 = operando2;
        }
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        var left = null, right = null, unario = null, p1 = null, p2 = null, pu = null;

        if (this.opU == (null || undefined)) {
            p1 = this.op1?.interpretar(tree, table);
            if (p1 instanceof Excepcion) return p1;
            left = p1.value;
            //p1 = this.op1?.interpretar(tree, table);

            p2 = this.op2?.interpretar(tree, table);
            if (p2 instanceof Excepcion) return p2;
            right = p2.value;
            //p2 = this.op2?.interpretar(tree, table);
            try {
                if (left.toLowerCase() == "true") {
                    left = true;
                } else {
                    left = false;
                }
                if (right.toLowerCase() == "true") {
                    right = true;
                } else {
                    right = false;
                }
            } catch { }
        }
        else {
            pu = this.opU.interpretar(tree, table);
            if (pu instanceof Excepcion) return pu;
            unario = pu.value
            //pu = this.opU.interpretar(tree, table);
            try {
                if (unario.toLowerCase() == "true") {
                    unario = true;
                } else {
                    unario = false;
                }
            }
            catch { }
        }
        this.tipo = new Tipo(tipos.BOOLEAN);
        if (null != this.operador) switch (this.operador) {
            case OperadorLogico.OR:
                if (p1.tipo.getTipo() == tipos.BOOLEAN && p2.tipo.getTipo() == tipos.BOOLEAN) {
                    if (left || right) {
                        return this.retorno(true);
                    }
                    return this.retorno(false);
                }
                else {
                    tree.addError(new Excepcion("Semántico", "Error de tipos en operacion ||.", this.line, this.column));
                    return new Excepcion("Semántico", "Error de tipos en operacion ||.", this.line, this.column);
                }
                break;
            case OperadorLogico.AND:
                if (p1.tipo.getTipo() == tipos.BOOLEAN && p2.tipo.getTipo() == tipos.BOOLEAN) {
                    if (left && right) {
                        return this.retorno(true);
                    }
                    return this.retorno(false);
                }
                else {
                    tree.addError(new Excepcion("Semántico", "Error de tipos en operacion &&.", this.line, this.column));
                    return new Excepcion("Semántico", "Error de tipos en operacion &&.", this.line, this.column);
                }
                break;
            case OperadorLogico.NOT:
                if (pu.tipo.getTipo() == tipos.BOOLEAN) {

                    if (unario) {
                        return this.retorno(false);
                    }
                    return this.retorno(true);
                }
                else {
                    tree.addError(new Excepcion("Semántico", "Error de tipos en operacion !.", this.line, this.column));
                    return new Excepcion("Semántico", "Error de tipos en operacion !.", this.line, this.column);
                }
                break;
            default:
                tree.addError(new Excepcion("Semántico", "Tipo de Operación Erróneo.", this.line, this.column));
                return new Excepcion("Semántico", "Tipo de Operación Erróneo.", this.line, this.column);
        }
    }

    public retorno(result: any) {
        return new Primitivo(this.tipo, result, this.line, this.column);
    }

    public getNodo(): nodoAST {
        var opera = "";
        if (null != this.operador) switch (this.operador) {
            case OperadorLogico.AND:
                opera = "&&";
                break;
            case OperadorLogico.OR:
                opera = "||";
                break;
            case OperadorLogico.NOT:
                opera = "!";
                break;
        }
        let nodo: nodoAST = new nodoAST("Logico");
        if (this.opU != null) {
            nodo.addHijo(opera);
            nodo.adddHijo(this.opU.getNodo());
        } else {
            if (this.op1 && this.op2) {
                nodo.adddHijo(this.op1.getNodo());
                nodo.addHijo(opera);
                nodo.adddHijo(this.op2.getNodo());
            }
        }
        return nodo;
    }

}

export enum OperadorLogico {
    OR,
    AND,
    NOT
}