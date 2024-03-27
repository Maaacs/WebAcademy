"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_handlebars_1 = require("express-handlebars");
const router_1 = __importDefault(require("./router/router"));
//import sass from 'node-sass-middleware';
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(router_1.default);
const PORT = process.env.PORT || 3333;
/*app.engine('handlebars', engine({
  helpers: require(`${__dirname}/views/helpers`),
  layoutsDir: `${__dirname}/views/layouts`
}));*/
app.engine("handlebars", (0, express_handlebars_1.engine)({
    //helpers: require(`${__dirname}/../src/views/helpers/helpers`),
    layoutsDir: `${__dirname}/../src/views/layouts`,
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);
/*
app.use(sass({
  src: `${__dirname}/../public/scss`,
  dest: `${__dirname}/../public/css`,
  outputStyle: "compressed",
  prefix: "/css",
}));


app.use("/css", express.static(`${__dirname}/../public/css`));*/
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
