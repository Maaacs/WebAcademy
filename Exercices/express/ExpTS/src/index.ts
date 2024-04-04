import express, { Request, Response } from "express";
import dotenv from "dotenv";
import logAccess from "./middleware/logAccess";

const app = express();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT || 3333;

app.use(logAccess);

app.get("/", (req: Request, res: Response) => {
 res.send("Hello world!");
});

app.listen(PORT, () => {
 console.log(`Express app iniciada na porta ${PORT}.`);
});
