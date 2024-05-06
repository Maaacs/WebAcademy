"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_service_1 = require("./usuario.service");
async function index(req, res) {
    const tipo = req.query.tipo;
    try {
        const usuarios = await (0, usuario_service_1.getUsuarios)(tipo);
        res.status(200).json(usuarios);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar usuários.', error });
    }
}
async function create(req, res) {
    try {
        if (await (0, usuario_service_1.buscaUsuarioPorEmail)(req.body.email)) {
            return res.status(409).json({ message: 'Email já cadastrado.' });
        }
        const usuario = await (0, usuario_service_1.createUsuario)(req.body);
        res.status(201).json(usuario);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário.', error });
    }
}
async function read(req, res) {
    const id = req.params.id;
    try {
        const usuario = await (0, usuario_service_1.buscarUsuarioPorId)(parseInt(id));
        if (!usuario)
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        res.status(200).json(usuario);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao ler usuário.', error });
    }
}
exports.default = { index, create, read };
