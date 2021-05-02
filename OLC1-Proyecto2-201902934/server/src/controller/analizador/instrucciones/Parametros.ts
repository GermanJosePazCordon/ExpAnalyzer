import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class Parametros extends Instruccion {

    private tipoParametro : tipos;
    private id : String;
    
    constructor(line: Number, column: Number, tipoParametro : tipos, id : String) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.tipoParametro = tipoParametro;
        this.id = id.toLowerCase();
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        return this;
    }

    public getTipo(){
        return this.tipoParametro;
    }

    public getID(){
        return this.id;
    }

    public getNodo() : nodoAST{
        var opera = "";
        if (null != this.tipoParametro) switch (this.tipoParametro) {
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
        let nodo : nodoAST = new nodoAST("Parametros\nFuncion");
        nodo.addHijo(opera);
        nodo.addHijo(this.id);
        return nodo;
    }
}