import { Router } from "express"
import produtoRouter from "../resources/produto/produto.router"
import compraRouter from "../resources/compra/compra.router"
import languageRouter from "../resources/language/language.router"
import authRouter from '../resources/auth/auth.router';
import usuarioRouter from '../resources/usuario/usuario.router'; 


const router = Router()

router.use('/', authRouter);
router.use("/produto", produtoRouter); // quando começar com /produto chama produto.router.ts
router.use("/compra", compraRouter);
router.use("/language", languageRouter); // quando começar com /language chama language.router.ts 
router.use("/usuario", usuarioRouter);  


export default router;