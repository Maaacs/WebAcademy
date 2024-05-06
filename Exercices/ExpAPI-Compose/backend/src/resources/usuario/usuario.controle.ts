
import { Request, Response } from 'express';
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { updateUsuario, deleteUsuario } from './usuario.service';

import {
    createUsuario,
    buscaUsuarioPorEmail,
    buscarUsuarioPorId,
    getUsuarios,
} from "./usuario.service";
import { UpdateUsuarioDto } from './usuario.types';


async function index (req: Request, res: Response) {
    const tipo = req.query.tipo as TiposUsuarios | undefined;
    try {
        const usuarios = await getUsuarios(tipo);
        res.status(200).json(usuarios);
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar usuários.', error });
    }
}


async function create (req: Request, res: Response) {
    try{
        if (await buscaUsuarioPorEmail(req.body.email)) {
            return res.status(409).json({ message: 'Email já cadastrado.' });
        }
        const usuario = await createUsuario(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário.', error });
    }
}


const read = async (req: Request, res: Response) =>{
    const id = req.params.id;
    try {
        const usuario = await buscarUsuarioPorId(id);
        if (!usuario){
           return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND)
        }else{
            res.status(StatusCodes.OK).json(usuario)
        }
    }catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
};


const update = async (req: Request, res: Response) =>{
    const { id } = req.params;
    const usuario = req.body as UpdateUsuarioDto;
    try {
        const updatedUsuario = await updateUsuario(id, usuario)
        res.status(StatusCodes.NO_CONTENT).json(updatedUsuario)
    } catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
};


const remove = async (req: Request, res: Response) =>{
    const { id } = req.params;
    try {
        const produto = await deleteUsuario(id);
        res.status(StatusCodes.OK).json(produto)
    } catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

export default { index, create, read, update, remove };