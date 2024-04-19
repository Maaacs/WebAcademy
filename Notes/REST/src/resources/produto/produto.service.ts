import { Produto, PrismaClient } from "@prisma/client";
import { CreateProdutoDto } from "./produto.types";

const prisma = new PrismaClient();

export const checkNomeIsAvailable = async (nome: string): Promise<boolean> => {
    return !(await prisma.produto.findUnique({ where: { nome } }));
};

export const createProduto = async (
    produto: CreateProdutoDto
): Promise<Produto> => {
    return await prisma.produto.create({ data: produto });
};

export const listProdutos = async (): Promise<Produto[]> => {
    return await prisma.produto.findMany();
};
