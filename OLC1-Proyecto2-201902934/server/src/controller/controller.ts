import {Request,Response} from 'express';
import Excepcion from './analizador/exception/Exception';
import Arbol from './analizador/tablaSimbolos/Arbol';
import tablaSimbolos from './analizador/tablaSimbolos/TablaSimbolos';
var Errors : Array<Excepcion> = new Array<Excepcion>();

class controller{

    public interpretar(req : Request, res: Response){
        /*var parser = require('./analizador/grammar');
        var text = req.body.entrada;
        var listaP = parser.parse(text);
        var tmp = '';
        for(let i of listaP){
            tmp = tmp + i + "\n";
        }
        console.log(tmp);
        res.json({valor : tmp});
        //res.send(tmp)*/
        var parser = require('./analizador/grammar');

        const text = req.body.entrada;

        try{
            let ast = new Arbol( parser.parse(text) );

            var tabla = new tablaSimbolos();
            ast.setGlobal(tabla);

            for(let m of ast.getInstruccion()){
                if(m instanceof Excepcion){ // ERRORES SINTACTICOS
                    Errors.push(m);
                    ast.updateConsola((<Excepcion>m).toString());
                }
                else{
                    var result = m.interpretar(ast, tabla);
                    if(result instanceof Excepcion){ // ERRORES SINTACTICOS
                        Errors.push(result);
                        ast.updateConsola((<Excepcion>result).toString());
                    }
                }
            }
            //var tmp = ast.getConsola().slice(0, -1);
            console.log(tabla.getTable());
            //console.log(ast.getConsola());
            res.json({valor : ast.getConsola().slice(0, -1), error : Errors});
        }
        catch(err){
            console.log(err);
            res.json({
                salida : err,
                errores : err
            });
        }
    }

    public personal(req : Request, res: Response){
        res.json({"Curso" : "OLC1", "Proyecto" : "2", "Nombre" : "German José Paz Cordón", "Carnet" : "201902934"});
    }

}

export const controllers = new controller();