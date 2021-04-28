import { Instruccion } from '../abstract/Instruccion';
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
            return new Excepcion("Semántico", "Posicion de lista invalido", this.line, this.column);
        }
        valor = this.express2?.interpretar(tree, table);
        if (valor instanceof Excepcion) return valor;
        lista = table.getVariable(this.id);
        if(lista){
            if(lista.getTipoVec()?.getTipo() == tipos.VECTOR){
                return new Excepcion("Semántico", "Lista no declarado", this.line, this.column);
            }
            if(valor.tipo.getTipo() != lista.getTipo().getTipo()){
                return new Excepcion("Semántico", "Tipo de valor incorrecto", this.line, this.column);
            }
            let temp = lista.getValue()
            temp[parseInt(posicion.value)] = valor.value;
        }else{
            return new Excepcion("Semántico", "Lista no declarado", this.line, this.column);
        }
    }
}