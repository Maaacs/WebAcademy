import { Router } from "express"
import produtoRouter from "../resources/produto/produto.router"
import compraRouter from "../resources/compra/compra.router"
import languageRouter from "../resources/language/language.router"
import authRouter from '../resources/auth/auth.router';
import usuarioRouter from '../resources/usuario/usuario.router'; 


const router = Router()

router.use(
    "/auth",
     authRouter
    // #swagger.tags = ['Auth']
);

router.use(
    "/produto",
    // #swagger.tags = ['Produto']
    produtoRouter
); // quando começar com /produto chama produto.router.ts

router.use(
    "/compra",
    // #swagger.tags = ['Compra']
    compraRouter
);

router.use(
    "/language",
    // #swagger.tags = 'Language'] 
    languageRouter
); // quando começar com /language chama language.router.ts 

router.use(
    "/usuario",
     usuarioRouter
    // #swagger.tags = ['Usuario']
);  


export default router;