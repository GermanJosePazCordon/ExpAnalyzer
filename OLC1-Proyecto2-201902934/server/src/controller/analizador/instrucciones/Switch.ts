import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Case from '../expression/Case';
import Break from './Break';
import Continue from './Continue';
import Return from './Return';
import Primitivo from '../expression/Primitiva';
import { nodoAST } from '../abstract/NodoAST';

export default class Switch extends Instruccion {


    private express: Instruccion;
    private listaCases: Array<Case>;
    private listaDefault: Array<Instruccion>;

    constructor(line: Number, column: Number, express: Instruccion, listaCases?: Array<Case>, listaDefault?: Array<Instruccion>) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.express = express;
        if (listaCases) {
            this.listaCases = listaCases;
        } else {
            this.listaCases = new Array<Case>();
        }
        if (listaDefault) {
            this.listaDefault = listaDefault;
        } else {
            this.listaDefault = new Array<Instruccion>();
        }
    }

    public interpretar(ast: Arbol, table: tablaSimbolos) {
        if (this.listaCases.length > 0 && this.listaDefault.length > 0) {
            var breakk : Boolean;
            var def : Boolean;
            breakk = false;
            def = true;
            for (let i of this.listaCases) {
                var result = this.express.interpretar(ast, table);
                if(!breakk){
                    var condicion = i.getExpresion().interpretar(ast, table);
                    var instruccion = i.getInstrucciones();
                    if(condicion.value == result.value){
                        for(let j of instruccion){
                            if(j.tipo.getTipo() == 5){
                                breakk = true;
                                break;
                            }
                        }
                        this.ejecutar(ast, table, instruccion);
                    }
                }
            }
            if(breakk){
                def = false;
            }
            if(def){
                this.ejecutar(ast, table, this.listaDefault);
            }
        }
        else if (this.listaCases.length > 0) {
            breakk = false;
            var result = this.express.interpretar(ast, table);
            for (let i of this.listaCases) {
                var condicion = i.getExpresion().interpretar(ast, table);
                var instruccion = i.getInstrucciones();
                if(condicion.value == result.value){
                    for(let j of instruccion){
                        if(j instanceof Break){
                            breakk = true;
                            break;
                        }
                    }
                    this.ejecutar(ast, table, instruccion);
                }
                if(breakk){
                    break;
                }
            }
        }
        else {
            this.ejecutar(ast, table, this.listaDefault);
        }
        return true;
    }

    public ejecutar(ast: Arbol, table: tablaSimbolos, lista: Array<Instruccion>) {
        var tabla = new tablaSimbolos(table);
        ast.setGlobal(tabla);

        for (let m of lista) {
            var result = m.interpretar(ast, tabla);

            if (result instanceof Excepcion) { // ERRORES SINTACTICOS
                //Errors.push(result);
                ast.updateConsola((<Excepcion>result).toString());
                
            }
            if(result instanceof Break){
                break;
            }
            /*if(result instanceof Continue){
                break;
            }*/
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
        nodo.addHijo("Switch");
        nodo.addHijo("(");
        nodo.adddHijo(this.express.getNodo());
        nodo.addHijo(")");
        nodo.addHijo("{");
        let nodo1 : nodoAST = new nodoAST("Lista\nCase");
        let nodo2 : nodoAST = new nodoAST("Default");
        if(this.listaCases.length > 0){
            for(let i of this.listaCases){
                nodo1.adddHijo(i.getNodo());
            }
            nodo.adddHijo(nodo1);
        }
        if(this.listaDefault.length > 0){
            for(let i of this.listaDefault){
                nodo2.adddHijo(i.getNodo());
            } 
            nodo.adddHijo(nodo2);
        }
        nodo.addHijo("}");
        return nodo;
    }

}