import { Request, Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

const DB_PATH = path.join(__dirname, '..', '..', 'data', 'db.json');

const readDb = (): { produtos: Produto[] } => {
  return JSON.parse(readFileSync(DB_PATH, { encoding: 'utf-8' }));
};

const writeDb = (db: { produtos: Produto[] }): void => {
  writeFileSync(DB_PATH, JSON.stringify(db), { encoding: 'utf-8' });
};

const index = async (req: Request, res: Response) => {
  const db = readDb();
  res.render('produto/index', { produtos: db.produtos });
};

const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render('produto/create');
  } else {
    const { nome, preco, estoque } = req.body;
    const db = readDb();
    const novoProduto: Produto = {
      id: Math.max(0, ...db.produtos.map(p => p.id)) + 1,
      nome,
      preco: Number(preco),
      estoque: Number(estoque)
    };
    db.produtos.push(novoProduto);
    writeDb(db);
    res.redirect('/produto');
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const produto = db.produtos.find(p => p.id === Number(id));
  res.render('produto/read', { produto });
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const index = db.produtos.findIndex(p => p.id === Number(id));

  if (req.method === 'GET') {
    if (index !== -1) {
      res.render('produto/update', { produto: db.produtos[index] });
    } else {
      res.status(404).send('Produto não encontrado');
    }
  } else {
    const { nome, preco, estoque } = req.body;
    db.produtos[index] = { id: Number(id), nome, preco: Number(preco), estoque: Number(estoque) };
    writeDb(db);
    res.redirect('/produto');
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  let db = readDb();
  db.produtos = db.produtos.filter(p => p.id !== Number(id));
  writeDb(db);
  res.redirect('/produto');
};

export default { index, create, read, update, remove };
