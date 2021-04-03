import {request, Request, Response} from 'express';

class controller{

    public hello(req : Request, res: Response){
        res.send("Hola mundo")
    }

    public personal(req : Request, res: Response){
        res.json({"Curso" : "OLC1", "Proyecto" : "2", "Nombre" : "German José Paz Cordón", "Carnet" : "201902934"});
    }

    public test(req : Request, res: Response){
        var parser = require('./analizador/grammar');
        var text = req.body.entrada;
        parser.parse(text);
    }

}
export const controllers = new controller();