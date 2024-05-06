"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const uuid_1 = require("uuid");
const express_session_1 = __importDefault(require("express-session"));
const validateEnv_1 = __importDefault(require("../src/utils/validateEnv"));
const router_1 = __importDefault(require("./router"));
const setLangCookie_1 = __importDefault(require("./middlewares/setLangCookie"));
dotenv_1.default.config();
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 444;
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    genid: (req) => (0, uuid_1.v4)(),
    secret: "Sftm#sge@Mj3se@dsm",
    resave: true,
    saveUninitialized: true
}));
app.use(setLangCookie_1.default);
app.use(express_1.default.json());
app.use(router_1.default);
app.get("/", (req, res) => {
    res.json({ msg: "oi" });
});
app.listen(PORT, () => {
    console.log(`server runing on ${PORT}`);
});
