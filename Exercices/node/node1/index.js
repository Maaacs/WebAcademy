const http = require('http');
const fs = require('fs');
const path = require('path');
const diretorioBase = process.argv[2];


function listarArquivosRecursivamente(dir, lista, prefixo = '') {
  const arquivos = fs.readdirSync(dir);
  arquivos.forEach(arquivo => {
    const caminhoCompleto = path.join(dir, arquivo);
    if (fs.statSync(caminhoCompleto).isDirectory()) {
      lista.push(`${prefixo}<strong>diretório:</strong> ${arquivo}`);
      lista.push(`${prefixo}<ul>`);
      listarArquivosRecursivamente(caminhoCompleto, lista, prefixo + '  ');
      lista.push(`${prefixo}</ul>`);
    } else {
      lista.push(`${prefixo}<li><strong>arquivo:</strong> ${arquivo}</li>`);
    }
  });
}


const server = http.createServer((req, res) => {
  let listaArquivos = [];
  listarArquivosRecursivamente(diretorioBase, listaArquivos);
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
  res.write('<ul>');
  listaArquivos.forEach(item => {
    res.write(item);
  });
  res.write('</ul>');
  res.end();
})


server.listen(5555, () => {
  console.log(`Servidor rodando na porta 5555`);
})
