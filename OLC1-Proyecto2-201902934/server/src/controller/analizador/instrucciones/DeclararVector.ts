import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Arbol from '../tablaSimbolos/Arbol';
import Simbolo from '../tablaSimbolos/Simbolo';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class DeclararVector extends Instruccion {

    private tipo1: tipos;
    private id: String;
    private tipo2?: tipos;
    private express?: Instruccion;
    private listaValores: Array<Instruccion>;

    constructor(line: Number, column: Number, tipo1: tipos, id: String, tipo2?: tipos, express?: Instruccion, listaValores?: Array<Instruccion>) {
        super(new Tipo(tipos.VECTOR), line, column,);
        this.tipo1 = tipo1;
        this.id = id.toLowerCase();
        this.tipo2 = tipo2;
        this.express = express
        if (listaValores) {
            this.listaValores = listaValores;
        } else {
            this.listaValores = [];
        }
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        if (this.listaValores.length == 0) {
            var tamaño = null;
            tamaño = this.express?.interpretar(tree, table);
            if (tamaño instanceof Excepcion) return tamaño;
            if (tamaño.tipo.getTipo() != tipos.ENTERO) {
                return new Excepcion("Semántico", "Tamaño de vector invalido", this.line, this.column);
            }
            if (this.tipo1 != this.tipo2) {
                return new Excepcion("Semántico", "No concuerdan los tipos", this.line, this.column);
            }
            if (table.getVariable(this.id)) {
                return new Excepcion("Semántico", "ID utilizado en otra declaracion", this.line, this.column);
            }
            let vector = new Array(parseInt(tamaño.value));
            vector = this.llenarVector(vector);
            var sim = new Simbolo(new Tipo(this.tipo1), this.id, vector, new Tipo(tipos.VECTOR));
            table.setVariable(sim);
        } else {
            let vector = new Array(this.listaValores.length);
            var valor = null;
            for (let i = 0; i < vector.length; i++) {
                if (this.listaValores[i].interpretar(tree, table).tipo.getTipo() != this.tipo1) {
                    return new Excepcion("Semántico", "No concuerdan los tipos", this.line, this.column);
                }
                valor = this.listaValores[i].interpretar(tree, table).value;
                vector[i] = valor;
            }
            var sim = new Simbolo(new Tipo(this.tipo1), this.id, vector, new Tipo(tipos.VECTOR));
            table.setVariable(sim);
        }
    }

    public llenarVector(vector: any) {
        if (this.tipo1 == tipos.ENTERO) {
            for (let i = 0; i < vector.length; i++) {
                vector[i] = "0";
            }
            return vector;
        } else if (this.tipo1 == tipos.DECIMAL) {
            for (let i = 0; i < vector.length; i++) {
                vector[i] = "0.0";
            }
            return vector;
        } else if (this.tipo1 == tipos.BOOLEAN) {
            for (let i = 0; i < vector.length; i++) {
                vector[i] = "true";
            }
            return vector;
        } else if (this.tipo1 == tipos.CADENA) {
            for (let i = 0; i < vector.length; i++) {
                vector[i] = '""';
            }
            return vector;
        } else if (this.tipo1 == tipos.CARACTER) {
            for (let i = 0; i < vector.length; i++) {
                vector[i] = '\u0000';
            }
            return vector;
        }
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
        let nodo : nodoAST = new nodoAST("Declarar\nVector");
        nodo.addHijo(opera);
        nodo.addHijo("[    ]");
        nodo.addHijo(this.id);
        nodo.addHijo("=");
        if(this.listaValores.length == 0){
            nodo.addHijo("new");
            nodo.addHijo(opera);
            nodo.addHijo("[");
            if(this.express){
                nodo.adddHijo(this.express.getNodo());
            }
            nodo.addHijo("]");
            nodo.addHijo(";");
        }else{
            nodo.addHijo("{");
            for(let i of this.listaValores){
                nodo.adddHijo(i.getNodo())
            }
            nodo.addHijo("}");
        }
        return nodo;
    }
}