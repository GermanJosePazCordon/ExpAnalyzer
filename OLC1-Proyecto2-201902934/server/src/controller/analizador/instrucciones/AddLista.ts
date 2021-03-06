import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Arbol from '../tablaSimbolos/Arbol';
import Simbolo from '../tablaSimbolos/Simbolo';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class AddLista extends Instruccion {

    private id : String;
    private express : Instruccion;

    constructor(line: Number, column: Number, id : String, express : Instruccion) {
        super(new Tipo(tipos.VECTOR), line, column,);
        this.id = id.toLowerCase();
        this.express = express;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        var lista = null, valor = null;
        lista = table.getVariable(this.id);
        if(lista){
            valor = this.express.interpretar(tree, table);
            if (valor instanceof Excepcion) return valor;
            if(valor.tipo.getTipo() != lista.getTipo().getTipo()){
                tree.addError(new Excepcion("Semántico", "Tipo de valor incorrecto", this.line, this.column));
                return new Excepcion("Semántico", "Tipo de valor incorrecto", this.line, this.column);
            }
            let temp = lista.getValue();
            temp.push(valor.value);
            lista.setValue(temp);
        }else{
            tree.addError(new Excepcion("Semántico", "Lista no declarada", this.line, this.column));
            return new Excepcion("Semántico", "Lista no declarada", this.line, this.column);
        }
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Add Valor\nLista");
        nodo.addHijo(this.id);
        nodo.addHijo(".");
        nodo.addHijo("Add");
        nodo.addHijo("(");
        nodo.adddHijo(this.express.getNodo());
        nodo.addHijo(")");
        nodo.addHijo(";");
        return nodo;
    }
}