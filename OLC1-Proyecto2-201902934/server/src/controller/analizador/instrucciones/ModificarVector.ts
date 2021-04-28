import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Primitivo from '../expression/Primitiva';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class ModificarVector extends Instruccion {

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
        var posicion = null, vector = null, valor = null;
        posicion = this.express1?.interpretar(tree, table);
        if (posicion instanceof Excepcion) return posicion;
        if (posicion.tipo.getTipo() != tipos.ENTERO) {
            return new Excepcion("Semántico", "Posicion de vector invalido", this.line, this.column);
        }
        valor = this.express2?.interpretar(tree, table);
        if (valor instanceof Excepcion) return valor;
        vector = table.getVariable(this.id);
        if(vector){
            if(vector.getTipoVec()?.getTipo() == tipos.LISTA){
                return new Excepcion("Semántico", "Vector no declarado", this.line, this.column);
            }
            if(valor.tipo.getTipo() != vector.getTipo().getTipo()){
                return new Excepcion("Semántico", "Tipo de valor incorrecto", this.line, this.column);
            }
            let temp = vector.getValue()
            temp[parseInt(posicion.value)] = valor.value;
        }else{
            return new Excepcion("Semántico", "Vector no declarado", this.line, this.column);
        }
    }
}