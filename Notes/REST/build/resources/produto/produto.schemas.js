"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const produtoScheme = joi_1.default.object().keys({
    nome: joi_1.default.string().min(3).max(50).required(),
    preco: joi_1.default.number().required(),
    estoque: joi_1.default.number().required()
});
const produto = {
    nome: "Oii",
    preco: 10.5,
    estoque: 5
};
const result = produtoScheme.validate(produto);
console.log(result);
