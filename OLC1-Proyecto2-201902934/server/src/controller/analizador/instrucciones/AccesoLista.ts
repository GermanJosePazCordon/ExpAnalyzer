import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class AccesoLista extends Instruccion {

    private id : String;
    private express : Instruccion;

    constructor(line: Number, column: Number, id : String, express : Instruccion) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.id = id.toLowerCase();
        this.express = express;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        var posicion = null, lista = null;
        lista = table.getVariable(this.id);
        posicion = this.express?.interpretar(tree, table);
        if (posicion instanceof Excepcion) return posicion;
        if (posicion.tipo.getTipo() != tipos.ENTERO) {
            return new Excepcion("Semántico", "Posicion de lista invalido", this.line, this.column);
        }
        if(lista){
            if(lista.getTipoVec()?.getTipo() == tipos.VECTOR){
                return new Excepcion("Semántico", "Lista no declarado", this.line, this.column);
            }
            var valor = lista.getValue()[parseInt(posicion.value)];
            if(valor == undefined){
                return new Excepcion("Semántico", "Posicion de lista invalido", this.line, this.column);
            }
            return new Primitivo(lista.getTipo(), valor, this.line, this.column, new Tipo(tipos.LISTA));
        }else{
            return new Excepcion("Semántico", "Lista no declarado", this.line, this.column);
        }
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Acceso\nLista");
        nodo.addHijo(this.id);
        nodo.addHijo("[");
        nodo.addHijo("[");
        nodo.adddHijo(this.express.getNodo());
        nodo.addHijo("]");
        nodo.addHijo("]");
        return nodo;
    }
}