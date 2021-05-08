import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Variable from '../expression/Variable';
import Arbol from '../tablaSimbolos/Arbol';
import Simbolo from '../tablaSimbolos/Simbolo';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import LlamadaFunciones from './LlamadaFunciones';
import Return from './Return';

export default class Exec extends Instruccion {

    private id: String;
    private parametros: Array<Instruccion>;

    constructor(line: Number, column: Number, id: String, parametros?: Array<Instruccion>) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.id = id.toLowerCase();
        if (parametros) {
            this.parametros = parametros;
        } else {
            this.parametros = [];
        }
    }

    public interpretar(ast: Arbol, table: tablaSimbolos) {
        if(this.parametros.length == 0){
            let llamada = new LlamadaFunciones(this.line, this.column, this.id, []);
            return llamada.interpretar(ast, table);
        }else{
            let llamada = new LlamadaFunciones(this.line, this.column, this.id, this.parametros);
            return llamada.interpretar(ast, table);
        }   
    }

    public getNodo(): nodoAST {
        let nodo: nodoAST = new nodoAST("Exec");
        let temp = this.id.split("2776871601601");
        nodo.addHijo(temp[0]);
        nodo.addHijo("(");
        if (this.parametros.length != 0) {
            for (let i of this.parametros) {
                nodo.adddHijo(i.getNodo())
            }
        }
        nodo.addHijo(")");
        nodo.addHijo(";");
        return nodo;
    }
}


