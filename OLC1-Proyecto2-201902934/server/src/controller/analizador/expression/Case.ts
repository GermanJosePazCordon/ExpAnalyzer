import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class Case extends Instruccion {

    private express: Instruccion;
    private listaInstruccion: Array<Instruccion>;

    constructor(line: Number, column: Number, express: Instruccion, listaIntruccion: Array<Instruccion>,) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.express = express;
        this.listaInstruccion = listaIntruccion;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        return this
    }

    public getExpresion(){
        return this.express;
    }

    public getInstrucciones(){
        return this.listaInstruccion;
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Case");
        nodo.adddHijo(this.express.getNodo());
        nodo.addHijo("lista de instrucciones");
        return nodo;
    }

}