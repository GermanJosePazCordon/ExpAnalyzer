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
        this.line = line;
        this.column = column;
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
                //Todo bien            
            } else {
                return new Excepcion("Semántico", "Numero de parametros incorrecto", this.line, this.column);
            }

            var tabla = new tablaSimbolos(table);
            var entorno = this.id.split("2776871601601");
            tabla.setEntorno(entorno[0])
            ast.addTabla(tabla);

            for (var i = 0; i < this.parametros.length; i++) {
                var valor = this.parametros[i].interpretar(ast, table);
                if (valor instanceof Excepcion) return valor;
                if(valor.tipo.getTipo() != parametrosFun[i].getTipo()){
                    ast.addError(new Excepcion("Semántico", "Tipo de parametros incorrecto", this.line, this.column));
                    return new Excepcion("Semántico", "Tipo de parametros incorrecto", this.line, this.column);
                }
                var sim = new Simbolo(this.line, this.column, new Tipo(parametrosFun[i].getTipo()), parametrosFun[i].getID(), valor.value);
                tabla.setVariable(sim);
            }
            for (let m of instrucciones) {
                if (m instanceof Excepcion) { // ERRORES SINTACTICOS
                    //Errors.push(m);
                    ast.updateConsola((<Excepcion>m).toString());
                    ast.addError(m);
                    continue;
                }
                var result = m.interpretar(ast, tabla);
                if (result instanceof Excepcion) { // ERRORES SINTACTICOS
                    ast.updateConsola((<Excepcion>result).toString());
                }
                if (!metodo) {
                    if (result instanceof Return) {
                        retono = true;
                        ast.addError(new Excepcion("Semántico", "Tipo de retorno invalido", this.line, this.column));
                        return new Excepcion("Semántico", "Tipo de retorno invalido", this.line, this.column);
                    }
                    if (result instanceof Primitivo) {
                        retono = true;
                        if (funcion.getValue().tipo.getTipo() == result.tipo.getTipo()) {
                            return result;
                        } else {
                            ast.addError(new Excepcion("Semántico", "Tipo de retorno invalido", this.line, this.column));
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

    public getNodo(): nodoAST {
        let nodo: nodoAST = new nodoAST("Llamada");
        let temp = this.id.split("2776871601601");
        nodo.addHijo(temp[0]);
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


