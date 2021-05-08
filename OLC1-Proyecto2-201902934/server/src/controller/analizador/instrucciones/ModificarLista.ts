import { Instruccion } from '../abstract/Instruccion';
import { nodoAST } from '../abstract/NodoAST';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class ModificarLista extends Instruccion {

    private id : String;
    private express1 : Instruccion;
    private express2 : Instruccion;

    constructor(line: Number, column: Number, id : String, express1 : Instruccion, express2 : Instruccion) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.id = id.toLowerCase();
        this.express1 = express1;
        this.express2 = express2;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        var posicion = null, lista = null, valor = null;
        posicion = this.express1?.interpretar(tree, table);
        if (posicion instanceof Excepcion) return posicion;
        if (posicion.tipo.getTipo() != tipos.ENTERO) {
            tree.addError(new Excepcion("Semántico", "Posicion de lista invalida", this.line, this.column));
            return new Excepcion("Semántico", "Posicion de lista invalida", this.line, this.column);
        }
        valor = this.express2?.interpretar(tree, table);
        if (valor instanceof Excepcion) return valor;
        lista = table.getVariable(this.id);
        if(lista){
            if(lista.getTipoVec()?.getTipo() == tipos.VECTOR){
                tree.addError(new Excepcion("Semántico", "Lista no declarada", this.line, this.column));
                return new Excepcion("Semántico", "Lista no declarada", this.line, this.column);
            }
            if(valor.tipo.getTipo() != lista.getTipo().getTipo()){
                tree.addError(new Excepcion("Semántico", "Tipo de valor incorrecto", this.line, this.column));
                return new Excepcion("Semántico", "Tipo de valor incorrecto", this.line, this.column);
            }
            let temp = lista.getValue()
            if (temp[parseInt(posicion.value)] == undefined){
                tree.addError(new Excepcion("Semántico", "Posicion de lista invalida", this.line, this.column));
                return new Excepcion("Semántico", "Posicion de lista invalida", this.line, this.column);
            }
            temp[parseInt(posicion.value)] = valor.value;
        }else{
            tree.addError(new Excepcion("Semántico", "Lista no declarada", this.line, this.column));
            return new Excepcion("Semántico", "Lista no declarada", this.line, this.column);
        }
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Modificar\nLista");
        nodo.addHijo(this.id);
        nodo.addHijo("[");
        nodo.addHijo("[");
        nodo.adddHijo(this.express1.getNodo());
        nodo.addHijo("]");
        nodo.addHijo("]");
        nodo.addHijo("=");
        nodo.adddHijo(this.express2.getNodo());
        nodo.addHijo(";");
        return nodo;
    }
}