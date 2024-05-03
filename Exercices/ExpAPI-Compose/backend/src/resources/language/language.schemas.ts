import Joi from 'joi'

const languageSchema = Joi.object().keys({
    lang: Joi.valid('pt_BR', 'en_US').required()
})

export default languageSchema;