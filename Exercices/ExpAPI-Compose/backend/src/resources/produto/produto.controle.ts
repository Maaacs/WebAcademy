import {Request, Response} from "express"
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { CreateProdutoDto, UpdateProdutoDto } from "./produto.types"
import { checkNomeIsAvailable, createProduto, listProdutos, readProduto, updateProduto, deleteProduto } from "./produto.service"

const index = async (req: Request, res: Response) =>{
    /*
        #swagger.summary = "Lista todos os produtos"
        #swagger.description = "Retorna uma lista de todos os produtos disponíveis no banco de dados."
        #swagger.parameters['skip'] = {
            in: 'query',
            description: 'Número de produtos para pular para paginação',
            type: 'integer',
            required: false
        }
        #swagger.parameters['take'] = {
            in: 'query',
            description: 'Quantidade de produtos para retornar para paginação',
            type: 'integer',
            required: false
        }
        #swagger.responses[200] = { 
            description: "Lista de produtos retornada com sucesso.",
            schema: { 
                type: "array",
                items: { $ref: "#/definitions/Produto" }
            }
        }
        #swagger.responses[500] = { description: "Erro interno no servidor." }
    */
    const skip = req.query.skip ? parseInt(req.query.skip?.toString()) : undefined;
    const take = req.query.skip ? parseInt(req.query.skip?.toString()) : undefined;
    try{
        const produtos = await listProdutos(skip, take);
        res.status(StatusCodes.OK).json(produtos)
    } catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
};

const create = async (req: Request, res: Response) =>{
    /*
        #swagger.summary = "Adiciona um produto no banco"
        #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: "#definitions/CreateProdutoDto" }
        }
    */
    const produto = req.body as CreateProdutoDto;
    try {
        if (await checkNomeIsAvailable(produto.nome)){
            const novoProduto = await createProduto(produto)
            res.status(StatusCodes.CREATED).json(novoProduto)
        }else{
            res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT)
        }   
    }catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
};

const read = async (req: Request, res: Response) =>{
    /*
        #swagger.summary = "Retorna um produto"
        #swagger.parameters['id'] = {
            description: "ID do produto",
        }
        #swagger.responses[200] = {
            schema: { $ref: "#definitions/Produto" }
        }
    */
    const id = req.params.id;
    try {
        const produto = await readProduto(id);
        if (!produto){
           return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND)
        }else{
            res.status(StatusCodes.OK).json(produto)
        }
    }catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
};

const update = async (req: Request, res: Response) =>{
    /*
        #swagger.summary = "Atualiza um produto existente"
        #swagger.description = "Atualiza informações de um produto existente com base no ID fornecido."
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'ID do produto a ser atualizado'
        }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Dados para atualizar o produto',
            schema: { $ref: "#/definitions/UpdateProdutoDto" }
        }
        #swagger.responses[200] = { description: "Produto atualizado com sucesso." }
        #swagger.responses[404] = { description: "Produto não encontrado." }
        #swagger.responses[409] = { description: "Conflito: Nome do produto já em uso." }
        #swagger.responses[500] = { description: "Erro interno no servidor." }
    */
    const { id } = req.params;
    const produto = req.body as UpdateProdutoDto;
    try {
        if (await checkNomeIsAvailable(produto.nome, id)){
            const updatedProduto = await updateProduto(id, produto)
            res.status(StatusCodes.NO_CONTENT).json(updatedProduto)
        } else{
            res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT)
        }
    } catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
};

const remove = async (req: Request, res: Response) =>{
    /*
        #swagger.summary = "Remove um produto do banco"
        #swagger.description = "Remove um produto do banco de dados com base no ID fornecido."
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'ID do produto a ser removido'
        }
        #swagger.responses[200] = { description: "Produto removido com sucesso." }
        #swagger.responses[404] = { description: "Produto não encontrado." }
        #swagger.responses[500] = { description: "Erro interno no servidor." }
    */
    const { id } = req.params;
    try {
        const produto = await deleteProduto(id);
        res.status(StatusCodes.OK).json(produto)
    } catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

export default {index, create, read, update, remove}
