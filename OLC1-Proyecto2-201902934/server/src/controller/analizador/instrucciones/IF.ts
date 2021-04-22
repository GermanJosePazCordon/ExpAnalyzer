import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

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

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        var result = this.condicion.interpretar(tree, table);
        if (this.condicion.tipo.getTipo() != tipos.BOOLEAN) {
            return new Excepcion("Semántico", "Tipo de condición incorrecto", this.line, this.column);
        }
        if (result.value) {
            let ast = new Arbol(this.listaInstruccion);

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
            return true;
        }else{
            return false;
        }
    }

}