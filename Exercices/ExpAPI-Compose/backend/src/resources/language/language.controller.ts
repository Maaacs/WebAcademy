import { Request, Response } from 'express';

import { ChangeLangDto }  from './language.types';
import { StatusCodes } from 'http-status-codes';


const changeLanguage = (req: Request, res: Response) => {
    /*  #swagger.summary = "Seleciona idioma"
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Idioma a ser definido para a sessão do usuário',
            required: true,
            schema: { $ref: "#/definitions/ChangeLanguageDto" }
        }
    */
    const { lang }  = req.body as ChangeLangDto;
    res.cookie('lang', lang);
    res.status(StatusCodes.NO_CONTENT).json();
}

export default changeLanguage;