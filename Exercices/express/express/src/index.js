import express from 'express';
const app = express();
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 3333;

app.get("/", (req, res) => {
 res.send("Hello world!");
});

app.listen(PORT, () => {
 console.log(`Express app iniciada na porta ${PORT}.`);
});

