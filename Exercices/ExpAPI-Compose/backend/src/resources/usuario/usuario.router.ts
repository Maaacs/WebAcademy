import { Router } from 'express';
import usuarioController from './usuario.controle';
import usuarioSchema from "./usuario.schemas"
import validateBody from "../../middlewares/validateBody";

const router = Router();

router.post('/', validateBody(usuarioSchema), usuarioController.create);
router.get('/', usuarioController.index);
router.get('/:id', usuarioController.read);
router.put('/:id', validateBody(usuarioSchema), usuarioController.update);
router.delete('/:id', usuarioController.remove);


export default router;