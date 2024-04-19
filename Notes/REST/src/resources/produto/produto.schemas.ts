import Joi from "joi";

const produtoScheme = Joi.object().keys({
    nome: Joi.string().min(3).max(50).required(),
    preco: Joi.number().required(),
    estoque: Joi.number().required()
});

const produto = {
    nome: "Oii",
    preco: 10.5,
    estoque: 5
}

const result = produtoScheme.validate(produto);
console.log(result)

export default produtoScheme;