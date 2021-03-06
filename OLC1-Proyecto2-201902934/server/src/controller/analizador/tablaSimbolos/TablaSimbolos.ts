import Simbolo from "./Simbolo";
import Tipo, {tipos} from "./Tipo";

export default class tablaSimbolos
{
    public tabla: Map<String, Simbolo>;
    private anterior: tablaSimbolos | any;// TABLA DE SIMBOLOS ANTERIOR
    private tipo: Tipo;
    //private funciones: Array<Func>;
    private entorno : String;

    constructor(anterior?:tablaSimbolos)
    {
        this.anterior = anterior;
        this.tabla = new Map<String, Simbolo>();
        this.tipo = new Tipo(tipos.ENTERO);
        this.entorno = "";
    }

    public setVariable(simbolo:Simbolo)//DECLARACION
    {
        for(var e: tablaSimbolos = this; e != null; e = e.getAnterior())
        {
            var encontro:Simbolo = <Simbolo> (e.getTable().get(simbolo.getID().toLowerCase()));
            if(encontro != null)
            {
                return `La variable con el identificador ${simbolo.getID().toLowerCase()} ya existe.`;
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
            var encontro:Simbolo = <Simbolo> (e.getTable().get(indentificador.toLowerCase()));
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

    public setEntorno(entorno : String){
        this.entorno = entorno;
    }

    public getEntorno(){
        return this.entorno;
    }

}