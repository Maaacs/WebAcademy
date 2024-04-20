import Joi from "joi";

export const produtoScheme = Joi.object().keys({
    nome: Joi.string().min(3).max(50).lowercase().required(),
    preco: Joi.number().required(),
    estoque: Joi.number().positive().integer().required().messages({
        'number.positive': "O {#label} precisa ser positivo. Portanto, {#value} não é válido.",
        'any.required': "O {#label} é obrigatório."
    }),
    tags: Joi.array().items(Joi.string())
}).options({ allowUnknown: true });

const produto = {
    nome: "Oii",
    preco: 10.5,
    estoque: 5,
    tags: ["Celular", "Motorola"]
}

const { error, value } = produtoScheme.validate(produto, { abortEarly: false});
if (error) console.log(error.message);
console.log(value);

export default produtoScheme;