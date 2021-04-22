import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Primitivo from '../expression/Primitiva';

export default class Casteo extends Instruccion{

    private value : any;
    private operador : OperadorCasteo;

    constructor(line : Number, column : Number, operador : OperadorCasteo, value : any){
        super(new Tipo(tipos.CADENA),line, column);
        this.value = value;
        this.operador = operador;
    }

    public interpretar(tree : Arbol, table : tablaSimbolos){
        try{
            var valor = null;
            valor = this.value?.interpretar(tree,table);
            if(valor instanceof Excepcion) return valor;
    
            if(null != this.operador) switch (this.operador){
                case OperadorCasteo.ENTERO:
                    if(valor.tipo.getTipo() == tipos.DECIMAL){
                        return new Primitivo(new Tipo(tipos.ENTERO), parseInt(valor.value) + "", this.line, this.column);
                    }
                    else if(valor.tipo.getTipo() == tipos.CARACTER){
                        return new Primitivo(new Tipo(tipos.ENTERO), parseInt(valor.value.charCodeAt(0)) + "", this.line, this.column);
                    }
                    else{
                        return new Excepcion("Semántico","Tipos incompatibles para casteo",this.line,this.column);
                    }
                case OperadorCasteo.DECIMAL:
                    if(valor.tipo.getTipo() == tipos.ENTERO){
                        return new Primitivo(new Tipo(tipos.DECIMAL), parseFloat(valor.value) + ".0" , this.line, this.column);
                    }
                    else if(valor.tipo.getTipo() == tipos.CARACTER){
    
                        return new Primitivo(new Tipo(tipos.DECIMAL),  + parseFloat(valor.value.charCodeAt(0)) + ".0", this.line, this.column);
                    }
                    else{
                        return new Excepcion("Semántico","Tipos incompatibles para casteo",this.line,this.column);
                    }
                case OperadorCasteo.CARACTER:
                    if(valor.tipo.getTipo() == tipos.ENTERO){
                        return new Primitivo(new Tipo(tipos.CARACTER), String.fromCharCode(valor.value), this.line, this.column);
                    }
                    else{
                        return new Excepcion("Semántico","Tipos incompatibles para casteo",this.line,this.column);
                    }
                case OperadorCasteo.CADENA:
                    if(valor.tipo.getTipo() == tipos.ENTERO){
                        return new Primitivo(new Tipo(tipos.CADENA), valor.value + "", this.line, this.column);
                    }
                    else if(valor.tipo.getTipo() == tipos.DECIMAL){
                        return new Primitivo(new Tipo(tipos.CADENA), valor.value + "", this.line, this.column);
                    }
                    else{
                        return new Excepcion("Semántico","Tipos incompatibles para casteo",this.line,this.column);
                    }
                default:
                    return new Excepcion("Semántico","Tipo incompatible para casteo",this.line,this.column);
            }
        }
        catch{
            if(table.getVariable(this.value) != null){
                var val = table.getVariable(this.value);
                if(null != this.operador) switch (this.operador){
                    case OperadorCasteo.ENTERO:
                        if(val){
                            if(val.getTipo().getTipo() == tipos.DECIMAL){
                                return new Primitivo(new Tipo(tipos.ENTERO), parseInt(val.getValue()) + "", this.line, this.column);
                            }
                            else if(val.getTipo().getTipo() == tipos.CARACTER){
                                return new Primitivo(new Tipo(tipos.ENTERO), parseInt(valor.getValue().charCodeAt(0)) + "", this.line, this.column);
                            }
                            else{
                                return new Excepcion("Semántico","Tipos incompatibles para casteo",this.line,this.column);
                            }
                        }
                    case OperadorCasteo.DECIMAL:
                        if(val){
                            if(valor.getTipo().getTipo() == tipos.ENTERO){
                                return new Primitivo(new Tipo(tipos.DECIMAL), parseFloat(valor.getValue()) + ".0" , this.line, this.column);
                            }
                            else if(val.getTipo().getTipo() == tipos.CARACTER){
            
                                return new Primitivo(new Tipo(tipos.DECIMAL),  + parseFloat(valor.getValue().charCodeAt(0)) + ".0", this.line, this.column);
                            }
                            else{
                                return new Excepcion("Semántico","Tipos incompatibles para casteo",this.line,this.column);
                            }
                        }
                    case OperadorCasteo.CARACTER:
                        if(val){
                            if(val.getTipo().getTipo() == tipos.ENTERO){
                                return new Primitivo(new Tipo(tipos.CARACTER), String.fromCharCode(valor.getValue()), this.line, this.column);
                            }
                            else{
                                return new Excepcion("Semántico","Tipos incompatibles para casteo",this.line,this.column);
                            }
                        }
                    case OperadorCasteo.CADENA:
                        if(val){
                            if(val.getTipo().getTipo() == tipos.ENTERO){
                                return new Primitivo(new Tipo(tipos.CADENA), valor.getValue() + "", this.line, this.column);
                            }
                            else if(val.getTipo().getTipo() == tipos.DECIMAL){
                                return new Primitivo(new Tipo(tipos.CADENA), valor.getValue() + "", this.line, this.column);
                            }
                            else{
                                return new Excepcion("Semántico","Tipos incompatibles para casteo",this.line,this.column);
                            }
                        }
                    default:
                        return new Excepcion("Semántico","Tipo incompatible para casteo",this.line,this.column);
                }
            }
            else{
                return new Excepcion("Semántico","No existe la variable",this.line,this.column);
            }
        }
    }
    
}

export enum OperadorCasteo{
    ENTERO,
    DECIMAL,
    CARACTER,
    BOOLEAN,
    CADENA
}