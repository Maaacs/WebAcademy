"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduto = exports.updateProduto = exports.readProduto = exports.listProdutos = exports.createProduto = exports.checkNomeIsAvailable = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const checkNomeIsAvailable = async (nome, ignoredId) => {
    const produto = await prisma.produto.findUnique({ where: { nome } });
    if (!produto)
        return true;
    if (ignoredId && produto.id === ignoredId)
        return true;
    return false;
    //return !(await prisma.produto.findUnique({ where: { nome } }));
};
exports.checkNomeIsAvailable = checkNomeIsAvailable;
const createProduto = async (produto) => {
    return await prisma.produto.create({ data: produto });
};
exports.createProduto = createProduto;
const listProdutos = async (skip, take) => {
    return await prisma.produto.findMany({ skip, take });
};
exports.listProdutos = listProdutos;
const readProduto = async (id) => {
    return await prisma.produto.findUnique({ where: { id } });
};
exports.readProduto = readProduto;
const updateProduto = async (id, produto) => {
    return await prisma.produto.update({ where: { id }, data: produto });
};
exports.updateProduto = updateProduto;
const deleteProduto = async (id) => {
    return await prisma.produto.delete({ where: { id } });
};
exports.deleteProduto = deleteProduto;
