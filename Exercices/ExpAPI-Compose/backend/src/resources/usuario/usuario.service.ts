import { PrismaClient, Usuario } from "@prisma/client";
import { CreateUsuarioDto, UpdateUsuarioDto } from "./usuario.types";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";
import { genSalt, hash } from "bcryptjs";

const prisma = new PrismaClient();


export async function createUsuario(
    usuario: CreateUsuarioDto
): Promise<Usuario> {
    const rounds = parseInt(process.env.SALT_ROUNDS!);
    const salt = await genSalt(rounds);
    const senha =  await hash(usuario.senha, salt);
    return await prisma.usuario.create({
        data: {
            ...usuario,
            senha,
        },
    });
}

export async function buscaUsuarioPorEmail(email: string): Promise<Usuario | null> {
    return await prisma.usuario.findUnique({
        where: { email },
    });
}

export async function getUsuarios(tipo?: TiposUsuarios): Promise<Usuario[]> {
    return await prisma.usuario.findMany();
}

export const buscarUsuarioPorId = async (id: string): Promise<Usuario | null> => {
    return await prisma.usuario.findUnique({ where: { id } });
};


export const updateUsuario= async (
    id: string,
    usuario: UpdateUsuarioDto
): Promise<Usuario> => {
    return await prisma.usuario.update({where: { id }, data: usuario });
};


export const deleteUsuario = async (id: string): Promise<Usuario> => {
    return await prisma.usuario.delete({ where: { id } });
}
