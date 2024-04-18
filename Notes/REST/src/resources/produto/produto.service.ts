import { Produto, PrismaClient } from "@prisma/client";
import { CreateProdutoDto } from "./produto.types";

const primsa = new PrismaClient();

export const checkNomeIsAvailable = async (nome: string): Promise<boolean> => {
    return !(await primsa.produto.findUnique({ where: { nome } }));
};

export const createProduto = async (
    produto: CreateProdutoDto
): Promise<Produto> => {
    return await primsa.produto.create({ data: produto });
};
