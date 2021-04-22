import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

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
            return new Excepcion("Semántico", "Tipo de condición incorrecto", this.line, this.column);
        }
        if (result.value) {
            let ast = new Arbol(this.lista);

            var tabla = new tablaSimbolos(table);
            //table.setLast(table);
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
            return true;
        }else{
            
            let ast = new Arbol(this.lista2);

            var tabla = new tablaSimbolos(table);
            //table.setLast(table);
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
            return false;
        }
    }

}