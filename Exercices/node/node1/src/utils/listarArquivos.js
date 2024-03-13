/*const path = require('path');
const fs = require('fs');
const { createLink } = require('./createLink');


function listarArquivosRecursivamente(dir, lista, prefixo = '') {
    const arquivos = fs.readdirSync(dir);
    arquivos.forEach(arquivo => {
      const caminhoCompleto = path.join(dir, arquivo);
      if (fs.statSync(caminhoCompleto).isDirectory()) {
        lista.push(`${prefixo}<strong>diretório:</strong>${createLink(arquivo)}`);
        lista.push(`${prefixo}<ul>`);
        listarArquivosRecursivamente(caminhoCompleto, lista, prefixo + '  ');
        lista.push(`${prefixo}</ul>`);
      } else {
        lista.push(`${prefixo}<li><strong>arquivo:</strong> ${arquivo}</li>`);
      }
    });
}

module.exports = {
    listarArquivosRecursivamente:listarArquivosRecursivamente
};*/