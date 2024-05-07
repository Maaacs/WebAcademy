import express, {Request, Response} from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { nextTick } from "process"
import { v4 as uuidv4 } from "uuid"
import session from "express-session"

import validateEnv from "../src/utils/validateEnv"
import router from "./router"
import setLangCookie from "./middlewares/setLangCookie"

declare module "express-session" {
    interface SessionData {
        uid: string;
        tipoUsuario: string
        carrinhoCompras: string[]
    }
}

dotenv.config();
validateEnv();

const app = express()
const PORT = process.env.PORT ?? 444

app.use(cookieParser());
app.use(session({
    genid: (req) => uuidv4(),
    secret: "Sftm#sge@Mj3se@dsm",
    resave: true,
    saveUninitialized: true
}));

app.use(setLangCookie);
app.use(express.json());
app.use(router);


app.get("/", (req: Request, res: Response) => {
    res.json ({msg: "oi"});
});

app.listen(PORT, ()=>{
    console.log(`server runing on ${PORT}`)
});