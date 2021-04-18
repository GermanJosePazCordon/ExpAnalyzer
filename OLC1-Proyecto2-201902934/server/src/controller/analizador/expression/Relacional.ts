import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class Relacional extends Instruccion{

    private op1 : Instruccion | undefined;
    private op2 : Instruccion | undefined;
    //private opU : Instruccion | undefined;
    private operador : OperadorRelacional;

    constructor(operador : OperadorRelacional, row : Number, column : Number, operando1 : Instruccion, operando2?:Instruccion){
        super(new Tipo(tipos.ENTERO), row, column);
        this.operador = operador;
        this.op1 = operando1;
        this.op2 = operando2;
        this.column = column;
        this.line = row;
    }

    public interpretar(tree : Arbol, table : tablaSimbolos){
        var left = null, right = null, unario = null;

        left = this.op1?.interpretar(tree, table);
        if (left instanceof Excepcion) return left;

        right = this.op2?.interpretar(tree, table);
        if (right instanceof Excepcion) return right;

        this.tipo = new Tipo(tipos.BOOLEAN);
        if (null != this.operador) switch (this.operador) {
            case OperadorRelacional.MAYORQUE:
                if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return left > right;  
                }
                else  if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return parseInt(left) > parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return parseInt(left) > right.codePointAt(0);
                }
                else if (this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return parseFloat(left) > parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return parseFloat(left) > parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return parseFloat(left) > right.codePointAt(0);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return left.codePointAt(0) > parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return left.codePointAt(0) > parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return left.codePointAt(0) > parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CADENA && this.op2?.tipo.getTipo() == tipos.CADENA){
                    return left > right;
                }
                else{
                    return new Excepcion("Semántico","Error en operacion entre tipos.",this.line,this.column);
                }
                break;
            case OperadorRelacional.MENORQUE:
                if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return left < right;  
                }
                else  if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return parseInt(left) < parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return parseInt(left) < right.codePointAt(0);
                }
                else if (this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return parseFloat(left) < parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return parseFloat(left) < parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return parseFloat(left) < right.codePointAt(0);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return left.codePointAt(0) < parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return left.codePointAt(0) < parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return left.codePointAt(0) < parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CADENA && this.op2?.tipo.getTipo() == tipos.CADENA){
                    return left < right;
                }
                else{
                    return new Excepcion("Semántico","Error en operacion entre tipos.",this.line,this.column);
                }
                break;
            case OperadorRelacional.MAYORIGUAL:
                if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return left >= right;  
                }
                else  if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return parseInt(left) >= parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return parseInt(left) >= right.codePointAt(0);
                }
                else if (this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return parseFloat(left) >= parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return parseFloat(left) >= parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return parseFloat(left) >= right.codePointAt(0);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return left.codePointAt(0) >= parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return left.codePointAt(0) >= parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return left.codePointAt(0) >= parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CADENA && this.op2?.tipo.getTipo() == tipos.CADENA){
                    return left >= right;
                }
                else{
                    return new Excepcion("Semántico","Error en operacion entre tipos.",this.line,this.column);
                }
                break;
            case OperadorRelacional.MENORIGUAL:
                if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return left <= right;  
                }
                else  if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return parseInt(left) <= parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return parseInt(left) <= right.codePointAt(0);
                }
                else if (this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return parseFloat(left) <= parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return parseFloat(left) <= parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return parseFloat(left) <= right.codePointAt(0);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return left.codePointAt(0) <= parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return left.codePointAt(0) <= parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return left.codePointAt(0) <= parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CADENA && this.op2?.tipo.getTipo() == tipos.CADENA){
                    return left <= right;
                }
                else{
                    return new Excepcion("Semántico","Error en operacion entre tipos.",this.line,this.column);
                }
                break;
            case OperadorRelacional.IGUALACION:
                if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return left == right;  
                }
                else  if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return parseInt(left) == parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return parseInt(left) == right.codePointAt(0);
                }
                else if (this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return parseFloat(left) == parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return parseFloat(left) == parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return parseFloat(left) == right.codePointAt(0);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return left.codePointAt(0) == parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return left.codePointAt(0) == parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return left.codePointAt(0) == parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CADENA && this.op2?.tipo.getTipo() == tipos.CADENA){
                    return left == right;
                }
                else{
                    return new Excepcion("Semántico","Error en operacion entre tipos.",this.line,this.column);
                }
                break;
            case OperadorRelacional.DIFERENCIACION:
                if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return left != right;  
                }
                else  if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return parseInt(left) != parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.ENTERO && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return parseInt(left) != right.codePointAt(0);
                }
                else if (this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return parseFloat(left) != parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return parseFloat(left) != parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return parseFloat(left) != right.codePointAt(0);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.ENTERO){
                    return left.codePointAt(0) != parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.DECIMAL){
                    return left.codePointAt(0) != parseFloat(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER && this.op2?.tipo.getTipo() == tipos.CARACTER){
                    return left.codePointAt(0) != parseInt(right);
                }
                else if(this.op1?.tipo.getTipo() == tipos.CADENA && this.op2?.tipo.getTipo() == tipos.CADENA){
                    return left != right;
                }
                else{
                    return new Excepcion("Semántico","Error en operacion entre tipos.",this.line,this.column);
                }
                break;
            default:
                return new Excepcion("Semántico","Tipo de Operación Erróneo.",this.line,this.column);
        }
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