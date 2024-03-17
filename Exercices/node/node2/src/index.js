import http from 'http';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createLink } from './utils/createLink.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT ?? 3000
const diretorioBase = process.argv[2];

function listarArquivosRecursivamente(dir, lista, prefixo = '') {
  const arquivos = fs.readdirSync(dir);
  arquivos.forEach(arquivo => {
    const caminhoCompleto = path.join(dir, arquivo);
    if (fs.statSync(caminhoCompleto).isDirectory()) {
      lista.push(`${prefixo}<strong>diretório:</strong>${createLink(arquivo, dir, diretorioBase)}`);
      lista.push(`${prefixo}<ul>`);
      listarArquivosRecursivamente(caminhoCompleto, lista, prefixo + '  ');
      lista.push(`${prefixo}</ul>`);
    } else {
      lista.push(`${prefixo}<li><strong>arquivo:</strong>${createLink(arquivo, dir, diretorioBase)}</li>`);
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    let listaArquivos = [];
    listarArquivosRecursivamente(diretorioBase, listaArquivos);
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.write('<ul>');
    listaArquivos.forEach(item => {
      res.write(item);
    });
    res.write('</ul>');
    res.end();
  } else {
    const filePath = path.join(diretorioBase, req.url.slice(1));
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      res.write('<br><a href="/">Voltar</a><br>'); 
      res.write(fileContent);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
      res.write('Arquivo não encontrado ou o caminho é um diretório');
      res.end();
    }
  }
});

server.listen(PORT)
console.log(`Servidor rodando na porta ${PORT}`);