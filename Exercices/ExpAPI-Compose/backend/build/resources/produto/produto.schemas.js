"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.produtoScheme = void 0;
const joi_1 = __importDefault(require("joi"));
exports.produtoScheme = joi_1.default.object().keys({
    nome: joi_1.default.string().min(3).max(50).lowercase().required(),
    preco: joi_1.default.number().required(),
    estoque: joi_1.default.number().positive().integer().required().messages({
        'number.positive': "O {#label} precisa ser positivo. Portanto, {#value} não é válido.",
        'any.required': "O {#label} é obrigatório."
    }),
    tags: joi_1.default.array().items(joi_1.default.string())
}).options({ allowUnknown: true });
const produto = {
    nome: "Oii",
    preco: 10.5,
    estoque: 5,
    tags: ["Celular", "Motorola"]
};
const { error, value } = exports.produtoScheme.validate(produto, { abortEarly: false });
if (error)
    console.log(error.message);
console.log(value);
exports.default = exports.produtoScheme;
