import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Variable from '../expression/Variable';
import Arbol from '../tablaSimbolos/Arbol';
import Simbolo from '../tablaSimbolos/Simbolo';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Return from './Return';

export default class LlamadaFunciones extends Instruccion {

    private id: String;
    private parametros: Array<Instruccion>;

    constructor(line: Number, column: Number, id: String, parametros?: Array<Instruccion>) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.id = id.toLowerCase() + "2776871601601";
        if (parametros) {
            this.parametros = parametros;
        } else {
            this.parametros = [];
        }
    }

    public interpretar(ast: Arbol, table: tablaSimbolos) {
        var metodo = false;
        var retono = false;
        var funcion = table.getVariable(this.id);
        if (funcion) {
            if (funcion.getTipo().getTipo() == tipos.METODO) {
                metodo = true;
            }
            var parametrosFun = funcion.getValue().parametros;
            var instrucciones = funcion.getValue().instrucciones;
            if (this.parametros.length == parametrosFun.length) {


            } else {
                return new Excepcion("Semántico", "Numero de parametros incorrecto", this.line, this.column);
            }

            var tabla = new tablaSimbolos(table);

            for (var i = 0; i < this.parametros.length; i++) {
                var valor = this.parametros[i].interpretar(ast, tabla);
                var sim = new Simbolo(new Tipo(parametrosFun[i].getTipo()), parametrosFun[i].getID(), valor.value);
                tabla.setVariable(sim);
            }
            for (let m of instrucciones) {
                var result = m.interpretar(ast, tabla);
                if (result instanceof Excepcion) { // ERRORES SINTACTICOS
                    ast.updateConsola((<Excepcion>result).toString());
                }
                if (!metodo) {
                    if (result instanceof Return) {
                        retono = true;
                        return new Excepcion("Semántico", "Tipo de retorno invalido", this.line, this.column);
                    }
                    if (result instanceof Primitivo) {
                        retono = true;
                        if (funcion.getValue().tipo.getTipo() == result.tipo.getTipo()) {
                            return result;
                        } else {
                            return new Excepcion("Semántico", "Tipo de retorno invalido", this.line, this.column);
                        }
                    }
                } else {
                    if (result instanceof Return) {
                        retono = true;
                        return;
                    }
                    if (result instanceof Primitivo) {
                        retono = true;
                        return;
                    }
                }
            }
            if (!metodo) {
                if (!retono) {
                    return new Excepcion("Semántico", "Funcion sin retorno", this.line, this.column);
                }
            }
        } else {
            return new Excepcion("Semántico", "Funcion no declarada", this.line, this.column);
        }
    }

    public comparaTipos(tree: Arbol, table: tablaSimbolos, lista1: any, lista2: any) {
        var iguales = true;
        for (var i = 0; i < lista1.length; i++) {
            try {
                var variable = table.getVariable(lista1[i].id);
                if (variable) {
                    if (variable.getTipo().getTipo() != lista2[i].getTipo()) {
                        iguales = false;
                        break;
                    }
                } else {
                    return false;
                }
            } catch {
                if (lista1[i].tipo.getTipo() != lista2[i].getTipo()) {
                    iguales = false;
                    break;
                }
            }
        }
        if (iguales) {
            return true;
        } else {
            return false;
        }
    }

    public getNodo(): nodoAST {
        let nodo: nodoAST = new nodoAST("Llamada");
        let temp = this.id.split("2776871601601");
        nodo.addHijo(temp[0] + "\n" + "2776871601601");
        nodo.addHijo("(");
        if (this.parametros.length != 0) {
            for (let i of this.parametros) {
                nodo.adddHijo(i.getNodo())
            }
        }
        nodo.addHijo(")");
        return nodo;
    }
}


