import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';
import Primitivo from '../expression/Primitiva';
import Variable from './Variable';
import Asignacion from '../instrucciones/Asignacion';
import { nodoAST } from '../abstract/NodoAST';

export default class MenosMenos extends Instruccion {

    private express: Instruccion;

    constructor(line: Number, column: Number, express: Instruccion) {
        super(new Tipo(tipos.CADENA), line, column,);
        this.express = express;
    }

    public interpretar(tree: Arbol, table: tablaSimbolos) {
        if (this.express.tipo.getTipo() == tipos.VARIABLE) {
            var valores = null;
            if (this.express) {
                valores = this.express?.interpretar(tree, table);
                if (valores instanceof Excepcion) return valores;
            }
            var variable = <Variable>this.express;
            if (valores.tipo.getTipo() == tipos.ENTERO) {
                this.tipo = new Tipo(tipos.ENTERO);
                var result = parseInt(valores.value) - 1;
                return new Primitivo(valores.tipo, result, this.line, this.column);
            } else if (valores.tipo.getTipo() == tipos.DECIMAL) {
                this.tipo = new Tipo(tipos.DECIMAL);
                var result = parseFloat(valores.value) - 1;
                return new Primitivo(valores.tipo, result, this.line, this.column);
            } else {
                return new Excepcion("Semántico", "Tipo no valido para incremento", this.line, this.column);
            }
        } else {
            var valor = null;
            if (this.express) {
                valor = this.express?.interpretar(tree, table);
                if (valor instanceof Excepcion) return valor;
                //console.log(valor);
            }
            if (valor.tipo.getTipo() == tipos.ENTERO) {
                this.tipo = new Tipo(tipos.ENTERO);
                var result = parseInt(valor.value) - 1;
                return new Primitivo(valor.tipo, result, this.line, this.column);

            } else if (valor.tipo.getTipo() == tipos.DECIMAL) {
                this.tipo = new Tipo(tipos.DECIMAL);
                var result = parseFloat(valor.value) - 1;
                return new Primitivo(this.tipo, result, this.line, this.column);
            } else {
                return new Excepcion("Semántico", "Tipo no valido para incremento", this.line, this.column);
            }
        }
    }

    public getNodo() : nodoAST{
        let nodo : nodoAST = new nodoAST("Decremento");
        nodo.adddHijo(this.express.getNodo());
        return nodo;
    }

}