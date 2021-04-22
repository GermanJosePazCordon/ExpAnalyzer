import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
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
        console.log(this.value);
        var valor = null;
        valor = this.value?.interpretar(tree,table);
        if(valor instanceof Excepcion) return valor;
        if(table.getVariable(this.id.toLowerCase()) != null){
            var variables = table.getVariable(this.id);
            if(variables){
                if(variables.getTipo().getTipo() == valor.tipo.getTipo()){
                    //console.log(valor);
                    variables.setValue(valor.value);
                }else{
                    return new Excepcion("Semántico","Tipos incompatibles",this.line,this.column);
                }
            }
        }
        else{
            return new Excepcion("Semántico","No existe la varible",this.line,this.column);
        }
        
    }
    
}