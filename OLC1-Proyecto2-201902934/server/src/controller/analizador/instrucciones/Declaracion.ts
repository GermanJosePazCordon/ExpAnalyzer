import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Arbol from '../tablaSimbolos/Arbol';
import Simbolo from '../tablaSimbolos/Simbolo';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';


export default class Declaracion extends Instruccion{

    //private type : Tipo;
    private id : String;
    private value : any;
    private operador : OperadorDeclaracion;

    constructor(line : Number, column : Number, operador : OperadorDeclaracion, id : String, value? : any){
        super(new Tipo(tipos.CADENA),line, column);
        this.operador = operador;
        this.id = id.toLowerCase();
        if(value){
            this.value = value;
        }else{
            this.value = null
        }
    }

    public interpretar(tree : Arbol, table : tablaSimbolos){
        //console.log(this.value);
        var valor = null;
        if(this.value){
            valor = this.value.interpretar(tree,table);
            if(valor instanceof Excepcion) return valor;
        }
        if(valor){
            if(null != this.operador) switch (this.operador){
                case OperadorDeclaracion.ENTERO:
                    if(tipos.ENTERO == valor.tipo.getTipo()){
                        if(this.existe(table, valor.tipo, valor.value)){
                            tree.addError(new Excepcion("Semántico", "Variable previamente declarada", this.line, this.column));
                            return new Excepcion("Semántico","Variable previamente declarada",this.line,this.column);
                        }
                        table.setVariable( new Simbolo(this.line, this.column, valor.tipo, this.id, valor.value));
                    }
                    else{
                        tree.addError(new Excepcion("Semántico", "Tipos incompatibles", this.line, this.column));
                        return new Excepcion("Semántico","Tipos incompatibles",this.line,this.column);
                    }
                    break;
                case OperadorDeclaracion.DECIMAL:
                    if(tipos.DECIMAL == valor.tipo.getTipo() || tipos.ENTERO == valor.tipo.getTipo()){
                        if(this.existe(table, new Tipo(tipos.DECIMAL), valor.value)){
                            tree.addError(new Excepcion("Semántico", "Variable previamente declarada", this.line, this.column));
                            return new Excepcion("Semántico","Variable previamente declarada",this.line,this.column);
                        }
                        table.setVariable( new Simbolo(this.line, this.column, valor.tipo, this.id, valor.value));
                    }
                    else{
                        tree.addError(new Excepcion("Semántico", "Tipos incompatibles", this.line, this.column));
                        return new Excepcion("Semántico","Tipos incompatibles",this.line,this.column);
                    }
                    break;
                case OperadorDeclaracion.BOOLEAN:
                    if(tipos.BOOLEAN == valor.tipo.getTipo()){
                        if(this.existe(table, valor.tipo, valor.value)){
                            tree.addError(new Excepcion("Semántico", "Variable previamente declarada", this.line, this.column));
                            return new Excepcion("Semántico","Variable previamente declarada",this.line,this.column);
                        }
                        table.setVariable( new Simbolo(this.line, this.column, valor.tipo, this.id, valor.value));
                    }
                    else{
                        tree.addError(new Excepcion("Semántico", "Tipos incompatibles", this.line, this.column));
                        return new Excepcion("Semántico","Tipos incompatibles",this.line,this.column);
                    }
                    break;
                case OperadorDeclaracion.CADENA:
                    if(tipos.CADENA == valor.tipo.getTipo()){
                        if(this.existe(table, valor.tipo, valor.value)){
                            tree.addError(new Excepcion("Semántico", "Variable previamente declarada", this.line, this.column));
                            return new Excepcion("Semántico","Variable previamente declarada",this.line,this.column);
                        }
                        table.setVariable( new Simbolo(this.line, this.column, valor.tipo, this.id, valor.value));
                    }
                    else{
                        tree.addError(new Excepcion("Semántico", "Tipos incompatibles", this.line, this.column));
                        return new Excepcion("Semántico","Tipos incompatibles",this.line,this.column);
                    }
                    break;
                case OperadorDeclaracion.CARACTER:
                    if(tipos.CARACTER == valor.tipo.getTipo()){
                        if(this.existe(table, valor.tipo, valor.value)){
                            tree.addError(new Excepcion("Semántico", "Variable previamente declarada", this.line, this.column));
                            return new Excepcion("Semántico","Variable previamente declarada",this.line,this.column);
                        }
                        table.setVariable( new Simbolo(this.line, this.column, valor.tipo, this.id, valor.value));
                    }
                    else{
                        tree.addError(new Excepcion("Semántico", "Tipos incompatibles", this.line, this.column));
                        return new Excepcion("Semántico","Tipos incompatibles",this.line,this.column);
                    }
                    break;
                default:
                    tree.addError(new Excepcion("Semántico", "Tipos no existente", this.line, this.column));
                    return new Excepcion("Semántico","Tipo no existente.",this.line,this.column);
            }
        }
        else{
            if(null != this.operador) switch (this.operador){
                case OperadorDeclaracion.ENTERO:
                    if(this.existe(table, new Tipo(tipos.ENTERO), "0")){
                        tree.addError(new Excepcion("Semántico", "Variable previamente declarada", this.line, this.column));
                        return new Excepcion("Semántico","Variable previamente declarada",this.line,this.column); 
                    }
                    table.setVariable( new Simbolo(this.line, this.column, new Tipo(tipos.ENTERO), this.id, "0"));
                    break;
                case OperadorDeclaracion.DECIMAL:
                    if(this.existe(table, new Tipo(tipos.DECIMAL), "0.0")){
                        tree.addError(new Excepcion("Semántico", "Variable previamente declarada", this.line, this.column));
                        return new Excepcion("Semántico","Variable previamente declarada",this.line,this.column); 
                    }
                    table.setVariable( new Simbolo(this.line, this.column, new Tipo(tipos.DECIMAL), this.id, "0.0"));
                    break;
                case OperadorDeclaracion.BOOLEAN:
                    if(this.existe(table, new Tipo(tipos.BOOLEAN), "true")){
                        tree.addError(new Excepcion("Semántico", "Variable previamente declarada", this.line, this.column));
                        return new Excepcion("Semántico","Variable previamente declarada",this.line,this.column); 
                    }
                    table.setVariable( new Simbolo(this.line, this.column, new Tipo(tipos.BOOLEAN), this.id, "true"));
                    break;
                case OperadorDeclaracion.CADENA:
                    if(this.existe(table, new Tipo(tipos.CADENA), '""')){
                        tree.addError(new Excepcion("Semántico", "Variable previamente declarada", this.line, this.column));
                        return new Excepcion("Semántico","Variable previamente declarada",this.line,this.column); 
                    }
                    table.setVariable( new Simbolo(this.line, this.column, new Tipo(tipos.CADENA), this.id, '""'));
                    break;
                case OperadorDeclaracion.CARACTER:
                    if(this.existe(table, new Tipo(tipos.CARACTER), '\u0000')){
                        tree.addError(new Excepcion("Semántico", "Variable previamente declarada", this.line, this.column));
                        return new Excepcion("Semántico","Variable previamente declarada",this.line,this.column); 
                    }
                    table.setVariable( new Simbolo(this.line, this.column, new Tipo(tipos.CARACTER), this.id, '\u0000'));
                    break;
                default:
                    tree.addError(new Excepcion("Semántico", "Tipos no existente", this.line, this.column));
                    return new Excepcion("Semántico","Tipo no existente.",this.line,this.column);
            }
        }
    }

