import { Request, Response } from 'express';
import { nodoAST } from './analizador/abstract/NodoAST';
import Excepcion from './analizador/exception/Exception';
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

            for (let m of ast.getInstruccion()) {
                if (m instanceof Excepcion) { // ERRORES SINTACTICOS
                    Errors.push(m);
                    ast.updateConsola((<Excepcion>m).toString());
                }
                else {
                    var result = m.interpretar(ast, tabla);
                    if (result instanceof Excepcion) { // ERRORES SINTACTICOS
                        Errors.push(result);
                        ast.updateConsola((<Excepcion>result).toString());
                    }
                }
            }

            var init: nodoAST = new nodoAST("RAIZ");
            var ins: nodoAST = new nodoAST("INSTRUCCIONES");
            for (let m of ast.getInstruccion()) {
                //console.log(m);
                ins.adddHijo(m.getNodo());
            }
            init.adddHijo(ins);
            raiz = init;
            var dot = graphAST(raiz);
            res.json({ valor: ast.getConsola().slice(0, -1), error: Errors, dot : dot });
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
function graphAST(raiz: nodoAST) {
    return getDot(raiz);
}

var grafo = "";
var num = 0;

function getDot(raiz: nodoAST) {
    grafo = "";
    grafo += "digraph {\n";//                         "     \"
    grafo += "bgcolor=" + '"' + "#060606" + '"';
    grafo += "\nnode [shape=oval, fontcolor=" + '"' + "#d0800d" + '"' + ", style=none, color=white, fontname=" + '"' + "Cambria" + '"' + "];\n"
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

export const controllers = new controller();