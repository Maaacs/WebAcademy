"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.createUsuario = exports.buscaUsuarioPorEmail = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const buscaUsuarioPorEmail = async (email) => {
    return await prisma.usuario.findUnique({
        where: { email }
    });
};
exports.buscaUsuarioPorEmail = buscaUsuarioPorEmail;
const createUsuario = async (usuario) => {
    const hashedPassword = await bcryptjs_1.default.hash(usuario.senha, 10);
    return await prisma.usuario.create({
        data: {
            nome: usuario.nome,
            email: usuario.email,
            senha: hashedPassword,
            tipoUsuarioId: usuario.tipoUsuarioId
        }
    });
};
exports.createUsuario = createUsuario;
const checkAuth = async (credenciais) => {
    const { email, senha } = credenciais;
    const usuario = await prisma.usuario.findUnique({
        where: { email }
    });
    if (!usuario)
        return null;
    const isPasswordValid = await bcryptjs_1.default.compare(senha, usuario.senha);
    return isPasswordValid ? { id: usuario.id, tipoUsuarioId: usuario.tipoUsuarioId } : null;
};
exports.checkAuth = checkAuth;
