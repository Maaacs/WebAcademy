#### Pré-requisitos

- Node.js instalado

#### Instalação

1. **Clone o repositório**

   Comece clonando o repositório para sua máquina local.

   ```bash
   git clone https://github.com/Maaacs/WebAcademy/
   cd WebAcademy/Exercices/express/ExpTS
   ```

2. **Instale as dependências**

   Instale as dependências necessárias.

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Copie o arquivo de ambiente de exemplo e defina as variáveis de ambiente necessárias.

   ```bash
   cp .env.development.example .env.development
   cp .env.production.example .env.production
   ```

   Certifique-se de criar um diretório `logs` conforme especificado pelo `LOGS_DIR` no seu arquivo de ambiente, caso ele não exista.

   ```bash
   mkdir logs
   ```

4. **Construa a aplicação**

   Compile os arquivos TypeScript.

   ```bash
   npm run build
   ```

#### Executando a Aplicação

- **Modo de Desenvolvimento**

  Para executar a aplicação no modo de desenvolvimento, use:

  ```bash
  npm start
  ```

  Isso iniciará a aplicação usando `nodemon` para recarregar automaticamente em caso de mudanças.

- **Modo de Produção**

  Para executar a aplicação no modo de produção, use:

  ```bash
  npm run start:prod
  ```

#### Funcionalidades

- Operações CRUD para produtos armazenados em um banco de dados JSON mock
- Geração dinâmica de texto Lorem Ipsum
