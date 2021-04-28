import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo from '../tablaSimbolos/Tipo';


export default class Primitivo extends Instruccion{

    private value: any;
    private tipoVec? : Tipo;

    constructor(tipo : Tipo, value : any, line : Number, column : Number, tipoVec? : Tipo){
        super(tipo, line, column);
        this.value = value;
        this.tipoVec = tipoVec;
    }

    public interpretar(tree : Arbol, table : tablaSimbolos){
        return this;
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Primitivo");
        nodo.addHijo(this.value.toString());
        return nodo;
    }
}