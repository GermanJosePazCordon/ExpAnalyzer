import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Break from './Break';
import Continue from './Continue';
import Return from './Return';

export default class IF extends Instruccion {


    private condicion: Instruccion;
    private listaInstruccion: Array<Instruccion>;
    private sentencia : String;

    constructor(line: Number, column: Number, condicion: Instruccion, listaIntruccion: Array<Instruccion>, sentencia : String) {
        super(new Tipo(tipos.CADENA), line, column);
        this.condicion = condicion;
        this.listaInstruccion = listaIntruccion;
        this.sentencia = sentencia;
    }

    public interpretar(ast: Arbol, table: tablaSimbolos) {
        var result = this.condicion.interpretar(ast, table);
        if (this.condicion.tipo.getTipo() != tipos.BOOLEAN) {
            ast.addError(new Excepcion("Semántico", "Tipo de condición incorrecto", this.line, this.column));
            return new Excepcion("Semántico", "Tipo de condición incorrecto", this.line, this.column);
        }
        if (result.value) {
            var tabla = new tablaSimbolos(table);
            tabla.setEntorno("if");
            ast.addTabla(tabla);

            for (let m of this.listaInstruccion) {
                if (m instanceof Excepcion) { // ERRORES SINTACTICOS
                    //Errors.push(m);
                    ast.updateConsola((<Excepcion>m).toString());
                    ast.addError(m);
                    continue;
                }
                var result = m.interpretar(ast, tabla);
                
                if (result instanceof Excepcion) { // ERRORES SINTACTICOS
                    //Errors.push(result);
                    ast.updateConsola((<Excepcion>result).toString());
                }

                if(result instanceof Break){
                    return result;
                }
                if(result instanceof Continue){
                    return result;
                }
                if(result instanceof Return){
                    return result;
                }
                if(result instanceof Primitivo){
                    return result;
                }
            }
        }
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Sentencia\nControl");
        nodo.addHijo("IF");
        nodo.addHijo("(");
        nodo.adddHijo(this.condicion.getNodo());
        nodo.addHijo(")");
        nodo.addHijo("{");
        let nodo1 : nodoAST = new nodoAST("Instrucciones");
        for(let i of this.listaInstruccion){
            if(i instanceof Excepcion){
                nodo1.addHijo("Error\nSintactico");
                continue;
            }
            nodo1.adddHijo(i.getNodo())
        }
        nodo.adddHijo(nodo1);
        nodo.addHijo("}");
        return nodo;
    }
}