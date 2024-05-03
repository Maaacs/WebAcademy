## Pré-requisitos
- Servidor MySQL operando

## Instalação

1. **Configurar Variáveis de Ambiente**  
   Renomeie o arquivo `.env.example` para `.env` e modifique-o com os valores:
   ```
   PORT=4466
   NODE_ENV=development
   DATABASE_URL="mysql://usuario:senha@endereco:porta/banco"
   DEFAULT_LANG=pt-BR
   ```
   Certifique-se de substituir `usuario`, `senha`, `endereco`, `porta` e `banco` com seu usuário, senha, host, porta e nome do banco de dados MySQL, respectivamente.

2. **Configuração do Banco de Dados**  
   Execute os scripts SQL localizados no diretório `prisma/migrations` para configurar seu esquema de banco de dados:
   ```
   npm run deploy
   ```

3. **Iniciar a Aplicação**  
   Para rodar a aplicação em modo de desenvolvimento com recarga automática, use:
   ```
   npm start
   ```
   Para um ambiente de produção, primeiro construa o projeto e depois inicie-o:
   ```
   npm run build
   npm run start:prod
   ```

## Endpoints da API

- **URL Base**: `/`
- **Idiomas**: `/v1/language`
  - POST `/` - Alterar preferência de idioma do usuário
- **Produtos**: `/v1/produto`
  - GET `/` - Listar todos os produtos
  - POST `/` - Criar um novo produto
  - GET `/:id` - Obter um produto pelo ID
  - PUT `/:id` - Atualizar um produto
  - DELETE `/:id` - Deletar um produto

## Testes

Você pode testar os endpoints da API usando o workspace do Insomnia fornecido, que está localizado no diretório `.insomnia/`.

