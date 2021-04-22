import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Primitivo from '../expression/Primitiva';


export default class Variable extends Instruccion{

    private id : String;

    constructor(line : Number, column : Number, id : String,){
        super(new Tipo(tipos.CADENA),line, column);
        this.id = id.toLowerCase();
    }

    public interpretar(tree : Arbol, table : tablaSimbolos){
        //console.log(table.getVariable(this.id));
        if(table.getVariable(this.id)){
            var variable = table.getVariable(this.id);
            if(variable){
                this.tipo = variable.getTipo();
                //console.log(table.getTable());
                return new Primitivo(variable.getTipo(), variable.getValue(), this.line, this.column);
            }
        }else{
            return new Excepcion("Semántico","No existe la variable",this.line,this.column);
        }
    }

    public getID(){
        return this.id;
    }
    
}