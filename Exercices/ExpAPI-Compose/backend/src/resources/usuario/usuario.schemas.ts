import Joi from 'joi';

const usuarioSchema = Joi.object({
    nome: Joi.string().required().min(3).max(100),
    email: Joi.string().required().email(),
    senha: Joi.string().required().min(6),
    tipoUsuarioId: Joi.string().required().guid({ version: ['uuidv4'] })  
});

export default usuarioSchema;
