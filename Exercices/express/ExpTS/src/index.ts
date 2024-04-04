import express, { Request, Response } from "express";
import dotenv from "dotenv";
import logAccess from "./middleware/logAccess";
import router from './router/router';
import { engine } from 'express-handlebars';
import { nodejsTechnologies } from './views/helpers/helpers';
import path from 'path';
import sass from 'node-sass-middleware';

const app = express();

app.use(logAccess);
app.use(router);

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT || 3333;


const helpers = {
    nodejsTechnologies, 
};

app.engine("handlebars", engine({
    helpers: helpers, // helpers personalizado
}));


/*app.engine("handlebars", engine(  {
    helpers: require(`${__dirname}/views/helpers/helpers.ts`)
    //layoutsDir: `${__dirname}/../src/views/layouts`,
    //defaultLayout: 'main',
}));*/
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '..', 'src', 'views'));
app.use('/img', [
    express.static(`${__dirname}/public/img`)
]);

app.use(sass({
    src: `${__dirname}/../public/scss`,
    dest: `${__dirname}/../public/css`,
    outputStyle: "compressed",
    prefix: "/css",
}));
app.use("/css", express.static(`${__dirname}/../public/css`));


app.listen(PORT, () => {
 console.log(`Express app iniciada na porta ${PORT}.`);
});
