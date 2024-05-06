import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SignUpDto, LoginDto } from './auth.types';

const prisma = new PrismaClient();


export const buscaUsuarioPorEmail = async (email: string) => {
    return await prisma.usuario.findUnique({
        where: { email }
    });
};


export const createUsuario = async (usuario: SignUpDto) => {
    const hashedPassword = await bcrypt.hash(usuario.senha, 10);
    return await prisma.usuario.create({
        data: {
            nome: usuario.nome,
            email: usuario.email,
            senha: hashedPassword,
            tipoUsuarioId: usuario.tipoUsuarioId
        }
    });
};


export const checkAuth = async (
    credenciais: LoginDto
): Promise<{ id: string, tipoUsuarioId: string } | null> => {
    const { email, senha } = credenciais;
    const usuario = await prisma.usuario.findUnique({
        where: { email }
    });
    if (!usuario) return null;
    const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
    return isPasswordValid ? { id: usuario.id, tipoUsuarioId: usuario.tipoUsuarioId } : null;
};
   
