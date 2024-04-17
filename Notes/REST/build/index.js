"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const validateEnv_1 = __importDefault(require("../src/utils/validateEnv"));
const app = (0, express_1.default)();
app.use(validateEnv_1.default);
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT ?? 444;
app.get("/", (req, res) => {
    res.json({ msg: "oi" });
});
app.listen(PORT, () => {
    console.log(`server runing on ${PORT}`);
});
