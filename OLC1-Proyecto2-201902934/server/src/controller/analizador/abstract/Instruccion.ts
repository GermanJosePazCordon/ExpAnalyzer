import Tipo from '../tablaSimbolos/Tipo';
import Arbol from '../tablaSimbolos/Arbol';
import TablaSimbolos from '../tablaSimbolos/TablaSimbolos';

export abstract class Instruccion {

    public tipo : Tipo;
    public line : Number;
    public column : Number;

    constructor(tipo : Tipo, line : Number, column : Number) {
        this.tipo = tipo;
        this.line = line;
        this.column = column;
    }

    abstract interpretar(arbol: Arbol, tabla: TablaSimbolos):any;
    // TODO graficar AST
}