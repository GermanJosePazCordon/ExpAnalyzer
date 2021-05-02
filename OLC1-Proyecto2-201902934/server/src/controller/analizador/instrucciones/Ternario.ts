import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class Ternario extends Instruccion {

    private condicion : Instruccion;
    private express1 : Instruccion;
    private express2 : Instruccion;

    constructor(line: Number, column: Number, condicion : Instruccion, express1 : Instruccion, express2 : Instruccion) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.condicion = condicion;
        this.express1 = express1;
        this.express2 = express2;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        var cond = null, expre1 = null, expre2 = null;
        cond = this.condicion.interpretar(tree, table);
        if(cond instanceof Excepcion) return cond;
        
        if(cond.tipo.getTipo() != tipos.BOOLEAN){
            return new Excepcion("Semántico", "Condicion invalida", this.line, this.column);
        }

        if(cond.value){
            expre1 = this.express1.interpretar(tree, table);
            //console.log(this.express1);
            if(expre1 instanceof Excepcion) return expre1;
            
            return new Primitivo(expre1.tipo, expre1.value, this.line, this.column);
        }else{
            expre2 = this.express2.interpretar(tree, table);
            if(expre2 instanceof Excepcion) return expre2;
            
            return new Primitivo(expre2.tipo, expre2.value, this.line, this.column);
        }
    }
    
    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Operador\nTernario");
        nodo.adddHijo(this.condicion.getNodo());
        nodo.addHijo("?");
        nodo.adddHijo(this.express1.getNodo());
        nodo.addHijo(":");
        nodo.adddHijo(this.express2.getNodo());
        return nodo;
    }
}