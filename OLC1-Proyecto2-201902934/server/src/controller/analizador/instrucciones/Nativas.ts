import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Primitivo from '../expression/Primitiva';

export default class Nativas extends Instruccion{

    private operador : OperadorNativas;
    private express : Instruccion;

    constructor(line : Number, column : Number, operador : OperadorNativas, express : Instruccion){
        super(new Tipo(tipos.CADENA),line, column);
        this.operador = operador;
        this.express = express;
    }

    public interpretar(tree : Arbol, table : tablaSimbolos){
        var valor = null;
        valor =  this.express.interpretar(tree,table);
        if(valor instanceof Excepcion) return valor;
        if (null != this.operador) switch (this.operador) {
            case OperadorNativas.TOLOWER:
                if(valor.tipo.getTipo() == tipos.CADENA){
                    return new Primitivo(valor.tipo, valor.value.toLowerCase(), this.line, this.column);
                }else{
                    return new Excepcion("Semántico", "Tipo de expresion invalido para toLower", this.line, this.column);
                }
                break;
            case OperadorNativas.TOUPPER:
                if(valor.tipo.getTipo() == tipos.CADENA){
                    return new Primitivo(valor.tipo, valor.value.toUpperCase(), this.line, this.column);
                }else{
                    return new Excepcion("Semántico", "Tipo de expresion invalido para toUpper", this.line, this.column);
                }
                break;
            case OperadorNativas.LENGTH:
                if(valor.tipo.getTipo() == tipos.CADENA){
                    return new Primitivo(new Tipo(tipos.ENTERO), valor.value.length, this.line, this.column);
                }else{
                    return new Excepcion("Semántico", "Tipo de valor invalido para length", this.line, this.column);
                }
                break;
            case OperadorNativas.TRUNCATE:
                if(valor.tipo.getTipo() == tipos.ENTERO){
                    return new Primitivo(new Tipo(tipos.ENTERO), Math.trunc(valor.value), this.line, this.column);
                }else if(valor.tipo.getTipo() == tipos.DECIMAL){
                    return new Primitivo(new Tipo(tipos.ENTERO), Math.trunc(valor.value), this.line, this.column);
                }else{
                    return new Excepcion("Semántico", "Tipo de valor invalido para truncate", this.line, this.column);
                }
                break;
            case OperadorNativas.ROUND:
                if(valor.tipo.getTipo() == tipos.ENTERO){
                    return new Primitivo(new Tipo(tipos.ENTERO), Math.round(valor.value), this.line, this.column);
                }else if(valor.tipo.getTipo() == tipos.DECIMAL){
                    return new Primitivo(new Tipo(tipos.ENTERO), Math.round(valor.value), this.line, this.column);
                }else{
                       return new Excepcion("Semántico", "Tipo de valor invalido para truncate", this.line, this.column);
                }
                break;
            case OperadorNativas.TYPEOF:
                if(valor.tipo.getTipo() == tipos.ENTERO){
                    return new Primitivo(new Tipo(tipos.CADENA), "int", this.line, this.column);
                }else if(valor.tipo.getTipo() == tipos.DECIMAL){
                    return new Primitivo(new Tipo(tipos.CADENA), "double", this.line, this.column);
                }else if(valor.tipo.getTipo() == tipos.BOOLEAN){
                    return new Primitivo(new Tipo(tipos.CADENA), "boolean", this.line, this.column);
                }else if(valor.tipo.getTipo() == tipos.CARACTER){
                    return new Primitivo(new Tipo(tipos.CADENA), "char", this.line, this.column);
                }else if(valor.tipo.getTipo() == tipos.CADENA){
                    return new Primitivo(new Tipo(tipos.CADENA), "string", this.line, this.column);
                }else{
                    return new Excepcion("Semántico", "Tipo de valor no valido para typeof", this.line, this.column);
                }
                break;
            case OperadorNativas.TOSTRING:
                if(valor.tipo.getTipo() == tipos.ENTERO){
                    return new Primitivo(new Tipo(tipos.CADENA), valor.value.toString(), this.line, this.column);
                }else if(valor.tipo.getTipo() == tipos.DECIMAL){
                    return new Primitivo(new Tipo(tipos.CADENA), valor.value.toString(), this.line, this.column);
                }else if(valor.tipo.getTipo() == tipos.BOOLEAN){
                    return new Primitivo(new Tipo(tipos.CADENA), valor.value.toString(), this.line, this.column);
                }else{
                    return new Excepcion("Semántico", "Tipo de valor no valido para toString", this.line, this.column);
                }
            default:
                return new Excepcion("Semántico", "Tipo de funcion no valido", this.line, this.column);
        }
    }
    
}

export enum OperadorNativas{
    TOLOWER,
    TOUPPER,
    LENGTH,
    TRUNCATE,
    ROUND,
    TYPEOF,
    TOSTRING,
    TOCHARARRAY
}