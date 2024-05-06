import { Router } from "express"
import produtoRouter from "../resources/produto/produto.router"
import languageRouter from "../resources/language/language.router"
import authRouter from '../resources/auth/auth.router';


const router = Router()

router.use('/', authRouter);
router.use("/produto", produtoRouter); // quando começar com /produto chama produto.router.ts
router.use("/language", languageRouter); // quando começar com /language chama language.router.ts   


export default router;