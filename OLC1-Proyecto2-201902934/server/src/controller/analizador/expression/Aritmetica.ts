import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class Aritmetica extends Instruccion {
    
    private op1 : Instruccion | undefined;
    private op2 : Instruccion | undefined;
    private opU : Instruccion | undefined;
    private operador : OperadorAritmetico;

    constructor(operador : OperadorAritmetico, row : Number, column : Number, operando1 : Instruccion, operando2?:Instruccion){
        super(new Tipo(tipos.ENTERO), row, column);
        this.operador = operador;
        if(!operando2){
            this.opU = operando1;
        }
        else{
            this.op1 = operando1;
            this.op2 = operando2;
        }
    }

    public interpretar(tree : Arbol, table : tablaSimbolos){
        var left = null, right = null, unario = null;
        
        if(this.opU == (null||undefined)){
            left = this.op1?.interpretar(tree, table);
            if(left instanceof Excepcion) return left;

            right = this.op2?.interpretar(tree, table);
            if(right instanceof Excepcion) return right;
        }
        else{
            unario = this.opU.interpretar(tree, table);
            if(unario instanceof Excepcion) return unario;
        }
        if(null != this.operador) switch (this.operador){
            case OperadorAritmetico.SUMA:
                if(this.op1?.tipo.getTipo() == tipos.ENTERO){ // Entero + algo
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.ENTERO);
                        return parseInt(left) + parseInt(right); // Entero + Entero
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return parseInt(left) + parseFloat(right); // Entero + Decimal
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.CADENA){
                        this.tipo = new Tipo(tipos.CADENA);
                        return left + "" + right; // Entero + Cadena
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.BOOLEAN){
                        this.tipo = new Tipo(tipos.ENTERO);
                        if(right == "true"){ 
                            return parseInt(left) + 1; // Entero + true
                        }else if(right == "false"){
                            return parseInt(left) + 0; // Entero + false
                        }
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.CARACTER){
                        this.tipo = new Tipo(tipos.ENTERO);
                        return parseInt( parseInt(left) + right.charCodeAt(0) ); // Entero + Caracter
                    }
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL){ // Decimal + algo
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return parseFloat(left) + parseFloat(right); // Decimal + Entero
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return parseFloat(left) + parseFloat(right); // Decimal + Decimal
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.CADENA){
                        this.tipo = new Tipo(tipos.CADENA);
                        return left + "" + right; // Decimal + Cadena
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.BOOLEAN){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        if(right == "true"){ 
                            return parseFloat(left) + 1; // Decimal + true
                        }else if(right == "false"){
                            return parseFloat(left) + 0; // Decimal + false
                        }
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.CARACTER){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return parseFloat(left) + right.charCodeAt(0); // Decimal + Caracter
                    }
                }
                else if(this.op1?.tipo.getTipo() == tipos.BOOLEAN){ //  Boolean + algo
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.ENTERO);
                        if(left == "true"){
                            return 1 + parseInt(right); // Boolean + Entero
                        }else if(left == "false"){
                            return parseInt(right); // Boolean + Entero
                        }
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        if(left == "true"){
                            return 1 + parseFloat(right); // Boolean + Entero
                        }else if(left == "false"){
                            return parseFloat(right); // Boolean + Entero
                        }
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.CADENA){
                        this.tipo = new Tipo(tipos.CADENA);
                        return left + "" + right; // Boolean + Cadena
                    }
                    else{
                        return new Excepcion("Semántico", "Operandos erroneos para +", this.line, this.column);
                    }
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER){ //  Caracter + algo
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.ENTERO);
                        return parseInt( left.charCodeAt(0) + parseInt(right) ); // Caracter + Entero
                    }  
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return parseFloat( left.charCodeAt(0) + parseFloat(right) ); // Caracter + Decimal
                    }  
                    else if(this.op2?.tipo.getTipo() == tipos.CADENA){
                        this.tipo = new Tipo(tipos.CADENA);
                        return left + "" + right; // Caracter + Cadena
                    }  
                    else if(this.op2?.tipo.getTipo() == tipos.CARACTER){
                        this.tipo = new Tipo(tipos.CADENA);
                        return left + "" + right; // Caracter + Caracter
                    }   
                    else{
                        return new Excepcion("Semántico", "Operandos erroneos para +", this.line, this.column);
                    }   
                }
                else if(this.op1?.tipo.getTipo() == tipos.CADENA){ //  Cadena + algo
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.CADENA);
                        return left + parseInt(right); // Cadena + Entero
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.CADENA);
                        return left + "" + right; // Cadena + Decimal
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.CADENA){
                        this.tipo = new Tipo(tipos.CADENA);
                        return left + "" + right; // Cadena + Cadena
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.BOOLEAN){
                        this.tipo = new Tipo(tipos.CADENA);
                        return left + "" + right; // Cadena + Boolean
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.CARACTER){
                        this.tipo = new Tipo(tipos.CADENA);
                        return left + "" + right; // Cadena + Caracter
                    }
                }
                else{
                    return new Excepcion("Semántico", "Operandos erroneos para +", this.line, this.column);
                }
                break;
            case OperadorAritmetico.RESTA:
                if(this.op1?.tipo.getTipo() == tipos.ENTERO){ // Entero - algo
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.ENTERO);
                        return parseInt(left) - parseInt(right); // Entero - Entero
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return parseInt(left) - parseFloat(right); // Entero - Decimal
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.BOOLEAN){
                        this.tipo = new Tipo(tipos.ENTERO);
                        if(right == "true"){ 
                            return parseInt(left) - 1; // Entero - true
                        }else if(right == "false"){
                            return parseInt(left) - 0; // Entero - false
                        }
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.CARACTER){
                        this.tipo = new Tipo(tipos.ENTERO);
                        return parseInt(left) - right.charCodeAt(0); // Entero - Caracter
                    }
                    else{
                        return new Excepcion("Semántico", "Operandos erroneos para -", this.line, this.column);
                    }
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL){ // Decimal - algo
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return parseFloat(left) - parseFloat(right); // Decimal - Entero
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return parseFloat(left) - parseFloat(right); // Decimal - Decimal
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.BOOLEAN){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        if(right == "true"){ 
                            return parseFloat(left) - 1; // Decimal - true
                        }else if(right == "false"){
                            return parseFloat(left) - 0; // Decimal - false
                        }
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.CARACTER){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return parseFloat(left) - right.charCodeAt(0); // Decimal - Caracter
                    }
                    else{
                        return new Excepcion("Semántico", "Operandos erroneos para -", this.line, this.column);
                    }
                }
                else if(this.op1?.tipo.getTipo() == tipos.BOOLEAN){ //  Boolean - algo
                    var bool : number = 0;
                    if(left == "true"){
                        bool = 1;
                    }else if(left = "false"){
                        bool = 0;
                    }
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.ENTERO);
                        return bool - parseInt(right); // Boolean - Entero
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return bool - parseFloat(left); // Boolean - Decimal
                    }
                    else{
                        return new Excepcion("Semántico", "Operandos erroneos para -", this.line, this.column);
                    }
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER){ //  Caracter - algo
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.ENTERO);
                        return left.charCodeAt(0) - parseInt(right); // Caracter - Entero
                    }  
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return left.charCodeAt(0) - parseFloat(right); // Caracter - Decimal
                    } 
                    else{
                        return new Excepcion("Semántico", "Operandos erroneos para -", this.line, this.column);
                    }
                }
                else{
                    return new Excepcion("Semántico", "Operandos erroneos para -", this.line, this.column);
                }                
                break;
            case OperadorAritmetico.MULTIPLICACION:
                if(this.op1?.tipo.getTipo() == tipos.ENTERO){ // Entero * algo
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.ENTERO);
                        return parseInt(left) * parseInt(right); // Entero * Entero
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return parseInt(left) * parseFloat(right); // Entero * Decimal
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.CARACTER){
                        this.tipo = new Tipo(tipos.ENTERO);
                        return parseInt(left) * right.charCodeAt(0); // Entero * Caracter
                    }
                    else{
                        return new Excepcion("Semántico", "Operandos erroneos para *", this.line, this.column);
                    }
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL){ // Decimal * algo
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return parseFloat(left) * parseFloat(right); // Decimal * Entero
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return parseFloat(left) * parseFloat(right); // Decimal * Decimal
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.CARACTER){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return parseFloat(left) * right.charCodeAt(0); // Decimal * Caracter
                    }
                    else{
                        return new Excepcion("Semántico", "Operandos erroneos para *", this.line, this.column);
                    }
                }
                else if(this.op1?.tipo.getTipo() == tipos.CARACTER){ //  Caracter * algo
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.ENTERO);
                        return left.charCodeAt(0) * parseInt(right); // Caracter * Entero
                    }  
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return left.charCodeAt(0) * parseFloat(right); // Caracter * Decimal
                    } 
                    else{
                        return new Excepcion("Semántico", "Operandos erroneos para *", this.line, this.column);
                    }
                }
                else{
                    return new Excepcion("Semántico", "Operandos erroneos para *", this.line, this.column);
                }
                break;
            case OperadorAritmetico.DIVISION:
                if( parseInt(right) != 0 || parseFloat(right) != 0){
                    if(this.op1?.tipo.getTipo() == tipos.ENTERO){ // Entero / algo
                        if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return parseInt(left) / parseInt(right); // Entero / Entero
                        }
                        else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return parseInt(left) / parseFloat(right); // Entero / Decimal
                        }
                        else if(this.op2?.tipo.getTipo() == tipos.CARACTER){
                            this.tipo = new Tipo(tipos.ENTERO);
                            return parseInt(left) / right.charCodeAt(0); // Entero / Caracter
                        }
                        else{
                            return new Excepcion("Semántico", "Operandos erroneos para /", this.line, this.column);
                        }
                    }
                    else if(this.op1?.tipo.getTipo() == tipos.DECIMAL){ // Decimal / algo
                        if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return parseFloat(left) / parseFloat(right); // Decimal / Entero
                        }
                        else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return parseFloat(left) / parseFloat(right); // Decimal / Decimal
                        }
                        else if(this.op2?.tipo.getTipo() == tipos.CARACTER){
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return parseFloat(left) / right.charCodeAt(0); // Decimal / Caracter
                        }
                        else{
                            return new Excepcion("Semántico", "Operandos erroneos para /", this.line, this.column);
                        }
                    }
                    else if(this.op1?.tipo.getTipo() == tipos.CARACTER){ //  Caracter / algo
                        if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return left.charCodeAt(0) / parseInt(right); // Caracter / Entero
                        }  
                        else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return left.charCodeAt(0) / parseFloat(right); // Caracter / Decimal
                        }
                        else{
                            return new Excepcion("Semántico", "Operandos erroneos para /", this.line, this.column);
                        } 
                    }
                    else{
                        return new Excepcion("Semántico", "Operandos erroneos para /", this.line, this.column);
                    }
                }
                else{
                    return new Excepcion("Semántico", "División entre cero", this.line, this.column);
                }
                break;
            case OperadorAritmetico.POTENCIA:
                if(this.op1?.tipo.getTipo() == tipos.ENTERO){ // Entero ^ algo
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.ENTERO);
                        return Math.pow(parseInt(left), parseInt(right)); // Entero ^ Entero
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Math.pow(parseInt(left), parseFloat(right)); // Entero ^ Entero
                    }
                    else{
                        return new Excepcion("Semántico", "Operandos erroneos para ^", this.line, this.column);
                    }
                }
                else if(this.op1?.tipo.getTipo() == tipos.DECIMAL){ // Decimal ^ algo
                    if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Math.pow(parseFloat(left), parseFloat(right)); // Decimal ^ Entero
                    }
                    else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                        this.tipo = new Tipo(tipos.DECIMAL);
                        return Math.pow(parseFloat(left), parseFloat(right)); // Decimal ^ Decimal
                    }
                    else{
                        return new Excepcion("Semántico", "Operandos erroneos para ^", this.line, this.column);
                    }
                }
                else{
                    return new Excepcion("Semántico", "Operandos erroneos para ^", this.line, this.column);
                }
                break;
            case OperadorAritmetico.MODULO:
                if( parseInt(right) != 0 || parseFloat(right) != 0){
                    if(this.op1?.tipo.getTipo() == tipos.ENTERO){ // Entero % algo
                        if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return parseInt(left) % parseInt(right); // Entero % Entero
                        }
                        else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return parseInt(left) % parseFloat(right); // Entero % Decimal
                        }
                        else{
                            return new Excepcion("Semántico", "Operandos erroneos para %", this.line, this.column);
                        }
                    }
                    else if(this.op1?.tipo.getTipo() == tipos.DECIMAL){ // Decimal % algo
                        if(this.op2?.tipo.getTipo() == tipos.ENTERO){
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return parseFloat(left) % parseFloat(right); // Decimal % Entero
                        }
                        else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){
                            this.tipo = new Tipo(tipos.DECIMAL);
                            return parseFloat(left) % parseFloat(right); // Decimal % Decimal
                        }
                        else{
                            return new Excepcion("Semántico", "Operandos erroneos para +", this.line, this.column);
                        }
                    }
                    else{
                        return new Excepcion("Semántico", "Operandos erroneos para %", this.line, this.column);
                    }
                }
                else{
                    return new Excepcion("Semántico", "Módulo entre cero", this.line, this.column);
                }
                break;
            case OperadorAritmetico.MENOSUNARIO:
                if(this.op2?.tipo.getTipo() == tipos.ENTERO){ // Unario Entero
                    this.tipo = new Tipo(tipos.ENTERO);
                    return -1 * parseInt(right); // Unario Entero 
                }
                else if(this.op2?.tipo.getTipo() == tipos.DECIMAL){ // Unario Decimal
                    this.tipo = new Tipo(tipos.ENTERO);
                    return -1 * parseFloat(right); // Unario Decimal 
                }
                else{
                    return new Excepcion("Semántico", "Operandos erroneos para unario", this.line, this.column);
                }
                break;
            default:
                return new Excepcion("Semántico","Tipo de Operación Erróneo.",this.line,this.column);
        }
    }

}

export enum OperadorAritmetico{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MENOSUNARIO,
    POTENCIA,
    MODULO
}