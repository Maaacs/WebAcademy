import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SignUpDto, LoginDto } from './auth.types';
import { buscaUsuarioPorEmail, createUsuario, checkAuth } from './auth.service';


export const signup = async (req: Request, res: Response) => {
    /*
        #swagger.summary = "Cria um novo usuário"
        #swagger.description = "Registra um novo usuário no sistema."
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            description: "Dados do usuário",
            schema: { $ref: "#/definitions/SignUpDto" }
        }
        #swagger.responses[201] = { description: "Usuário criado com sucesso" }
        #swagger.responses[409] = { description: "Conflito: Email já cadastrado" }
        #swagger.responses[500] = { description: "Erro interno no servidor" }
    */
    const usuarioData: SignUpDto = req.body;
    try {
        if (await buscaUsuarioPorEmail(usuarioData.email)) {
            return res.status(StatusCodes.CONFLICT).json({ message: 'Email já cadastrado.' });
        }
        const novoUsuario = await createUsuario(usuarioData);
        res.status(StatusCodes.CREATED).json(novoUsuario);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao criar usuário.', error });
    }
};


async function login(req: Request, res: Response) {
    /*
        #swagger.summary = "Faz o login de usuário"
        #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: "#definitions/LoginDto" }
    }
    */
    try {
        const usuario = await checkAuth(req.body);
        if (!usuario)
            return res.status(401).json({ msg: 'Email e/ou senha incorretos' });
        req.session.uid = usuario.id;
        req.session.tipoUsuario = usuario.tipoUsuarioId;
        res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


async function logout(req: Request, res: Response) {
    /*
        #swagger.summary = "Encerra a sessão do usuário"
        #swagger.description = "Logout do usuário, encerrando sua sessão no sistema."
        #swagger.responses[200] = { description: "Sessão encerrada com sucesso." }
        #swagger.responses[500] = { description: "Erro ao encerrar a sessão." }
    */
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ msg: 'Erro ao encerrar a sessão' });
        } else {
            res.status(200).json({ msg: 'Sessão encerrada com sucesso.' });
        }
    });
}





export default { signup, login, logout };