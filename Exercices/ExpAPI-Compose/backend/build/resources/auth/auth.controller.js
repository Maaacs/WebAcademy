"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const http_status_codes_1 = require("http-status-codes");
const auth_service_1 = require("./auth.service");
const signup = async (req, res) => {
    const usuarioData = req.body;
    try {
        if (await (0, auth_service_1.buscaUsuarioPorEmail)(usuarioData.email)) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ message: 'Email já cadastrado.' });
        }
        const novoUsuario = await (0, auth_service_1.createUsuario)(usuarioData);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(novoUsuario);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao criar usuário.', error });
    }
};
exports.signup = signup;
async function login(req, res) {
    try {
        const usuario = await (0, auth_service_1.checkAuth)(req.body);
        if (!usuario)
            return res.status(401).json({ msg: 'Email e/ou senha incorretos' });
        req.session.uid = usuario.id;
        req.session.tipoUsuario = usuario.tipoUsuarioId;
        res.status(200).json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
async function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ msg: 'Erro ao encerrar a sessão' });
        }
        else {
            res.status(200).json({ msg: 'Sessão encerrada com sucesso.' });
        }
    });
}
exports.default = { signup: exports.signup, login, logout };
