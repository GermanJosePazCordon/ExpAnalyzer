import { Request, Response } from 'express';
import { Instruccion } from './analizador/abstract/Instruccion';
import { nodoAST } from './analizador/abstract/NodoAST';
import Excepcion from './analizador/exception/Exception';
import Asignacion from './analizador/instrucciones/Asignacion';
import Declaracion from './analizador/instrucciones/Declaracion';
import DeclararLista from './analizador/instrucciones/DeclararLista';
import DeclararVector from './analizador/instrucciones/DeclararVector';
import Exec from './analizador/instrucciones/Exec';
import Funciones from './analizador/instrucciones/Funciones';
import Imprimir from './analizador/instrucciones/Imprimir';
import Metodos from './analizador/instrucciones/Metodos';
import ToCharArray from './analizador/instrucciones/ToCharArray';
import Arbol from './analizador/tablaSimbolos/Arbol';
import tablaSimbolos from './analizador/tablaSimbolos/TablaSimbolos';
var Errors: Array<Excepcion> = new Array<Excepcion>();
var raiz : nodoAST;

class controller {

    public interpretar(req: Request, res: Response) {
        var parser = require('./analizador/grammar');

        const text = req.body.entrada;

        try {
            let ast = new Arbol(parser.parse(text));

            var tabla = new tablaSimbolos();
            ast.setGlobal(tabla);
            tabla.setEntorno("global");
            ast.addTabla(tabla);
            
            var eror = false;
            var unExec = true;
            //PRIMER PASADA
            for (let m of ast.getInstruccion()) {
                if (m instanceof Excepcion) { // ERRORES SINTACTICOS
                    Errors.push(m);
                    ast.updateConsola((<Excepcion>m).toString());
                    continue;
                }
                else {
                    if(m instanceof Funciones || m instanceof Metodos){
                        var result = m.interpretar(ast, tabla);
                        if (result instanceof Excepcion) { // ERRORES SINTACTICOS
                            Errors.push(result);
                            ast.updateConsola((<Excepcion>result).toString());
                        }
                    }
                    else if( m instanceof Exec){
                        if(unExec){
                            unExec = false;
                        }else{
                            eror = true;
                            let err =  new Excepcion("Semántico", "Solo puede haber un exec", m.line, m.column);
                            Errors.push(err);
                            ast.updateConsola((<Excepcion>err).toString());
                        }
                    }
                }
            }
            //console.log(tabla.getTable());
            //SEGUNDA PASADA
            if(!eror && !unExec){
                for (let m of ast.getInstruccion()) {
                    if (m instanceof Excepcion) { // ERRORES SINTACTICOS
                        Errors.push(m);
                        ast.updateConsola((<Excepcion>m).toString());
                        continue;
                    }
                    else {
                        if(m instanceof Funciones || m instanceof Metodos){
                            //Funciones variables y declaracion ya almacenadas
                        }else if(m instanceof Declaracion|| m instanceof Asignacion || m instanceof DeclararLista || m instanceof DeclararVector || m instanceof ToCharArray){
                            let result = m.interpretar(ast, tabla);
                            //console.log(result);
                            if (result instanceof Excepcion) { // ERRORES SINTACTICOS
                                Errors.push(result);
                                ast.updateConsola((<Excepcion>result).toString());
                            }
                        }else{
                            if(m instanceof Exec){
                                var resultt = m.interpretar(ast, tabla);
                                    if (resultt instanceof Excepcion) { // ERRORES SINTACTICOS
                                        Errors.push(resultt);
                                        ast.updateConsola((<Excepcion>resultt).toString());
                                    }
                            }else{
                                let err =  new Excepcion("Semántico", "Instrucciones fuera del exec", m.line, m.column);
                                Errors.push(err);
                                ast.updateConsola((<Excepcion>err).toString());
                            }
                        }
                    }
                }
            }else if(!eror && unExec){
                let err =  new Excepcion("Semántico", "No hay exec", 0, 0);
                Errors.push(err);
                ast.updateConsola((<Excepcion>err).toString());
            }

            var init: nodoAST = new nodoAST("Raiz");
            var ins: nodoAST = new nodoAST("Instrucciones");
            for (let m of ast.getInstruccion()) {
                try{
                    ins.adddHijo(m.getNodo());
                }catch (error){
                    ins.addHijo(m.toString());
                }
            }
            init.adddHijo(ins);
            raiz = init;
            var dot = getDot(raiz);
            var dotTable = getDotTable(ast);
            var dotErr = getDotErr(ast);
            res.json({ valor: ast.getConsola().slice(0, -1), dot : dot, table : dotTable, err : dotErr});
            Errors = new Array<Excepcion>();
        }
        catch (err) {
            console.log(err);
            res.json({
                salida: err,
                errores: err
            });
        }
    }

