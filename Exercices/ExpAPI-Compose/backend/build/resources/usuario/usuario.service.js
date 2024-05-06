"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarUsuarioPorId = exports.getUsuarios = exports.buscaUsuarioPorEmail = exports.createUsuario = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function createUsuario(usuario) {
    const rounds = parseInt(process.env.SALT_ROUNDS);
    const salt = await (0, bcryptjs_1.genSalt)(rounds);
    const senha = await (0, bcryptjs_1.hash)(usuario.senha, salt);
    return await prisma.usuario.create({
        data: {
            ...usuario,
            senha,
        },
    });
}
exports.createUsuario = createUsuario;
async function buscaUsuarioPorEmail(email) {
    return await prisma.usuario.findUnique({
        where: { email },
    });
}
exports.buscaUsuarioPorEmail = buscaUsuarioPorEmail;
async function getUsuarios(tipo) {
    return await prisma.usuario.findMany();
}
exports.getUsuarios = getUsuarios;
async function buscarUsuarioPorId(id) {
    return await prisma.usuario.findUnique({
        where: { id: id.toString() },
    });
}
exports.buscarUsuarioPorId = buscarUsuarioPorId;
