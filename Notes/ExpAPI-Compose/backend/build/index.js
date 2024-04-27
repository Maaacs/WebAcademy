"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const validateEnv_1 = __importDefault(require("../src/utils/validateEnv"));
const router_1 = __importDefault(require("./router"));
dotenv_1.default.config();
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 444;
app.use(express_1.default.json());
app.use(router_1.default);
app.get("/", (req, res) => {
    res.json({ msg: "oi" });
});
app.listen(PORT, () => {
    console.log(`server runing on ${PORT}`);
});
