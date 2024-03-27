"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProf = exports.toUpper = void 0;
function toUpper(str) {
    return str.toUpperCase();
}
exports.toUpper = toUpper;
function listProf(profs) {
    const list = profs.map(prof => `<li>${prof.nome} - ${prof.sala}</li>`).join("\n");
    return `<ul>${list}</ul>`;
}
exports.listProf = listProf;
