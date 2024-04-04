"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logAccess_1 = __importDefault(require("./middleware/logAccess"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT || 3333;
app.use(logAccess_1.default);
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