    public existe(table : tablaSimbolos, type : Tipo, value : any){  
        if(value != null){       
            if(table.setVariable( new Simbolo(this.line, this.column, type, this.id, value)) != "LA VARIABLE "+ this.id + " SE CREO EXITOSAMENTE."){
                return true;   
            }
        }else{
            if(table.setVariable( new Simbolo(this.line, this.column, type, this.id, value)) != "LA VARIABLE "+ this.id + " SE CREO EXITOSAMENTE."){
                return true;
            }
        }
        
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Declarar\nVariable");
        var opera = "";
        if (null != this.operador) switch (this.operador) {
            case OperadorDeclaracion.BOOLEAN:
                opera = "boolean";
                break;
            case OperadorDeclaracion.CADENA:
                opera = "string";
                break;
            case OperadorDeclaracion.CARACTER:
                opera = "char";
                break;
            case OperadorDeclaracion.DECIMAL:
                opera = "double";
                break;
            case OperadorDeclaracion.ENTERO:
                opera = "int";
                break;
        }
        nodo.addHijo(opera);
        nodo.addHijo(this.id);
        if(this.value){
            nodo.addHijo("=");
            nodo.adddHijo(this.value.getNodo());
        }
        nodo.addHijo(";");
        return nodo;
    }
    
}
export enum OperadorDeclaracion{
    ENTERO,
    DECIMAL,
    CARACTER,
    BOOLEAN,
    CADENA
}