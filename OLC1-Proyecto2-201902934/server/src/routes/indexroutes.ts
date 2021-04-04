import {Router} from 'express';
import {controllers} from '../controller/controller';

class indexRoutes{

    public router : Router = Router();

    constructor(){
        this.control();
    }

    control() : void{
        this.router.post('/run', controllers.interpretar);
        this.router.get('/personal', controllers.personal);
    }


}

const indexroutes = new indexRoutes();
export default indexroutes.router;