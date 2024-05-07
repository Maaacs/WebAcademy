
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
    /*
        #swagger.summary = "Lista todos os usuários"
        #swagger.description = "Retorna uma lista de todos os usuários, opcionalmente filtrados por tipo de usuário."
        #swagger.parameters['tipo'] = {
            in: 'query',
            description: 'Filtro opcional por tipo de usuário',
            required: false,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: "Lista de usuários retornada com sucesso.",
            schema: {
                type: "array",
                items: { $ref: "#/definitions/Usuario" }
            }
        }
        #swagger.responses[500] = { description: "Erro interno no servidor" }
    */
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
    /*
        #swagger.summary = "Cria um novo usuário"
        #swagger.description = "Registra um novo usuário no sistema, verificando se o e-mail já está cadastrado."
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            description: "Dados do novo usuário",
            schema: { $ref: "#/definitions/CreateUsuarioDto" }
        }
        #swagger.responses[201] = { description: "Usuário criado com sucesso." }
        #swagger.responses[409] = { description: "Conflito: Email já cadastrado." }
        #swagger.responses[500] = { description: "Erro interno ao criar o usuário." }
    */
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
    /*
        #swagger.summary = "Obtém detalhes de um usuário"
        #swagger.description = "Retorna detalhes de um usuário específico pelo ID."
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'ID do usuário a ser consultado',
            type: 'string'
        }
        #swagger.responses[200] = {
            description: "Usuário encontrado e retornado com sucesso.",
            schema: { $ref: "#/definitions/Usuario" }
        }
        #swagger.responses[404] = { description: "Usuário não encontrado." }
        #swagger.responses[500] = { description: "Erro interno no servidor." }
    */
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
    /*
        #swagger.summary = "Atualiza um usuário"
        #swagger.description = "Atualiza informações de um usuário existente baseado no ID fornecido."
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'ID do usuário a ser atualizado',
            type: 'string'
        }
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            description: 'Dados para atualização do usuário',
            schema: { $ref: "#/definitions/UpdateUsuarioDto" }
        }
        #swagger.responses[204] = { description: "Usuário atualizado com sucesso." }
        #swagger.responses[404] = { description: "Usuário não encontrado." }
        #swagger.responses[500] = { description: "Erro interno no servidor." }
    */
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
    /*
        #swagger.summary = "Remove um usuário"
        #swagger.description = "Remove um usuário do sistema baseado no ID fornecido."
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'ID do usuário a ser removido',
            type: 'string'
        }
        #swagger.responses[200] = { description: "Usuário removido com sucesso." }
        #swagger.responses[404] = { description: "Usuário não encontrado." }
        #swagger.responses[500] = { description: "Erro interno no servidor." }
    */
    const { id } = req.params;
    try {
        const produto = await deleteUsuario(id);
        res.status(StatusCodes.OK).json(produto)
    } catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

export default { index, create, read, update, remove };