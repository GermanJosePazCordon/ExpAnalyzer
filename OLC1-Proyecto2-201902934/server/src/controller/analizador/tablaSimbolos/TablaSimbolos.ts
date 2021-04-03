import Simbolo from './Simbolo';
import Tipo, {tipos} from './Tipo';

export default class TablaSimbolos{

    public tabla : Map<String, Simbolo>;
    private last : TablaSimbolos | any;
    private tipo : Tipo;
    //private func : Array<Func>;

    constructor(last? : TablaSimbolos){
        this.last = last;
        this.tabla = new Map<String, Simbolo>();
        this.tipo = new Tipo(tipos.ENTERO);//tipos.ENTERO es el valor por defecto
    }

    public setVariable(simbolo : Simbolo){
        for(var i: TablaSimbolos = this; i != null; i = i.getLast()){
            var found : Simbolo = <Simbolo> (i.getTable().get(simbolo.getID()));
            if(found != null){
                return `${simbolo.getID()} ya existe.`;
            }
            break;
        }
        this.tabla.set(simbolo.getID(), simbolo);//Se agrega la variable
        return `${simbolo.getID()} creada.`;   
    }

    public getVariable(id : String){
        for(var i: TablaSimbolos = this; i != null; i = i.getLast()){
            var found : Simbolo = <Simbolo> (i.getTable().get(id));
            if(found != null){
                return found;
            }
        }
        return null;
    }

    public getTable(){
        return this.tabla;
    }

    public setTable(tabla : Map<String, Simbolo>){
        this.tabla = tabla;
    }

    public getLast(){
        return this.last;
    }

    public setLast(last : TablaSimbolos){
        this.last = last;
    }
}