    public personal(req: Request, res: Response) {
        res.json({ "Curso": "OLC1", "Proyecto": "2", "Nombre": "German José Paz Cordón", "Carnet": "201902934" });
    }
}


var grafo = "";
var grafoTabla = "";
var grafoErr = "";
var num = 0;

function getDot(raiz: nodoAST) {
    grafo = "";
    grafo += "digraph {\n";//                         "     \"
    grafo += "bgcolor=" + '"' + "#060606" + '"';
    grafo += "\nnode [shape=oval, fontcolor=" + '"' + "#d0800d" + '"' + ", style=none, color=white, fontname=" + '"' + "Segoe UI" + '"' + "];\n"
    grafo += "n0[label=\"" + raiz.getValue().replace("\"", "\\\"") + "\"];\n";
    num = 1;
    recorrerAST("n0", raiz);
    grafo += "}";
    return grafo;
}

function recorrerAST(padre : String, npafdre : nodoAST) {
    for (let i  of npafdre.getHijos()){
        var nombreHijo = "n" + num;
        grafo += nombreHijo + "[label=\"" + i.getValue().replace("\"", "\\\"") + "\"];\n";
        grafo += padre + "->" + nombreHijo + "[arrowhead=none, arrowtail=none, color = white];\n";
        num++;
        recorrerAST(nombreHijo, i);
    }
}

function getDotTable(tree : Arbol) {
    grafoTabla = "";
    grafoTabla += "digraph {\n";//                         "     \"
    grafoTabla += "bgcolor=" + '"' + "#060606" + '"';
    grafoTabla += "\nnode [shape=oval, fontcolor=" + '"' + "#d0800d" + '"' + ", style=none, color=white, fontname=" + '"' + "Segoe UI" + '"' + "];\n"
    grafoTabla += '"nombre"[shape=none, fontsize=50, margin=0, color=white, label=<\n'
    grafoTabla += '<TABLE border="0" cellborder="4" cellspacing="10" cellpadding="30">\n';
    grafoTabla += recorrerTabla(tree);
    grafoTabla += '</TABLE>\n';
    grafoTabla += '>];\n'
    grafoTabla += "}";
    return grafoTabla;
}

