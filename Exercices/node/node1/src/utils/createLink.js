const path = require('path');

function createLink(filename, currentPath, diretorioBase) {
    const relativePath = path.relative(diretorioBase, currentPath);
    return `<a href="/${path.join(relativePath, filename)}">${filename}</a><br>\n`;
  }
  
  

module.exports = {
    createLink:createLink
};
   