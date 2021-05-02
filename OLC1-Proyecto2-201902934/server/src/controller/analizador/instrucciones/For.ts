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

    public interpretar(ast: Arbol, table: tablaSimbolos) {

        var tabla = new tablaSimbolos(table);
        ast.setGlobal(tabla);

        var declara = this.declara;
        declara.interpretar(ast, tabla);

        var condicion = this.condicion.interpretar(ast, tabla);
        if (condicion.tipo.getTipo() != tipos.BOOLEAN) {
            return new Excepcion("Semántico", "Tipo de condición incorrecto", this.line, this.column);
        }
        var breakk = false;
        while (this.condicion.interpretar(ast, tabla).value) {
            for (let m of this.listaInstruccion) {
                var result = m.interpretar(ast, tabla);

                if (result instanceof Excepcion) { // ERRORES SINTACTICOS
                    //Errors.push(result);
                    ast.updateConsola((<Excepcion>result).toString());
                }
                if (result instanceof Break) {
                    breakk = true;
                    break;
                }
                if (result instanceof Continue) {
                    break;
                }
                if (result instanceof Return) {
                    return result;
                }
                if (result instanceof Primitivo) {
                    return result;
                }
            }
            if (breakk) {
                break;
            }
            this.incremeta.interpretar(ast, tabla);
        }
    }
    
    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Sentencia\nCiclica");
        nodo.addHijo("For");
        nodo.addHijo("(");
        nodo.adddHijo(this.declara.getNodo());
        nodo.adddHijo(this.condicion.getNodo());
        nodo.addHijo(";");
        nodo.adddHijo(this.incremeta.getNodo());
        nodo.addHijo(")");
        nodo.addHijo("{");
        let nodo1 : nodoAST = new nodoAST("Instrucciones");
        for(let i of this.listaInstruccion){
            nodo1.adddHijo(i.getNodo())
        }
        nodo.adddHijo(nodo1);
        nodo.addHijo("}");
        return nodo;
    }

}