import http from 'http';
import { promises as fs } from 'fs';
import path from 'path';
import { LoremIpsum } from 'lorem-ipsum';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const lorem = new LoremIpsum();

const PORT = process.env.PORT ?? 3000
const STATIC_DIR = path.join(process.cwd(), 'public');

const server = http.createServer(async (req, res) => {
  try {
    const filePath = path.join(STATIC_DIR, req.url === '/' ? 'index.html' : req.url);

    if (req.url.match(/^\/lorem\/(\d+)$/)) {
      const count = parseInt(req.url.match(/^\/lorem\/(\d+)$/)[1], 10);
      let paragraphs = '';
      // Gera um num aleatorio de sentenças
      for (let i = 0; i < count; i++) {
        const numberOfSentences = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
        paragraphs += `<p>${lorem.generateSentences(numberOfSentences)}</p>`;
      }
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      res.end(paragraphs);
      return;
    }
    
    
    const data = await fs.readFile(filePath, 'utf-8');
    const contentType = filePath.endsWith('.css') ? 'text/css' : 'text/html';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
    res.end('O arquivo não foi encontrado.');
  }
});

server.listen(PORT)
console.log(`Servidor rodando na porta ${PORT}`);
