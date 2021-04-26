import { Instruccion } from '../abstract/Instruccion';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class Continue extends Instruccion {

    private continuee: Instruccion;

    constructor(line: Number, column: Number, continuee : Instruccion) {
        super(new Tipo(tipos.BREAK), line, column,);
        this.continuee = continuee;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        return this
    }

}