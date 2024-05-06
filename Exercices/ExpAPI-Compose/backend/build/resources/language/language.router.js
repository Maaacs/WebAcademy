"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const language_controller_1 = __importDefault(require("./language.controller"));
const validateBody_1 = __importDefault(require("../../middlewares/validateBody"));
const language_schemas_1 = __importDefault(require("./language.schemas"));
const router = (0, express_1.Router)();
router.post("/", (0, validateBody_1.default)(language_schemas_1.default), language_controller_1.default);
exports.default = router;