function recorrerTabla(tree : Arbol){
    var tabla = new Array;
    tabla.push('<TR><TD><FONT FACE="Segoe UI">' + "Identificador" + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + "Tipo" + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + "Tipo" + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + "Entorno" + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + "Fila" + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + "Columna" + '</FONT></TD></TR>\n');
    for(let i of tree.getLista()){
        for(let [key, value] of i.getTable()){
            if(value.getTipo().getTipo() >= 0 && value.getTipo().getTipo() < 5){
                if(value.getTipoVec()?.getTipo() == 10){
                    //tabla.push(key + " | " + "vector"  + " | " + getTipoString(value.getTipo().getTipo()) + " | " + i.getEntorno() + " | " + value.getLine() + " | " + value.getColumn());
                    tabla.push(armarTupla(key, "vector", getTipoString(value.getTipo().getTipo()), i.getEntorno(), value.getLine(), value.getColumn()));
                }else if(value.getTipoVec()?.getTipo() == 11){
                    //tabla.push(key + " | " + "lista"  + " | " + getTipoString(value.getTipo().getTipo()) + " | " + i.getEntorno() + " | " + value.getLine() + " | " + value.getColumn());
                    tabla.push(armarTupla(key, "lista", getTipoString(value.getTipo().getTipo()), i.getEntorno(), value.getLine(), value.getColumn()));
                }else{
                    //tabla.push(key + " | " + "variable"  + " | " + getTipoString(value.getTipo().getTipo()) + " | " + i.getEntorno() + " | " + value.getLine() + " | " + value.getColumn());
                    tabla.push(armarTupla(key, "variable", getTipoString(value.getTipo().getTipo()), i.getEntorno(), value.getLine(), value.getColumn())); 
                }
            }else if(value.getTipo().getTipo() == 7){
                //tabla.push(key + " | " + "variable"  + " | " + getTipoString(value.getTipo().getTipo()) + " | " + i.getEntorno() + " | " + value.getLine() + " | " + value.getColumn());
                tabla.push(armarTupla(key, "variable", getTipoString(value.getTipo().getTipo()), i.getEntorno(), value.getLine(), value.getColumn()));
            }else if(value.getTipo().getTipo() == 8){
                let id = key.split("2776871601601");
                //tabla.push(id[0] + " | " + "funcion"  + " | " + getTipoString(value.getValue().tipo.getTipo()) + " | " + i.getEntorno() + " | " + value.getLine() + " | " + value.getColumn());
                tabla.push(armarTupla(id[0], "funcion", getTipoString(value.getValue().tipo.getTipo()), i.getEntorno(), value.getLine(), value.getColumn()));
            }else if(value.getTipo().getTipo() == 9){
                let id = key.split("2776871601601");
                //tabla.push(id[0] + " | " + "metodo"  + " | " + "void" + " | " + i.getEntorno() + " | " + value.getLine() + " | " + value.getColumn());
                tabla.push(armarTupla(id[0], "metodo", "void", i.getEntorno(), value.getLine(), value.getColumn()));
            }
        }
    }
    let tablaSet = new Set(tabla);
    var str = "";
    for(let i of tablaSet){
        str += i.toString();
    }
    return str;
}

function getDotErr(ast : Arbol){
    grafoErr = "";
    grafoErr += "digraph {\n";//                         "     \"
    grafoErr += "bgcolor=" + '"' + "#060606" + '"';
    grafoErr += "\nnode [fontcolor=" + '"' + "#d0800d" + '"' + ", color=white, fontname=" + '"' + "Segoe UI" + '"' + "];\n"
    grafoErr += '"nombre"[fontsize=50, margin=0, color=white, label=<\n'
    grafoErr += '<TABLE border="0" cellborder="4" cellspacing="10" cellpadding="30">\n';
    grafoErr += recorrerErr(ast);
    grafoErr += '</TABLE>\n';
    grafoErr += '>];\n'
    grafoErr += "}";
    return grafoErr;
}

function recorrerErr(tree : Arbol){
    var tabla = new Array;
    var cont = 1;
    for(let i of Errors.concat(tree.getError())){
        //console.log(i);
        tabla.push(armarTuplaErr(i.getTipo(), i.getSMS(), i.getRow(), i.getColumn()));
        
    }
    let tablaSet = new Set(tabla);
    var str = 
    '<TR><TD><FONT FACE="Segoe UI">' + "#" + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + "Tipo Error" + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + "Descripción" + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + "Fila" + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + "Columna" + '</FONT></TD></TR>\n'
    for(let i of tablaSet){
        str += '<TR><TD><FONT FACE="Segoe UI">' + cont + '</FONT></TD>' + i.toString() + "\n";
        cont += 1;
    }
    return str;
}

function armarTupla(id : any, tipo1 : any, tipo2 : any, entorno : any, line : any, column : any){
    var str = 
    '<TR><TD><FONT FACE="Segoe UI">' + id + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + tipo1 + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + tipo2 + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + entorno + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + line + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + column + '</FONT></TD></TR>\n';
    return str;
}

function armarTuplaErr( tipoErr : any, descripcion : any, line : any, column : any){
    var str = 
    //'<TR><TD><FONT FACE="Segoe UI">' + num + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + tipoErr + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + descripcion + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + line + '</FONT></TD>' +
    '<TD><FONT FACE="Segoe UI">' + column + '</FONT></TD></TR>\n';
    return str;
}

function getTipoString(tipo : Number){
    switch(tipo){
        case 3:
            return "boolean";
        case 2:
            return "char";
        case 1:
            return "double";
        case 0:
            return "int";
        case 4:
            return "string";
    }
}

export const controllers = new controller();