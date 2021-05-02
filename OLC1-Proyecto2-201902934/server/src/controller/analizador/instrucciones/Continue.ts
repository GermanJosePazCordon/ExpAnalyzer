import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
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

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Tranferencia");
        nodo.addHijo("Continue");  
        nodo.addHijo(";");  
        return nodo;
    }

}