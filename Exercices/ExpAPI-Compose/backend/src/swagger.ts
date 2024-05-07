import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const doc = {
 info: {
 title: "API da Loja virtual",
 description: "Documentação da API",
 },
 host: `${process.env.HOST}:${process.env.PORT}`,
 definitions: {
    CreateProdutoDto:{
        $nome: "Celular Motorola", 
        $preco: 1299.00,
        $estoque: 1,
    },
    Produto:{
        "id": "4f1dceeb-89c2-44e7-a0c6-59d121925713",
		"nome": "Tasty Fresh Table",
		"preco": "903",
		"estoque": 5,
		"createdAt": "2024-05-06T22:40:51.897Z",
		"updatedAt": "2024-05-06T22:40:51.897Z"
    }, 
    LoginDto:{
        email: "Bret17@gmail.com",
        senha: "123435678",
    },
    SignUpDto: { 
        nome: "User Name",
        email: "user@example.com",
        senha: "password123",
        tipoUsuarioId: "507232ce-49cc-465c-8f08-d6841f12a988"
    },
    AddProdutoCarrinhoDto: { 
        produtoId: "4f1dceeb-89c2-44e7-a0c6-59d121925713"
    },
    FinalizarCompraDto: { 
        usuarioId: "507232ce-49cc-465c-8f08-d6841f12a988"
    },
    ChangeLanguageDto: { 
        lang: "en_US"
    },
    CreateUsuarioDto: { 
        nome: "Username",
        email: "user@example.com",
        tipoUsuarioId: "507232ce-49cc-465c-8f08-d6841f12a988"
    },
    UpdateUsuarioDto: { 
        nome: "Updated Name",
        email: "updated@example.com",
        tipoUsuarioId: "768f7817-8b29-4573-a8cd-ac7db8fc9e67",
        senha: "updated@example.com"
    },
    },
};

const outputFile = `${__dirname}/swagger-doc.json`;
const routes = [`${__dirname}/router/index.ts`];

swaggerAutogen()(outputFile, routes, doc);