import {Request, Response} from "express"
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { CreateProdutoDto, UpdateProdutoDto } from "./produto.types"
import { checkNomeIsAvailable, createProduto, listProdutos, readProduto, updateProduto, deleteProduto } from "./produto.service"

const index = async (req: Request, res: Response) =>{
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
    const { id } = req.params;
    try {
        const produto = await deleteProduto(id);
        res.status(StatusCodes.OK).json(produto)
    } catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

export default {index, create, read, update, remove}
