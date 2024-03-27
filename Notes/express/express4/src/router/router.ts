import { Router } from 'express';
const router = Router();
import mainController from "../controllers/main"
import main from '../controllers/main';


router.get('/', mainController.inicial);
router.get('/sobre',  mainController.sobre);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);  
router.get('/hb4', mainController.hb4);
  

export default router;