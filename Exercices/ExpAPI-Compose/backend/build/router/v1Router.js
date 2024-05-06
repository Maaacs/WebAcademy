"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const produto_router_1 = __importDefault(require("../resources/produto/produto.router"));
const language_router_1 = __importDefault(require("../resources/language/language.router"));
const auth_router_1 = __importDefault(require("../resources/auth/auth.router"));
const router = (0, express_1.Router)();
router.use('/', auth_router_1.default);
router.use("/produto", produto_router_1.default); // quando começar com /produto chama produto.router.ts
router.use("/language", language_router_1.default); // quando começar com /language chama language.router.ts   
exports.default = router;
