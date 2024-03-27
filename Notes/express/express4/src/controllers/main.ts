import {Request, Response} from 'express';


const inicial = (req: Request, res: Response) => {
    res.send('Página principal do site');
};


const sobre = (req: Request, res: Response) => {
    res.send('Página sobre');
};

const hb1 = (req: Request, res: Response) => {
    res.render('main/hb1', {
    mensagem: 'Olá, você está aprendendo Express + HBS!',
    });
};

const hb2 = (req: Request, res: Response) => {
    res.render('main/hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
    });
};

const hb3 = (req: Request, res: Response) => {
    const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('main/hb3', { profes, layout: false });
};

const hb4 = (req: Request, res: Response) =>{
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

export default {inicial, sobre, hb1, hb2, hb3, hb4};