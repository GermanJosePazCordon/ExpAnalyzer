import Tipo from "./Tipo";

export default class Simbolo{

    private tipo : Tipo;
    private id : String;
    private value : any;

    constructor(tipo : Tipo, id : String, value? : any){
        this.tipo = tipo;
        this.id = id;
        if(value){
            this.value = value;
        }else{
            this.value = null;
        }
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
}