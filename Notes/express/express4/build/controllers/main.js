"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inicial = (req, res) => {
    res.send('Página principal do site');
};
const sobre = (req, res) => {
    res.send('Página sobre');
};
const hb1 = (req, res) => {
    res.render('main/hb1', {
        mensagem: 'Olá, você está aprendendo Express + HBS!',
    });
};
const hb2 = (req, res) => {
    res.render('main/hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
    });
};
const hb3 = (req, res) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('main/hb3', { profes, layout: false });
};
const hb4 = (req, res) => {
    const profs = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('main/hb4', {
        profs,
    });
};
exports.default = { inicial, sobre, hb1, hb2, hb3, hb4 };
