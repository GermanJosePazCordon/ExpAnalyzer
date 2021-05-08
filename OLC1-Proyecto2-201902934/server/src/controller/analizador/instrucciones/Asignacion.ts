import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class Asignacion extends Instruccion{

    
    private id : String;
    private value : any;

    constructor(line : Number, column : Number, id : String, value : any){
        super(new Tipo(tipos.CADENA),line, column);
        this.id = id.toLowerCase();
        this.value = value;
    }

    public interpretar(tree : Arbol, table : tablaSimbolos){
        var valor = null;
        if(this.value){
            valor =  this.value.interpretar(tree,table);
            if(valor instanceof Excepcion) return valor;
        }
        if(table.getVariable(this.id.toLowerCase()) != null){
            var variables = table.getVariable(this.id);
            if(variables){
                if(variables.getTipo().getTipo() == tipos.DECIMAL){
                    if(valor.tipo.getTipo() == tipos.ENTERO || valor.tipo.getTipo() == tipos.DECIMAL){
                        variables.setValue(valor.value);
                    }else{
                        tree.addError(new Excepcion("Semántico", "Tipos incompatibles", this.line, this.column));
                        return new Excepcion("Semántico","Tipos incompatibles",this.line,this.column);
                    }
                }else{
                    if(variables.getTipo().getTipo() == valor.tipo.getTipo()){
                        variables.setValue(valor.value);
                    }else{
                        tree.addError(new Excepcion("Semántico", "Tipos incompatibles", this.line, this.column));
                        return new Excepcion("Semántico","Tipos incompatibles",this.line,this.column);
                    }
                }
            }
        }
        else{
            tree.addError(new Excepcion("Semántico", "No existe la varible", this.line, this.column));
            return new Excepcion("Semántico","No existe la varible",this.line,this.column);
        }
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Asigar\nVariable");
        nodo.addHijo(this.id);
        nodo.addHijo("=");
        nodo.adddHijo(this.value.getNodo());
        nodo.addHijo(";"); 
        return nodo;
    }
    
}