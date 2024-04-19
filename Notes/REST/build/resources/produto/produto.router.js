"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const produto_controle_1 = __importDefault(require("./produto.controle"));
const produto_schemas_1 = __importDefault(require("./produto.schemas"));
const validateBody_1 = __importDefault(require("../../middlewares/validateBody"));
const router = (0, express_1.Router)();
router.get('/', produto_controle_1.default.index);
router.post('/', (0, validateBody_1.default)(produto_schemas_1.default), produto_controle_1.default.create);
router.get('/:id', produto_controle_1.default.read);
router.put('/:id', (0, validateBody_1.default)(produto_schemas_1.default), produto_controle_1.default.update);
router.delete('/:id', produto_controle_1.default.remove);
exports.default = router;
