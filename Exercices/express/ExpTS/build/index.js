"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logAccess_1 = __importDefault(require("./middleware/logAccess"));
const router_1 = __importDefault(require("./router/router"));
const express_handlebars_1 = require("express-handlebars");
const helpers_1 = require("./views/helpers/helpers");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(logAccess_1.default);
app.use(router_1.default);
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT || 3333;
const helpers = {
    nodejsTechnologies: helpers_1.nodejsTechnologies,
};
app.engine("handlebars", (0, express_handlebars_1.engine)({
    helpers: helpers, // helpers personalizado
}));
/*app.engine("handlebars", engine(  {
    helpers: require(`${__dirname}/views/helpers/helpers.ts`)
    //layoutsDir: `${__dirname}/../src/views/layouts`,
    //defaultLayout: 'main',
}));*/
app.set('view engine', 'handlebars');
app.set('views', path_1.default.join(__dirname, '..', 'src', 'views'));
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
