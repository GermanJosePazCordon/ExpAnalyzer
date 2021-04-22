import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Case from '../expression/Case';

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

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        if (this.listaCases.length > 0 && this.listaDefault.length > 0) {
            var breakk : Boolean;
            var def : Boolean;
            breakk = false;
            def = true;
            for (let i of this.listaCases) {
                var result = this.express.interpretar(tree, table);
                //console.log(result.value);
                if(!breakk){
                    var condicion = i.getExpresion().interpretar(tree, table);
                    var instruccion = i.getInstrucciones();
                    if(condicion.value == result.value){
                        for(let j of instruccion){
                            if(j.tipo.getTipo() == 5){
                                breakk = true;
                                break;
                            }
                        }
                        this.ejecutar(tree, table, instruccion);
                    }
                }
            }
            if(breakk){
                def = false;
            }
            if(def){
                this.ejecutar(tree, table, this.listaDefault);
            }
        }
        else if (this.listaCases.length > 0) {
            var result = this.express.interpretar(tree, table);
            for (let i of this.listaCases) {
                var condicion = i.getExpresion().interpretar(tree, table);
                var instruccion = i.getInstrucciones();
                if(condicion.value == result.value){
                    this.ejecutar(tree, table, instruccion);
                }
            }
        }
        else {
            this.ejecutar(tree, table, this.listaDefault);
        }
        return true;
    }

    public ejecutar(tree: Arbol, table: tablaSimbolos, lista: Array<Instruccion>) {
        let ast = new Arbol(lista);

        var tabla = new tablaSimbolos(table);
        //tabla.setAnterior(table);

        ast.setGlobal(tabla);
        for (let m of ast.getInstruccion()) {
            if (m instanceof Excepcion) { // ERRORES SINTACTICOS
                //Errors.push(m);
                ast.updateConsola((<Excepcion>m).toString());
            }
            var result = m.interpretar(ast, tabla);

            if (result instanceof Excepcion) { // ERRORES SINTACTICOS
                //Errors.push(result);
                ast.updateConsola((<Excepcion>result).toString());
            }
        }
        console.log(tabla.getTable());
        tree.updateConsola(ast.getConsola().slice(0, -1));
    }

}