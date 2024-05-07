import { PrismaClient, Compra, CompraProduto } from "@prisma/client";

const prisma = new PrismaClient();

export async function registraCompra(carrinho: string[], usuarioId: string){
    const compra = await prisma.compra.create({ data: { usuarioId: usuarioId } });

    carrinho.forEach(async (produtoId) => {
        await prisma.compraProduto.create({
            data: {
                compraId: compra.id,
                produtoId: produtoId,
                quantidade: 1,
            }
        });
    });
}