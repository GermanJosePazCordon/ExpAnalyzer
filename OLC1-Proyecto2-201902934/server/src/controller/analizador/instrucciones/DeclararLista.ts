import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Arbol from '../tablaSimbolos/Arbol';
import Simbolo from '../tablaSimbolos/Simbolo';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class DeclararLista extends Instruccion {

    private tipo1 : tipos;
    private id : String;
    private tipo2 : tipos;

    constructor(line: Number, column: Number, tipo1 : tipos, id : String, tipo2 : tipos) {
        super(new Tipo(tipos.VECTOR), line, column,);
        this.tipo1 = tipo1;
        this.id = id.toLowerCase();
        this.tipo2 = tipo2;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        if(this.tipo1 != this.tipo2){
            return new Excepcion("Semántico", "No concuerdan los tipos", this.line, this.column);
        }
        if (table.getVariable(this.id)) {
            return new Excepcion("Semántico", "ID utilizado en otra declaracion", this.line, this.column);
        }
        let lista = new Array();
        var sim = new Simbolo(new Tipo(this.tipo1), this.id, lista, new Tipo(tipos.LISTA));
        table.setVariable(sim);
    }
}