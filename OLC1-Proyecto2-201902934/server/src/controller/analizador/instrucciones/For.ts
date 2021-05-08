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
        tabla.setEntorno("for");
        ast.addTabla(tabla);

        var declara = this.declara;
        declara.interpretar(ast, tabla);
        if (declara instanceof Excepcion) return declara;

        var condicion = this.condicion.interpretar(ast, tabla);
        if (condicion instanceof Excepcion) return condicion;

        if (condicion.tipo.getTipo() != tipos.BOOLEAN) {
            ast.addError(new Excepcion("Semántico", "Tipo de condición incorrecto", this.line, this.column));
            return new Excepcion("Semántico", "Tipo de condición incorrecto", this.line, this.column);
        }
        var breakk = false;
        while (this.condicion.interpretar(ast, tabla).value) {
            var tabla2 = new tablaSimbolos(tabla);
            tabla2.setEntorno("for");
            ast.addTabla(tabla2);
            for (let m of this.listaInstruccion) {
                
                if (m instanceof Excepcion) { // ERRORES SINTACTICOS
                    //Errors.push(m);
                    ast.updateConsola((<Excepcion>m).toString());
                    ast.addError(m);
                    continue;
                }
                var result = m.interpretar(ast, tabla2);

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