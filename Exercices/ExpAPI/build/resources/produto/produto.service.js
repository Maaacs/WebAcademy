"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readProduto = exports.listProdutos = exports.createProduto = exports.checkNomeIsAvailable = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const checkNomeIsAvailable = async (nome) => {
    return !(await prisma.produto.findUnique({ where: { nome } }));
};
exports.checkNomeIsAvailable = checkNomeIsAvailable;
const createProduto = async (produto) => {
    return await prisma.produto.create({ data: produto });
};
exports.createProduto = createProduto;
const listProdutos = async () => {
    return await prisma.produto.findMany();
};
exports.listProdutos = listProdutos;
const readProduto = async (id) => {
    return await prisma.produto.findUnique({ where: { id } });
};
exports.readProduto = readProduto;
