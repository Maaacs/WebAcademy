import { Produto } from "@prisma/client"


type CreateProdutoDto = Pick<Produto, "nome" | "preco" | "estoque">
type UpdateProdutoDto = Pick<Produto, "nome" | "preco" | "estoque">

export { CreateProdutoDto , UpdateProdutoDto }
