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

export default class IFElse extends Instruccion {


    private express: Instruccion;
    private lista: Array<Instruccion>;
    private lista2: Array<Instruccion>;
    private sentencia : String;

    constructor(line: Number, column: Number, express: Instruccion, lista: Array<Instruccion>, lista2: Array<Instruccion>, sentecia : String) {
        super(new Tipo(tipos.CADENA), line, column);
        this.express = express;
        this.lista = lista;
        this.lista2 = lista2;
        this.sentencia = sentecia;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        var result = this.express.interpretar(tree, table);
        if (this.express.tipo.getTipo() != tipos.BOOLEAN) {
            tree.addError(new Excepcion("Semántico", "Tipo de condición incorrecto", this.line, this.column));
            return new Excepcion("Semántico", "Tipo de condición incorrecto", this.line, this.column);
        }
        if (result.value) {
            var tmp = this.ejecutar(tree, table, this.lista);
            return tmp;
            //return true;
        }else{
            var tmp = this.ejecutar(tree, table, this.lista2);
            return tmp;
        }
    }

    public ejecutar(ast : Arbol, table : tablaSimbolos, lista : Array<Instruccion>){
        var tabla = new tablaSimbolos(table);
        tabla.setEntorno("if else");
        ast.addTabla(tabla);

        for (let m of lista) {
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

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Sentencia\nControl");
        nodo.addHijo("If");
        nodo.addHijo("(");
        nodo.adddHijo(this.express.getNodo());
        nodo.addHijo(")");
        nodo.addHijo("{");
        let nodo1 : nodoAST = new nodoAST("Instrucciones");
        for(let i of this.lista){
            if(i instanceof Excepcion){
                nodo1.addHijo("Error\nSintactico");
                continue;
            }
            nodo1.adddHijo(i.getNodo())
        }
        nodo.adddHijo(nodo1);
        nodo.addHijo("}");
        nodo.addHijo("Else");
        nodo.addHijo("{");
        let nodo2 : nodoAST = new nodoAST("Instrucciones");
        for(let i of this.lista2){
            if(i instanceof Excepcion){
                nodo2.addHijo("Error\nSintactico");
                continue;
            }
            nodo2.adddHijo(i.getNodo())
        }
        nodo.adddHijo(nodo2);
        nodo.addHijo("}");
        return nodo;
    }

}