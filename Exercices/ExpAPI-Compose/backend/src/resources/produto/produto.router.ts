import { Router } from "express"
import produtoController from "./produto.controle"
import produtoScheme from "./produto.schemas"
import validateBody from "../../middlewares/validateBody";

const router = Router()

router.get('/', produtoController.index);
router.post('/', validateBody(produtoScheme),  produtoController.create);
router.get('/:id', produtoController.read);
router.put('/:id', validateBody(produtoScheme), produtoController.update);
router.delete('/:id', produtoController.remove);


export default router;