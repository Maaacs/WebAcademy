## Iniciando a Aplicação

1. Inicie o `json-server` na porta `3355` (ou outra porta de sua preferência):
    ```sh
    npm run start:db
    ```

2. Em outro terminal, inicie a aplicação Express na porta definida no seu arquivo `.env` (por padrão, `3333`):
    ```sh
    npm start
    ```

## Rotas

### Página Inicial

- **Rota**: `/`
- **Método HTTP**: `GET`
- **Descrição**: Exibe a página principal do site.

### Sobre

- **Rota**: `/sobre`
- **Método HTTP**: `GET`
- **Descrição**: Exibe a página sobre.

### Lorem Ipsum

- **Rota**: `/lorem/:num`
- **Método HTTP**: `GET`
- **Descrição**: Gera `:num` parágrafos de texto Lorem Ipsum.

### Handlebars Exemplos

#### hb1

- **Rota**: `/hb1`
- **Método HTTP**: `GET`
- **Descrição**: Exemplo básico usando Handlebars.

#### hb2

- **Rota**: `/hb2`
- **Método HTTP**: `GET`
- **Descrição**: Exemplo com condições usando Handlebars.

#### hb3

- **Rota**: `/hb3`
- **Método HTTP**: `GET`
- **Descrição**: Exemplo listando informações com Handlebars.

#### hb4

- **Rota**: `/hb4`
- **Método HTTP**: `GET`
- **Descrição**: Exemplo filtrando e exibindo tecnologias baseadas no NodeJS com Handlebars.

---

## Uso do CRUD

Operações CRUD para produtos:

### Criar Produto

- **Método HTTP**: `POST`
- **URL**: `http://localhost:3355/produtos`
- **Corpo da Requisição (JSON)**:
    ```json
    {
      "nome": "Nome do Produto",
      "preco": 100.00,
      "estoque": 10
    }
    ```

    **Comando cURL**:
    ```sh
    curl -X POST http://localhost:3355/produtos \
    -H "Content-Type: application/json" \
    -d '{"nome": "Nome do Produto", "preco": 100.00, "estoque": 10}'
    ```

### Ler Produto

- **Método HTTP**: `GET`
- **URL**: `http://localhost:3355/produtos/{id}`

    **Comando cURL**:
    ```sh
    curl http://localhost:3355/produtos/{id}
    ```

### Atualizar Produto

- **Método HTTP**: `PUT`
- **URL**: `http://localhost:3355/produtos/{id}`
- **Corpo da Requisição (JSON)**:
    ```json
    {
      "nome": "Nome do Produto Atualizado",
      "preco": 120.00,
      "estoque": 8
    }
    ```

    **Comando cURL**:
    ```sh
    curl -X PUT http://localhost:3355/produtos/{id} \
    -H "Content-Type: application/json" \
    -d '{"nome": "Nome do Produto Atualizado", "preco": 120.00, "estoque": 8}'
    ```

### Deletar Produto

- **Método HTTP**: `DELETE`
- **URL**: `http://localhost:3355/produtos/{id}`

    **Comando cURL**:
    ```sh
    curl -X DELETE http://localhost:3355/produtos/{id}
    ```

---