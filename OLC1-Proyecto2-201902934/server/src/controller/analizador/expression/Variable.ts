import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Primitivo from '../expression/Primitiva';
import { nodoAST } from '../abstract/NodoAST';


export default class Variable extends Instruccion{

    private id : String;

    constructor(line : Number, column : Number, id : String,){
        super(new Tipo(tipos.VARIABLE),line, column);
        this.id = id.toLowerCase();
    }

    public interpretar(tree : Arbol, table : tablaSimbolos){
        var variable = table.getVariable(this.id);
        if(variable){
            if(variable){
                this.tipo = variable.getTipo();
                return new Primitivo(variable.getTipo(), variable.getValue(), this.line, this.column);
            }
        }else{
            tree.addError(new Excepcion("Semántico", "No existe la variable", this.line, this.column));
            return new Excepcion("Semántico","No existe la variable",this.line,this.column);
        }
    }

    public getID(){
        return this.id;
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Variable");
        nodo.addHijo(this.id.toString());
        return nodo;
    }
    
}