import { Instruccion } from '../abstract/Instruccion';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class Break extends Instruccion {

    private breakk: Instruccion;

    constructor(line: Number, column: Number, breakk : Instruccion) {
        super(new Tipo(tipos.BREAK), line, column,);
        this.breakk = breakk;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        return this
    }

}