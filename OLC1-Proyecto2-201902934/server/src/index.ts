import express, {Application} from "express";
import indexroutes from "./routes/indexroutes";
import morgan from 'morgan';
import cors from 'cors';

class server{

    public app : Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    
    config() : void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json({limit : '50mb'}));
        this.app.use(express.urlencoded({limit : '50mb', extended : false}));
    }

    routes() : void{
        this.app.use(indexroutes);
        this.app.use('run', indexroutes);
    }

    start() : void{
        this.app.listen(this.app.get('port'), () => {
            console.log("Sever on port: ", this.app.get('port'));
        });
    }
}
const servidor = new server();
servidor.start();
