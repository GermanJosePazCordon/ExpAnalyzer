import Tipo from "./Tipo";

export default class Simbolo{

    private tipo : Tipo;
    private id : String;
    private value : any;
    private tipoVec? : Tipo;

    constructor(tipo : Tipo, id : String, value? : any, tipoVec? : Tipo){
        this.tipo = tipo;
        this.id = id;
        if(value){
            this.value = value;
        }else{
            this.value = null;
        }
        this.tipoVec = tipoVec;
    }

    public getID(){
        return this.id;
    }

    public setID(id : String){
        this.id = id;
    }

    public getValue(){
        return this.value;
    }

    public setValue(value : String){
        this.value = value;
    }

    public getTipo(){
        return this.tipo;
    }

    public setTipo(tipo : Tipo){
        this.tipo = tipo;
    }

    public getTipoVec(){
        return this.tipoVec;
    }
    
}