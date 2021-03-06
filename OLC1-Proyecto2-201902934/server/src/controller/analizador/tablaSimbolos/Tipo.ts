export default class Tipo{
    
    private tipos : tipos;

    constructor(tipos : tipos){
        this.tipos = tipos;
    }

    public equals(obj : Tipo){
        return this.tipos == obj.tipos
    }

    public getTipo() : tipos{
        return this.tipos;
    }

    public setTipo(tipo : tipos){
        this.tipos = tipo;
    }
}
export enum tipos{
    ENTERO,
    DECIMAL,
    CARACTER,
    BOOLEAN,
    CADENA,
    BREAK,
    RETURN,
    VARIABLE,
    FUNCION,
    METODO,
    VECTOR,
    LISTA
}