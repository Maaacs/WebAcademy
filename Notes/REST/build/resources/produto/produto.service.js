"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduto = exports.checkNomeIsAvailable = void 0;
const client_1 = require("@prisma/client");
const primsa = new client_1.PrismaClient();
const checkNomeIsAvailable = async (nome) => {
    return !!(await primsa.produto.findUnique({ where: { nome } }));
};
exports.checkNomeIsAvailable = checkNomeIsAvailable;
const createProduto = async (produto) => {
    return await primsa.produto.create({ data: produto });
};
exports.createProduto = createProduto;
