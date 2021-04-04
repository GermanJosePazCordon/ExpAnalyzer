import {request, Request, Response} from 'express';

class controller{

    public interpretar(req : Request, res: Response){
        var parser = require('./analizador/grammar');
        var text = req.body.entrada;
        var listaP = parser.parse(text);
        var tmp = '';
        for(let i of listaP){
            tmp = tmp + i + "\n";
        }
        res.json({valor : tmp});
        //res.send(tmp)
    }

    public personal(req : Request, res: Response){
        res.json({"Curso" : "OLC1", "Proyecto" : "2", "Nombre" : "German José Paz Cordón", "Carnet" : "201902934"});
    }

}

export const controllers = new controller();