import { Router } from "express"
import produtoRouter from "../resources/produto/produto.router"

const router = Router()

router.use("/produto", produtoRouter); // quando começar com /produto chama produto.router.ts


export default router;