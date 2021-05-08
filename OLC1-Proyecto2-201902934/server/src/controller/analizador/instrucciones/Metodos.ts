import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Parametros from './Parametros';
import Declaracion from './Declaracion';
import Simbolo from '../tablaSimbolos/Simbolo';
import { nodoAST } from '../abstract/NodoAST';

export default class Metodos extends Instruccion {

    private id: String;
    private instrucciones: Array<Instruccion>;
    private parametros: Array<Parametros>;

    constructor(line: Number, column: Number, id: String, instrucciones: Array<Instruccion>, parametros?: Array<Parametros>) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.id = id.toLowerCase() + "2776871601601";
        this.instrucciones = instrucciones;
        if (parametros) {
            this.parametros = parametros;
        } else {
            this.parametros = [];
        }
    }

    public interpretar(ast: Arbol, table: tablaSimbolos) {
        if (table.getVariable(this.id)) {
            ast.addError(new Excepcion("Semántico", "Metodo previamente declarada", this.line, this.column));
            return new Excepcion("Semántico", "Metodo previamente declarado", this.line, this.column);
        } else {
            //Validando parametros repetidos
            var unicos: any[] = [];
            for (let i of this.parametros) {
                var elemento = i.getID();
                if (!unicos.includes(i.getID())) { unicos.push(elemento); }
            }
            if (unicos.length != this.parametros.length) {
                ast.addError(new Excepcion("Semántico", "Parametros repetidos", this.line, this.column));
                return new Excepcion("Semántico", "Parametros repetidos", this.line, this.column);
            } else {
                var sim = new Simbolo(this.line, this.column, new Tipo(tipos.METODO), this.id, Metodo(this.parametros, this.instrucciones));
                table.setVariable(sim);
            }
        }
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Metodo");
        nodo.addHijo("Void");
        let temp = this.id.split("2776871601601");
        nodo.addHijo(temp[0]);
        nodo.addHijo("(");
        if(this.parametros.length != 0){
            for(let i of this.parametros){
                nodo.adddHijo(i.getNodo())
            }
        }
        nodo.addHijo(")");
        nodo.addHijo("{");
        for(let i of this.instrucciones){
            if(i instanceof Excepcion){
                nodo.addHijo("Error\nSintactico");
                continue;
            }
            nodo.adddHijo(i.getNodo())
        }
        nodo.addHijo("}");
        return nodo;
    }
}

const Metodo = function (parametros: any, instrucciones: any) {
    return {
        parametros: parametros,
        instrucciones: instrucciones,
    }
}