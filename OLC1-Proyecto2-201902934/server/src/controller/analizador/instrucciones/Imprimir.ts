import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';


export default class Imprimir extends Instruccion{

    private expresion : Instruccion;

    constructor(expresion : Instruccion, line : Number, column : Number){
        super(new Tipo(tipos.CADENA),line, column);
        this.expresion = expresion;
    }

    public interpretar(tree : Arbol, table : tablaSimbolos){
        var value = this.expresion.interpretar(tree, table); //OBTIENE EL VALOR

        if(value instanceof Excepcion) return value;

        tree.updateConsola(value+"");
    }
    
}