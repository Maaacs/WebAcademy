

### Instalação

1. **Instale as Dependências:**
   ```bash
   npm install
   ```

3. **Configure o Arquivo de Variáveis de Ambiente:**
   - Renomeie `.env.example` para `.env`.
   - Modifique as variáveis de ambiente no arquivo `.env` para refletir as configurações do seu banco de dados local.

   Exemplo:
   ```plaintext
   DATABASE_URL="mysql://usuario:senha@endereco:porta/nome_do_banco"
   ```

### Migrações do Banco de Dados
Execute as migrações para configurar o banco de dados:
```bash
npx prisma migrate dev --name init
```

## Execução

### Criar Cliente e Endereço Aleatórios
Para criar um cliente e endereço com dados aleatórios:
```bash
npx ts-node src/crud/crud_cliente_endereco.ts
```

### Atualizar Endereço
Para atualizar um endereço existente, descomente e modifique a chamada de função no arquivo `crud_cliente_endereco.ts` conforme necessário:
```typescript
// Exemplo: Atualiza o endereço de ID 1 para o cliente de ID 1
updateEndereco(1, 1, 'Rua Nova');
```
Execute com:
```bash
npx ts-node src/crud/crud_cliente_endereco.ts
```

### Deletar Cliente
Para deletar um cliente e seus endereços associados, descomente e ajuste a chamada de função no arquivo `crud_cliente_endereco.ts`:
```typescript
// Exemplo: Deleta o cliente de ID 2
deleteCliente(2);
```
Execute com:
```bash
npx ts-node src/crud/crud_cliente_endereco.ts
```

### Ler Clientes e Endereços
Para ler e listar todos os clientes e seus endereços, descomente a chamada de função no arquivo `crud_cliente_endereco.ts`:
```typescript
// Lê e lista todos os clientes e seus endereços
readClientesEnderecos();
```
Execute com:
```bash
npx ts-node src/crud/crud_cliente_endereco.ts
```