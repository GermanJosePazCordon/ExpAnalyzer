import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class For extends Instruccion {

    private declara: Instruccion;
    private condicion: Instruccion;
    private incremeta: Instruccion;
    private listaInstruccion: Array<Instruccion>;

    constructor(line: Number, column: Number, declara: Instruccion, condicion: Instruccion, incrementa: Instruccion, listaInstruccion: Array<Instruccion>) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.condicion = condicion;
        this.listaInstruccion = listaInstruccion;
        this.declara = declara;
        this.incremeta = incrementa;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        let ast = new Arbol(this.listaInstruccion);

        var tabla = new tablaSimbolos(table);
        //tabla.setAnterior(table);

        ast.setGlobal(tabla);
        var declara = this.declara.interpretar(tree, tabla);

        var condicion = this.condicion.interpretar(tree, tabla);
        if (condicion.tipo.getTipo() != tipos.BOOLEAN) {
            return new Excepcion("Semántico", "Tipo de condición incorrecto", this.line, this.column);
        }
        while(this.condicion.interpretar(tree, tabla).value){
            for (let m of ast.getInstruccion()) {
                var result = m.interpretar(ast, tabla);
    
                if (result instanceof Excepcion) { // ERRORES SINTACTICOS
                    //Errors.push(result);
                    ast.updateConsola((<Excepcion>result).toString());
                }
    
            }
            
           
            this.incremeta.interpretar(tree, tabla);
        }
        console.log(tabla.getTable());
            tree.updateConsola(ast.getConsola().slice(0, -1));
    }

}