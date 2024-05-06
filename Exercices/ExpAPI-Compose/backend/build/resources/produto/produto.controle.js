"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const produto_service_1 = require("./produto.service");
const index = async (req, res) => {
    const skip = req.query.skip ? parseInt(req.query.skip?.toString()) : undefined;
    const take = req.query.skip ? parseInt(req.query.skip?.toString()) : undefined;
    try {
        const produtos = await (0, produto_service_1.listProdutos)(skip, take);
        res.status(http_status_codes_1.StatusCodes.OK).json(produtos);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};
const create = async (req, res) => {
    const produto = req.body;
    try {
        if (await (0, produto_service_1.checkNomeIsAvailable)(produto.nome)) {
            const novoProduto = await (0, produto_service_1.createProduto)(produto);
            res.status(http_status_codes_1.StatusCodes.CREATED).json(novoProduto);
        }
        else {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json(http_status_codes_1.ReasonPhrases.CONFLICT);
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};
const read = async (req, res) => {
    const id = req.params.id;
    try {
        const produto = await (0, produto_service_1.readProduto)(id);
        if (!produto) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        }
        else {
            res.status(http_status_codes_1.StatusCodes.OK).json(produto);
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};
const update = async (req, res) => {
    const { id } = req.params;
    const produto = req.body;
    try {
        if (await (0, produto_service_1.checkNomeIsAvailable)(produto.nome, id)) {
            const updatedProduto = await (0, produto_service_1.updateProduto)(id, produto);
            res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json(updatedProduto);
        }
        else {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json(http_status_codes_1.ReasonPhrases.CONFLICT);
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const produto = await (0, produto_service_1.deleteProduto)(id);
        res.status(http_status_codes_1.StatusCodes.OK).json(produto);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};
exports.default = { index, create, read, update, remove };
