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

export default class DoWhile extends Instruccion {

    private express: Instruccion;
    private listaInstruccion: Array<Instruccion>;

    constructor(line: Number, column: Number, listaInstruccion: Array<Instruccion>, express: Instruccion,) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.express = express;
        this.listaInstruccion = listaInstruccion;
    }

    public interpretar(ast: Arbol, table: tablaSimbolos) {
        var result = this.express.interpretar(ast, table);
        if (this.express.tipo.getTipo() != tipos.BOOLEAN) {
            ast.addError(new Excepcion("Semántico", "Tipo de condición incorrecto", this.line, this.column));
            return new Excepcion("Semántico", "Tipo de condición incorrecto", this.line, this.column);
        }
        var condicion = false;
        var breakk = false

        do {

            var tabla = new tablaSimbolos(table);
            tabla.setEntorno("do while");
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

                    ast.updateConsola((<Excepcion>result).toString());
                }
                if(result instanceof Break){
                    breakk = true;
                    break;
                }
                if(result instanceof Continue){
                    break;
                }
                if (result instanceof Return) {
                    return result;
                }
                if (result instanceof Primitivo) {
                    return result;
                }
            }
            if(this.express.interpretar(ast, table).value.toString().toLowerCase() == "true"){
                condicion = true;
            }else{
                condicion = false;
            }
            if(breakk){
                break;
            }
        } while (condicion);
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Sentencia\nCiclica");
        nodo.addHijo("Do");
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
        nodo.addHijo("While");
        nodo.addHijo("(");
        nodo.adddHijo(this.express.getNodo());
        nodo.addHijo(")");
        return nodo;
    }

}