import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class Incrementador extends Instruccion {

    private express: String;

    constructor(line: Number, column: Number, express: String) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.express = express;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        console.log(this.express);
        var variable = table.getVariable(this.express);
        if(variable){
            if(variable.getTipo().getTipo() == tipos.ENTERO){
                var result = parseInt(variable.getValue()) + 1;
                variable.setValue(result.toString());
            }
            else if(variable.getTipo().getTipo() == tipos.DECIMAL){
                var result = parseFloat(variable.getValue()) + 1;
                variable.setValue(result.toString());
            }
            else{
                return new Excepcion("Semántico","Tipo incompatible para incremento",this.line,this.column);
            }
        }else{
            return new Excepcion("Semántico","Variable no existe",this.line,this.column);
        }
    }

}