import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class Parametros extends Instruccion {

    private tipoParametro : tipos;
    private id : String;
    
    constructor(line: Number, column: Number, tipoParametro : tipos, id : String) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.tipoParametro = tipoParametro;
        this.id = id.toLowerCase();
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        return this;
    }

    public getTipo(){
        return this.tipoParametro;
    }

    public getID(){
        return this.id;
    }
}