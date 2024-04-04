import express, { Request, Response } from "express";
import dotenv from "dotenv";
import logAccess from "./middleware/logAccess";
import router from './router/router';

const app = express();

app.use(logAccess);
app.use(router);

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT || 3333;


app.listen(PORT, () => {
 console.log(`Express app iniciada na porta ${PORT}.`);
});
