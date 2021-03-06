import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Primitivo from './Primitiva';

export default class Aritmetica extends Instruccion {

    private op1: Instruccion | undefined;
    private op2: Instruccion | undefined;
    private opU: Instruccion | undefined;
    private operador: OperadorAritmetico;

    constructor(operador: OperadorAritmetico, row: Number, column: Number, operando1: Instruccion, operando2?: Instruccion) {
        super(new Tipo(tipos.ENTERO), row, column);
        this.operador = operador;
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


            p2 = this.op2?.interpretar(tree, table);
            if (p2 instanceof Excepcion) return p2;
            right = p2.value;

            if (this.op1?.tipo.getTipo() == tipos.BOOLEAN) {
                left = left.toString().toLowerCase();
            } else if (this.op2?.tipo.getTipo() == tipos.BOOLEAN) {
                right = right.toString().toLowerCase();
            }

        }
        else {
            unario = this.opU.interpretar(tree, table);
            if (unario instanceof Excepcion) return unario;
            pu = unario;
            unario = unario.value;
        }
        if (null != this.operador) switch (this.operador) {
            case OperadorAritmetico.SUMA:
                if (p1.tipo.getTipo() == tipos.ENTERO) { // Entero + algo
                    if (p2.tipo.getTipo() == tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return this.retorno(parseInt(left) + parseInt(right)); // Entero + Entero
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(parseInt(left) + parseFloat(right)); // Entero + Decimal
                    }
                    else if (p2.tipo.getTipo() == tipos.CADENA) {
                        this.tipo = new Tipo(tipos.CADENA);
                        return this.retorno(left + "" + right); // Entero + Cadena
                    }
                    else if (p2.tipo.getTipo() == tipos.BOOLEAN) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        if (right == "true") {
                            return this.retorno(parseInt(left) + 1); // Entero + true
                        } else if (right == "false") {
                            return this.retorno(parseInt(left) + 0); // Entero + false
                        }
                    }
                    else if (p2.tipo.getTipo() == tipos.CARACTER) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return this.retorno(parseInt(parseInt(left) + right.charCodeAt(0))); // Entero + Caracter
                    }
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL) { // Decimal + algo
                    if (p2.tipo.getTipo() == tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(parseFloat(left) + parseFloat(right)); // Decimal + Entero
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(parseFloat(left) + parseFloat(right)); // Decimal + Decimal
                    }
                    else if (p2.tipo.getTipo() == tipos.CADENA) {
                        this.tipo = new Tipo(tipos.CADENA);
                        return this.retorno(left + "" + right); // Decimal + Cadena
                    }
                    else if (p2.tipo.getTipo() == tipos.BOOLEAN) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        if (right == "true") {
                            return this.retorno(parseFloat(left) + 1); // Decimal + true
                        } else if (right == "false") {
                            return this.retorno(parseFloat(left) + 0); // Decimal + false
                        }
                    }
                    else if (p2.tipo.getTipo() == tipos.CARACTER) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(parseFloat(left) + right.charCodeAt(0)); // Decimal + Caracter
                    }
                }
                else if (p1.tipo.getTipo() == tipos.BOOLEAN) { //  Boolean + algo
                    if (p2.tipo.getTipo() == tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        if (left == "true") {
                            return this.retorno(1 + parseInt(right)); // Boolean + Entero
                        } else if (left == "false") {
                            return this.retorno(parseInt(right)); // Boolean + Entero
                        }
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        if (left == "true") {
                            return this.retorno(1 + parseFloat(right)); // Boolean + Entero
                        } else if (left == "false") {
                            return this.retorno(parseFloat(right)); // Boolean + Entero
                        }
                    }
                    else if (p2.tipo.getTipo() == tipos.CADENA) {
                        this.tipo = new Tipo(tipos.CADENA);
                        return this.retorno(left + "" + right); // Boolean + Cadena
                    }
                    else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para +", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para +", this.line, this.column);
                    }
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER) { //  Caracter + algo
                    if (p2.tipo.getTipo() == tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return this.retorno(parseInt(left.charCodeAt(0) + parseInt(right))); // Caracter + Entero
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(parseFloat(left.charCodeAt(0) + parseFloat(right))); // Caracter + Decimal
                    }
                    else if (p2.tipo.getTipo() == tipos.CADENA) {
                        this.tipo = new Tipo(tipos.CADENA);
                        return this.retorno(left + "" + right); // Caracter + Cadena
                    }
                    else if (p2.tipo.getTipo() == tipos.CARACTER) {
                        this.tipo = new Tipo(tipos.CADENA);
                        return this.retorno(left + "" + right); // Caracter + Caracter
                    }
                    else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para +", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para +", this.line, this.column);
                    }
                }
                else if (p1.tipo.getTipo() == tipos.CADENA) { //  Cadena + algo
                    if (p2.tipo.getTipo() == tipos.ENTERO) {

                        this.tipo = new Tipo(tipos.CADENA);
                        return this.retorno(left + parseInt(right)); // Cadena + Entero
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.CADENA);
                        return this.retorno(left + "" + parseFloat(right)); // Cadena + Decimal
                    }
                    else if (p2.tipo.getTipo() == tipos.CADENA) {
                        this.tipo = new Tipo(tipos.CADENA);
                        return this.retorno(left + "" + right); // Cadena + Cadena
                    }
                    else if (p2.tipo.getTipo() == tipos.BOOLEAN) {
                        this.tipo = new Tipo(tipos.CADENA);
                        return this.retorno(left + "" + right); // Cadena + Boolean
                    }
                    else if (p2.tipo.getTipo() == tipos.CARACTER) {
                        this.tipo = new Tipo(tipos.CADENA);
                        return this.retorno(left + "" + right); // Cadena + Caracter
                    }
                }
                else {
                    tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para +", this.line, this.column));
                    return new Excepcion("Sem??ntico", "Operandos erroneos para +", this.line, this.column);
                }
                break;
            case OperadorAritmetico.RESTA:
                if (p1.tipo.getTipo() == tipos.ENTERO) { // Entero - algo
                    if (p2.tipo.getTipo() == tipos.ENTERO) {

                        this.tipo = new Tipo(tipos.ENTERO);
                        return this.retorno(parseInt(left) - parseInt(right)); // Entero - Entero
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(parseInt(left) - parseFloat(right)); // Entero - Decimal
                    }
                    else if (p2.tipo.getTipo() == tipos.BOOLEAN) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        if (right == "true") {
                            return this.retorno(parseInt(left) - 1); // Entero - true
                        } else if (right == "false") {
                            return this.retorno(parseInt(left) - 0); // Entero - false
                        }
                    }
                    else if (p2.tipo.getTipo() == tipos.CARACTER) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return this.retorno(parseInt(left) - right.charCodeAt(0)); // Entero - Caracter
                    }
                    else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para -", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para -", this.line, this.column);
                    }
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL) { // Decimal - algo
                    if (p2.tipo.getTipo() == tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(parseFloat(left) - parseFloat(right)); // Decimal - Entero
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(parseFloat(left) - parseFloat(right)); // Decimal - Decimal
                    }
                    else if (p2.tipo.getTipo() == tipos.BOOLEAN) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        if (right == "true") {
                            return this.retorno(parseFloat(left) - 1); // Decimal - true
                        } else if (right == "false") {
                            return this.retorno(parseFloat(left) - 0); // Decimal - false
                        }
                    }
                    else if (p2.tipo.getTipo() == tipos.CARACTER) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(parseFloat(left) - right.charCodeAt(0)); // Decimal - Caracter
                    }
                    else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para -", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para -", this.line, this.column);
                    }
                }
                else if (p1.tipo.getTipo() == tipos.BOOLEAN) { //  Boolean - algo
                    var bool: number = 0;
                    if (left == "true") {
                        bool = 1;
                    } else if (left = "false") {
                        bool = 0;
                    }
                    if (p2.tipo.getTipo() == tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return this.retorno(bool - parseInt(right)); // Boolean - Entero
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(bool - parseFloat(left)); // Boolean - Decimal
                    }
                    else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para -", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para -", this.line, this.column);
                    }
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER) { //  Caracter - algo
                    if (p2.tipo.getTipo() == tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return this.retorno(left.charCodeAt(0) - parseInt(right)); // Caracter - Entero
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(left.charCodeAt(0) - parseFloat(right)); // Caracter - Decimal
                    }
                    else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para -", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para -", this.line, this.column);
                    }
                }
                else {
                    tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para -", this.line, this.column));
                    return new Excepcion("Sem??ntico", "Operandos erroneos para -", this.line, this.column);
                }
                break;
            case OperadorAritmetico.MULTIPLICACION:
                if (p1.tipo.getTipo() == tipos.ENTERO) { // Entero * algo
                    if (p2.tipo.getTipo() == tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.ENTERO);

                        return this.retorno(parseInt(left) * parseInt(right)); // Entero * Entero
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {

                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(parseInt(left) * parseFloat(right)); // Entero * Decimal
                    }
                    else if (p2.tipo.getTipo() == tipos.CARACTER) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return this.retorno(parseInt(left) * right.charCodeAt(0)); // Entero * Caracter
                    }
                    else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para *", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para *", this.line, this.column);
                    }
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL) { // Decimal * algo
                    if (p2.tipo.getTipo() == tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(parseFloat(left) * parseFloat(right)); // Decimal * Entero
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(parseFloat(left) * parseFloat(right)); // Decimal * Decimal
                    }
                    else if (p2.tipo.getTipo() == tipos.CARACTER) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(parseFloat(left) * right.charCodeAt(0)); // Decimal * Caracter
                    }
                    else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para *", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para *", this.line, this.column);
                    }
                }
                else if (p1.tipo.getTipo() == tipos.CARACTER) { //  Caracter * algo
                    if (p2.tipo.getTipo() == tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return this.retorno(left.charCodeAt(0) * parseInt(right)); // Caracter * Entero
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(left.charCodeAt(0) * parseFloat(right)); // Caracter * Decimal
                    }
                    else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para *", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para *", this.line, this.column);
                    }
                }
                else {
                    return new Excepcion("Sem??ntico", "Operandos erroneos para *", this.line, this.column);
                }
                break;
            case OperadorAritmetico.DIVISION:
                if (parseInt(right) != 0 || parseFloat(right) != 0) {
                    if (p1.tipo.getTipo() == tipos.ENTERO) { // Entero / algo
                        if (p2.tipo.getTipo() == tipos.ENTERO) {
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return this.retorno(parseInt(left) / parseInt(right)); // Entero / Entero
                        }
                        else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return this.retorno(parseInt(left) / parseFloat(right)); // Entero / Decimal
                        }
                        else if (p2.tipo.getTipo() == tipos.CARACTER) {
                            this.tipo = new Tipo(tipos.ENTERO);
                            return this.retorno(parseInt(left) / right.charCodeAt(0)); // Entero / Caracter
                        }
                        else {
                            tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para /", this.line, this.column));
                            return new Excepcion("Sem??ntico", "Operandos erroneos para /", this.line, this.column);
                        }
                    }
                    else if (p1.tipo.getTipo() == tipos.DECIMAL) { // Decimal / algo
                        if (p2.tipo.getTipo() == tipos.ENTERO) {
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return this.retorno(parseFloat(left) / parseFloat(right)); // Decimal / Entero
                        }
                        else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                            this.tipo = new Tipo(tipos.DECIMAL);
                            var res = this.retorno(parseFloat(left) / parseFloat(right))
                            return res; // Decimal / Decimal
                        }
                        else if (p2.tipo.getTipo() == tipos.CARACTER) {
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return this.retorno(parseFloat(left) / right.charCodeAt(0)); // Decimal / Caracter
                        }
                        else {
                            tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para /", this.line, this.column));
                            return new Excepcion("Sem??ntico", "Operandos erroneos para /", this.line, this.column);
                        }
                    }
                    else if (p1.tipo.getTipo() == tipos.CARACTER) { //  Caracter / algo
                        if (p2.tipo.getTipo() == tipos.ENTERO) {
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return this.retorno(left.charCodeAt(0) / parseInt(right)); // Caracter / Entero
                        }
                        else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return this.retorno(left.charCodeAt(0) / parseFloat(right)); // Caracter / Decimal
                        }
                        else {
                            tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para /", this.line, this.column));
                            return new Excepcion("Sem??ntico", "Operandos erroneos para /", this.line, this.column);
                        }
                    }
                    else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para /", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para /", this.line, this.column);
                    }
                }
                else {
                    tree.addError(new Excepcion("Sem??ntico", "Divisi??n entre cero", this.line, this.column));
                    return new Excepcion("Sem??ntico", "Divisi??n entre cero", this.line, this.column);
                }
                break;
            case OperadorAritmetico.POTENCIA:
                if (p1.tipo.getTipo() == tipos.ENTERO) { // Entero ^ algo
                    if (p2.tipo.getTipo() == tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.ENTERO);
                        return this.retorno(Math.pow(parseInt(left), parseInt(right))); // Entero ^ Entero
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(Math.pow(parseInt(left), parseFloat(right))); // Entero ^ Entero
                    }
                    else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para ^", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para ^", this.line, this.column);
                    }
                }
                else if (p1.tipo.getTipo() == tipos.DECIMAL) { // Decimal ^ algo
                    if (p2.tipo.getTipo() == tipos.ENTERO) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(Math.pow(parseFloat(left), parseFloat(right))); // Decimal ^ Entero
                    }
                    else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return this.retorno(Math.pow(parseFloat(left), parseFloat(right))); // Decimal ^ Decimal
                    }
                    else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para ^", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para ^", this.line, this.column);
                    }
                }
                else {
                    tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para ^", this.line, this.column));
                    return new Excepcion("Sem??ntico", "Operandos erroneos para ^", this.line, this.column);
                }
                break;
            case OperadorAritmetico.MODULO:
                if (parseInt(right) != 0 || parseFloat(right) != 0) {
                    if (p1.tipo.getTipo() == tipos.ENTERO) { // Entero % algo
                        if (p2.tipo.getTipo() == tipos.ENTERO) {
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return this.retorno(parseInt(left) % parseInt(right)); // Entero % Entero
                        }
                        else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return this.retorno(parseInt(left) % parseFloat(right)); // Entero % Decimal
                        }
                        else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para %", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para %", this.line, this.column);
                        }
                    }
                    else if (p1.tipo.getTipo() == tipos.DECIMAL) { // Decimal % algo
                        if (p2.tipo.getTipo() == tipos.ENTERO) {
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return this.retorno(parseFloat(left) % parseFloat(right)); // Decimal % Entero
                        }
                        else if (p2.tipo.getTipo() == tipos.DECIMAL) {
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return this.retorno(parseFloat(left) % parseFloat(right)); // Decimal % Decimal
                        }
                        else {
                            tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para %", this.line, this.column));
                            return new Excepcion("Sem??ntico", "Operandos erroneos para %", this.line, this.column);
                        }
                    }
                    else {
                        tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para %", this.line, this.column));
                        return new Excepcion("Sem??ntico", "Operandos erroneos para %", this.line, this.column);
                    }
                }
                else {
                    tree.addError(new Excepcion("Sem??ntico", "M??dulo entre cero", this.line, this.column));
                    return new Excepcion("Sem??ntico", "M??dulo entre cero", this.line, this.column);
                }
                break;
            case OperadorAritmetico.MENOSUNARIO:
                if (pu.tipo.getTipo() == tipos.ENTERO) { // Unario Entero
                    this.tipo = new Tipo(tipos.ENTERO);
                    return this.retorno(-1 * parseInt(unario)); // Unario Entero 
                }
                else if (pu.tipo.getTipo() == tipos.DECIMAL) { // Unario Decimal
                    this.tipo = new Tipo(tipos.DECIMAL);
                    return this.retorno(-1 * parseFloat(unario)); // Unario Decimal 
                }
                else {
                    tree.addError(new Excepcion("Sem??ntico", "Operandos erroneos para unario", this.line, this.column));
                    return new Excepcion("Sem??ntico", "Operandos erroneos para unario", this.line, this.column);
                }
                break;
            default:
                tree.addError(new Excepcion("Sem??ntico", "Tipo de Operaci??n Err??neo.", this.line, this.column));
                return new Excepcion("Sem??ntico", "Tipo de Operaci??n Err??neo.", this.line, this.column);
        }
    }

    public retorno(result: any) {
        return new Primitivo(this.tipo, result.toString(), this.line, this.column);
    }

    public getNodo(): nodoAST {
        var opera = "";
        if (null != this.operador) switch (this.operador) {
            case OperadorAritmetico.SUMA:
                opera = "+";
                break;
            case OperadorAritmetico.RESTA:
                opera = "-";
                break;
            case OperadorAritmetico.MULTIPLICACION:
                opera = "*";
                break;
            case OperadorAritmetico.DIVISION:
                opera = "/";
                break;
            case OperadorAritmetico.POTENCIA:
                opera = "^";
                break;
            case OperadorAritmetico.MODULO:
                opera = "%";
                break;
            case OperadorAritmetico.MENOSUNARIO:
                opera = "-";
                break;
        }
        let nodo: nodoAST = new nodoAST("Aritmetica");
        if (this.opU != null) {
            nodo.addHijo(opera);
            nodo.adddHijo(this.opU.getNodo());
        }
        else {
            if (this.op1 && this.op2) {
                nodo.adddHijo(this.op1.getNodo());
                nodo.addHijo(opera);
                nodo.adddHijo(this.op2.getNodo());
            }
        }
        return nodo;
    }

}

export enum OperadorAritmetico {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MENOSUNARIO,
    POTENCIA,
    MODULO
}