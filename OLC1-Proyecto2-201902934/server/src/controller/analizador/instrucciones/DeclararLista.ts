import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
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
            tree.addError(new Excepcion("Semántico", "No concuerdan los tipos", this.line, this.column));
            return new Excepcion("Semántico", "No concuerdan los tipos", this.line, this.column);
        }
        if (table.getVariable(this.id)) {
            tree.addError(new Excepcion("Semántico", "ID utilizado en otra declaracion", this.line, this.column));
            return new Excepcion("Semántico", "ID utilizado en otra declaracion", this.line, this.column);
        }
        let lista = new Array();
        var sim = new Simbolo(this.line, this.column, new Tipo(this.tipo1), this.id, lista, new Tipo(tipos.LISTA));
        table.setVariable(sim);
    }

    public getNodo() : nodoAST{
        var opera = "";
        if (null != this.tipo1) switch (this.tipo1) {
            case 0:
                opera = "int";
                break;
            case 1:
                opera = "double";
                break;
            case 2:
                opera = "char";
                break;
            case 3:
                opera = "boolean";
                break;
            case 4:
                opera = "string";
                break;
        }
        let nodo : nodoAST = new nodoAST("Declarar\nLista");
        nodo.addHijo("List");
        nodo.addHijo("<");
        nodo.addHijo(opera);
        nodo.addHijo(">");
        nodo.addHijo(this.id);
        nodo.addHijo("=");
        nodo.addHijo("New");
        nodo.addHijo("List");
        nodo.addHijo("<");
        nodo.addHijo(opera);
        nodo.addHijo(">");
        nodo.addHijo(";");
        return nodo;
    }
}