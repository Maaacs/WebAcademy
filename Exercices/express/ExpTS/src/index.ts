import express, { Request, Response } from "express";
import dotenv from "dotenv";
import logAccess from "./middleware/logAccess";
import router from './router/router';
import { engine } from 'express-handlebars';
import path from 'path';

const app = express();

app.use(logAccess);
app.use(router);

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT || 3333;



app.engine("handlebars", engine(  {
    layoutsDir: `${__dirname}/../src/views/layouts`,
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '..', 'src', 'views'));


app.listen(PORT, () => {
 console.log(`Express app iniciada na porta ${PORT}.`);
});
