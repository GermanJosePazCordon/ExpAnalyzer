import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Arbol from '../tablaSimbolos/Arbol';
import Simbolo from '../tablaSimbolos/Simbolo';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class ToCharArray extends Instruccion {

    private type : tipos;
    private id : String;
    private express : Instruccion;

    constructor(line: Number, column: Number, type : tipos, id : String, express : Instruccion) {
        super(new Tipo(tipos.VECTOR), line, column,);
        this.type = type;
        this.id = id.toLowerCase();
        this.express = express;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        var valor = null;
        if(this.type != tipos.CARACTER){
            tree.addError(new Excepcion("Semántico", "Tipo de valor no valido para toCharArray", this.line, this.column));
            return new Excepcion("Semántico", "Tipo de valor no valido para toCharArray", this.line, this.column);
        }
        if (table.getVariable(this.id)) {
            tree.addError(new Excepcion("Semántico", "ID utilizado en otra declaracion", this.line, this.column));
            return new Excepcion("Semántico", "ID utilizado en otra declaracion", this.line, this.column);
        }
        valor = this.express?.interpretar(tree, table);
        if (valor instanceof Excepcion) return valor;
        if (valor.tipo.getTipo() != tipos.CADENA) {
            tree.addError(new Excepcion("Semántico", "Tipo de valor no valido para toCharArray", this.line, this.column));
            return new Excepcion("Semántico", "Tipo de valor no valido para toCharArray", this.line, this.column);
        }
        let lista = new Array();
        lista = Array.from(valor.value);
        var sim = new Simbolo(this.line, this.column, new Tipo(tipos.CARACTER), this.id, lista, new Tipo(tipos.LISTA));
        table.setVariable(sim);
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("toCharArray");
        nodo.addHijo("List");
        nodo.addHijo("<");
        nodo.addHijo("char");
        nodo.addHijo(">");
        nodo.addHijo(this.id);
        nodo.addHijo("=");
        nodo.adddHijo(this.express.getNodo());
        nodo.addHijo(";")
        return nodo;
    }
}