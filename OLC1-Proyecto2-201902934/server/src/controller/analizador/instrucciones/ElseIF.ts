import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Break from './Break';
import Continue from './Continue';
import IF from './IF';
import IFElse from './IFElse';
import Return from './Return';

export default class ElseIF extends Instruccion {


    private express: Instruccion;
    private lista: Array<Instruccion>;
    private objeto : any;
    private sentencia : String;

    constructor(line: Number, column: Number, express: Instruccion, lista: Array<Instruccion>, objeto : any, sentencia : String) {
        super(new Tipo(tipos.CADENA), line, column);
        this.express = express;
        this.lista = lista;
        this.objeto = objeto;
        this.sentencia = sentencia;
    }

    public interpretar(ast: Arbol, table: tablaSimbolos) {
        var result = this.express.interpretar(ast, table);
        if (this.express.tipo.getTipo() != tipos.BOOLEAN) {
            return new Excepcion("Semántico", "Tipo de condición incorrecto", this.line, this.column);
        }
        if (result.value) {

            var tabla = new tablaSimbolos(table);
            ast.setGlobal(tabla);

            for (let m of this.lista) {
                var result = m.interpretar(ast, tabla);
                
                if (result instanceof Excepcion) { // ERRORES SINTACTICOS
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
            //console.log(tabla.getTable());
        }else{
            //console.log("Estoy aqui");
            
            //console.log(this.objeto);
            if(this.objeto.sentencia == "IF"){
                var a : IF;
                a = this.objeto;
                return a.interpretar(ast, table);
            }
            else if(this.objeto.sentencia == "IFELSE"){
                var b : IFElse;
                b = this.objeto;
                return b.interpretar(ast, table);
            }
            else if(this.objeto.sentencia == "ELSEIF"){
                var c : ElseIF;
                c = this.objeto;
                c.interpretar(ast, table);
            }
        }
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Sentencia Control");
        nodo.addHijo("If");
        nodo.addHijo("(");
        nodo.adddHijo(this.express.getNodo());
        nodo.addHijo(")");
        nodo.addHijo("{");
        let nodo1 : nodoAST = new nodoAST("Instrucciones");
        for(let i of this.lista){
            nodo1.adddHijo(i.getNodo())
        }
        nodo.adddHijo(nodo1);
        nodo.addHijo("}");
        nodo.addHijo("Else");
        nodo.addHijo("{");
        if(this.objeto.sentencia == "IF"){
            var a : IF;
            a = this.objeto;
            nodo.adddHijo(a.getNodo());
        }
        else if(this.objeto.sentencia == "IFELSE"){
            var b : IFElse;
            b = this.objeto;
            nodo.adddHijo(b.getNodo());
        }
        else if(this.objeto.sentencia == "ELSEIF"){
            var c : ElseIF;
            c = this.objeto;
            nodo.adddHijo(c.getNodo());
        }
        nodo.addHijo("}")
        return nodo;
    }

}