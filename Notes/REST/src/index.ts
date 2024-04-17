import express, {Request, Response} from "express"
import dotenv from "dotenv"
import validateEnv from "../src/utils/validateEnv"
import router from "./router"

dotenv.config();
validateEnv();

const app = express()
const PORT = process.env.PORT ?? 444

app.use(router);


app.get("/", (req: Request, res: Response) => {
    res.json ({msg: "oi"});
});

app.listen(PORT, ()=>{
    console.log(`server runing on ${PORT}`)
});