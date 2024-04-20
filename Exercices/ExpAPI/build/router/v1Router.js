"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const produto_router_1 = __importDefault(require("../resources/produto/produto.router"));
const router = (0, express_1.Router)();
router.use("/produto", produto_router_1.default); // quando começar com /produto chama produto.router.ts
exports.default = router;
