import Simbolo from "./Simbolo";
import Tipo, {tipos} from "./Tipo";

export default class tablaSimbolos
{
    public tabla: Map<String, Simbolo>;
    private anterior: tablaSimbolos | any;// TABLA DE SIMBOLOS ANTERIOR
    private tipo: Tipo;
    //private funciones: Array<Func>;

    constructor(anterior?:tablaSimbolos)
    {
        this.anterior = anterior;
        this.tabla = new Map<String, Simbolo>();
        this.tipo = new Tipo(tipos.ENTERO);
    }

    public setVariable(simbolo:Simbolo)//DECLARACION
    {
        for(var e: tablaSimbolos = this; e != null; e = e.getAnterior())
        {
            var encontro:Simbolo = <Simbolo> (e.getTable().get(simbolo.getID()));
            if(encontro != null)
            {
                return `La variable con el identificador ${simbolo.getID()} ya existe.`;
            }
            break;
        }
        this.tabla.set(simbolo.getID(), simbolo);// SE AGREGA LA VARIABLE

        return `LA VARIABLE ${simbolo.getID()} SE CREO EXITOSAMENTE.`;
    }

    public getVariable(indentificador: String)
    {
        for(var e: tablaSimbolos = this; e != null; e = e.getAnterior())
        {
            var encontro:Simbolo = <Simbolo> (e.getTable().get(indentificador));
            if(encontro != null)
            {
                return encontro;
            }
        }
        return null;
    }

    public getTable() {
        return this.tabla;
    }

    public setTable(Table: Map<String, Simbolo>) {
        this.tabla = Table;
    }

    public getAnterior() {
        return this.anterior;
    }

    public setAnterior(Anterior: tablaSimbolos) {
        this.anterior = Anterior;
    }

}