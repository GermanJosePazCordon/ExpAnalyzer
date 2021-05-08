import Simbolo from './Simbolo';
import tablaSimbolos from './TablaSimbolos';
import Excepcion from '../exception/Exception';
import {Instruccion} from '../abstract/Instruccion';

export default class Arbol {
    private instrucciones : Array<Instruccion>;
    private errores : Array<Excepcion>;
    private consola : String;
    private global : tablaSimbolos;
    private listaTabla : Array<tablaSimbolos>;

    constructor(instrucciones : Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new tablaSimbolos();
        this.errores = new Array<Excepcion>();
        this.listaTabla = new Array<tablaSimbolos>();
    }

    public getInstruccion():Array<Instruccion>{
        return this.instrucciones;
    }

    public setInstruccion(instrucciones : Array<Instruccion>){
        this.instrucciones = instrucciones;
    }

    public getConsola():String{
        return this.consola;
    }

    public setConsola(consola : String){
        this.consola = consola;
    }

    public updateConsola(update : String){
        this.consola = `${this.consola}${update}\n`;
    }

    public getGlobal():tablaSimbolos{
        return this.global;
    }

    public setGlobal(tabla : tablaSimbolos){
        this.global = tabla;
    }

    public addTabla(tabla : tablaSimbolos){
        this.listaTabla.push(tabla);
    }

    public getLista(){
        return this.listaTabla;
    }

    public setLista(lista : Array<tablaSimbolos>){
        this.listaTabla = lista;
    }

    public addError(err : Excepcion){
        this.errores.push(err);
    }

    public getError(){
        return this.errores;   
    }
}