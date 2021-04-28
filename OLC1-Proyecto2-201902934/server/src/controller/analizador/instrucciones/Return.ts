import { Instruccion } from '../abstract/Instruccion';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class Return extends Instruccion {

    private express : any;

    constructor(line: Number, column: Number, express? : Instruccion) {
        super(new Tipo(tipos.RETURN), line, column,);
        if(express){
            this.express = express;
        }else{
            this.express =  null;
        }
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        //console.log(this.express);
        //stop
        if(this.express){
            return this.express.interpretar(tree, table);
        }else{
            return this
        }
        
    }

}