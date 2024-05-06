import { Router } from "express"
import produtoController from "./produto.controle"
import produtoScheme from "./produto.schemas"
import validateBody from "../../middlewares/validateBody";
import isAdmin from "../../middlewares/isAdmin";

const router = Router()

router.get('/', produtoController.index);
router.post('/', isAdmin, validateBody(produtoScheme),  produtoController.create);
router.get('/:id', produtoController.read);
router.put('/:id', isAdmin, validateBody(produtoScheme), produtoController.update);
router.delete('/:id', isAdmin, produtoController.remove);


export default router;