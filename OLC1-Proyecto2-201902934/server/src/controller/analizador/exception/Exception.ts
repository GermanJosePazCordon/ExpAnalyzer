export default class Excepcion {
    private tipo: String;
    private sms: String;
    private row: Number;
    private column: Number;

    constructor(tipo : String, sms : String, row : Number, column : Number)
    {
        this.tipo = tipo;
        this.sms = sms;
        this.row = row;
        this.column = column;
    }

    public toString():String{
        return this.tipo + " - " + this.sms + " [" + this.row + ", " + this.column + "]";
    }
    public show(){
        return this.toString() + "\n";
    }

    public getTipo():String
    {
        return this.tipo;
    }
    public getSMS():String
    {
        return this.sms;
    }

    public getRow():Number
    {
        return this.row;
    }
    public getColumn():Number
    {
        return this.column;
    }

}