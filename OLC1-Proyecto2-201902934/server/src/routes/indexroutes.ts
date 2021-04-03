import {Router} from 'express';
import {controllers} from '../controller/controller';

class indexRoutes{

    public router : Router = Router();

    constructor(){
        this.control();
    }

    control() : void{
        this.router.get('/', controllers.hello);
        this.router.get('/personal', controllers.personal);
        this.router.get('/test', controllers.test);
        this.router.get("**", (req,res)=>{
            res.send("Aqui no hay nada 🥺");
        });
    }


}

const indexroutes = new indexRoutes();
export default indexroutes.router;