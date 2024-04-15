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
  try {
    const fileData = readFileSync(DB_PATH, 'utf-8');
    const data = JSON.parse(fileData);
    return Object.prototype.hasOwnProperty.call(data, 'produtos')
      ? data
      : { produtos: [] };
  } catch (error) {
    console.error('Erro ao ler o banco de dados:', error);
    return { produtos: [] };
  }
};

const writeDb = (db: { produtos: Produto[] }): void => {
  try {
    writeFileSync(DB_PATH, JSON.stringify(db, null, 2), { encoding: 'utf-8' });
  } catch (error) {
    console.error('Erro ao escrever no banco de dados:', error);
  }
};

const index = (req: Request, res: Response): void => {
  const db = readDb();
  res.render('produto/index', { produtos: db.produtos });
};

const create = (req: Request, res: Response): void => {
  if (req.method === 'GET') {
    res.render('produto/create');
  } else if (req.method === 'POST') {
    const { nome, preco, estoque } = req.body;
    const db = readDb();
    const novoProduto: Produto = {
      id:
        db.produtos.length > 0
          ? Math.max(...db.produtos.map((p) => p.id)) + 1
          : 1,
      nome,
      preco: parseFloat(preco),
      estoque: parseInt(estoque, 10),
    };
    db.produtos.push(novoProduto);
    writeDb(db);
    res.redirect('/produto');
  }
};

const read = (req: Request, res: Response): void => {
  const { id } = req.params;
  const db = readDb();
  const produto = db.produtos.find((p) => p.id === Number(id));
  if (!produto) {
    res
      .status(404)
      .send(
        'Produto não encontrado. Você pode encontrar o ID dos produtos em Produtos>Ver>Detalhes.',
      );
    return;
  }
  res.render('produto/read', { produto });
};

const update = (req: Request, res: Response): void => {
  const { id } = req.params;
  const db = readDb();
  const index = db.produtos.findIndex((p) => p.id === Number(id));

  if (req.method === 'GET') {
    if (index !== -1) {
      res.render('produto/update', { produto: db.produtos[index] });
    } else {
      res.status(404).send('Produto não encontrado');
    }
  } else {
    const { nome, preco, estoque } = req.body;
    db.produtos[index] = {
      id: Number(id),
      nome,
      preco: Number(preco),
      estoque: Number(estoque),
    };
    writeDb(db);
    res.redirect('/produto');
  }
};

const remove = (req: Request, res: Response): void => {
  const { id } = req.params;
  const db = readDb();
  db.produtos = db.produtos.filter((p) => p.id !== Number(id));
  writeDb(db);
  res.redirect('/produto');
};

const search = (req: Request, res: Response): void => {
  res.render('produto/search');
};

export default { index, create, update, remove, search, read };
