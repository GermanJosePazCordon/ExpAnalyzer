import { Instruccion } from '../abstract/Instruccion';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo from '../tablaSimbolos/Tipo';


export default class Primitivo extends Instruccion{

    private value: any;


    constructor(tipo : Tipo, value : any, line : Number, column : Number){
        super(tipo, line, column);
        this.value = value;
    }

    public interpretar(tree : Arbol, table : tablaSimbolos){
        return this;
    }
}