
export class nodoAST {

    private children : Array<nodoAST>;
    private value : String;

    constructor(value : String) {
        this.children = new Array<nodoAST>();
        this.value = value;
    }

    public setHijos(children : Array<nodoAST>){
        this.children = children;
    }

    public addHijo(hijo : String){
        this.children.push(new nodoAST(hijo));
    }
    public addHijos(nodos : Array<nodoAST>){
        for(let i of nodos){
            this.children.push(i);
        }
    }

    public adddHijo(child : nodoAST){
        this.children.push(child);
    }

    public getValue(){
        return this.value;
    }

    public setValue(valor: String){
        this.value = valor;
    }

    public getHijos(){
        return this.children;
    }
}