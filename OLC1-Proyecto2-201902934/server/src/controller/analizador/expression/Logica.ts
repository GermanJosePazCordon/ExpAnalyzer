import { Instruccion } from '../abstract/Instruccion';
import Excepcion from '../exception/Exception';
import Arbol from '../tablaSimbolos/Arbol';
import tablaSimbolos from '../tablaSimbolos/TablaSimbolos';
import Tipo, { tipos } from '../tablaSimbolos/Tipo';

export default class Logica extends Instruccion{

    private op1 : Instruccion | undefined;
    private op2 : Instruccion | undefined;
    private opU : Instruccion | undefined;
    private operador : OperadorLogico;

    constructor(operador : OperadorLogico, row : Number, column : Number, operando1 : Instruccion, operando2?:Instruccion){
        super(new Tipo(tipos.ENTERO), row, column);
        this.operador = operador;
        this.line = row;
        this.column = column;
        if(!operando2){
            this.opU = operando1;
        }
        else{
            this.op1 = operando1;
            this.op2 = operando2;
        }
    }

    public interpretar(tree : Arbol, table : tablaSimbolos){
        var left = null, right = null, unario = null;

        if(this.opU == (null||undefined)){
            left = this.op1?.interpretar(tree, table);
            if(left instanceof Excepcion) return left;

            right = this.op2?.interpretar(tree, table);
            if(right instanceof Excepcion) return right;
        }
        else{
            unario = this.opU.interpretar(tree, table);
            if(unario instanceof Excepcion) return unario;
        }
        this.tipo = new Tipo(tipos.BOOLEAN);
        if(null != this.operador) switch (this.operador){
            case OperadorLogico.OR:
                if(this.op1?.tipo.getTipo() == tipos.BOOLEAN && this.op2?.tipo.getTipo() == tipos.BOOLEAN){
                    if(left == "false"){
                        left = false;
                    }else{
                        left = true
                    }
                    if(right == "false"){
                        right = false;
                    }else{
                        right = true
                    }
                    if(left || right){
                        return true;
                    }
                    return false;
                }
                else{
                    return new Excepcion("Semántico","Error de tipos en operacion ||.",this.line,this.column);
                }
                break;
            case OperadorLogico.AND:
                if(this.op1?.tipo.getTipo() == tipos.BOOLEAN && this.op2?.tipo.getTipo() == tipos.BOOLEAN){
                    if(left == "false"){
                        left = false;
                    }else{
                        left = true
                    }
                    if(right == "false"){
                        right = false;
                    }else{
                        right = true
                    }
                    if(left && right){
                        return true;
                    }
                    return false;
                }
                else{
                    return new Excepcion("Semántico","Error de tipos en operacion &&.",this.line,this.column);
                }
                break;
            case OperadorLogico.NOT:
                if(this.op2?.tipo.getTipo() == tipos.BOOLEAN){
                    if(right == "true"){
                        return false;
                    }
                    return true;
                }
                else{
                    return new Excepcion("Semántico","Error de tipos en operacion !.",this.line,this.column);
                }
                break;
            default:
                return new Excepcion("Semántico","Tipo de Operación Erróneo.",this.line,this.column);
        }
    }

}

export enum OperadorLogico {
    OR,
    AND,
    NOT
}