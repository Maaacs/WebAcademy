import { Prof } from "./helperTypes";

export function toUpper(str: string): string {
    return str.toUpperCase();
}


export function listProf(profs: Prof[]): string{
    const list = profs.map(prof => `<li>${prof.nome} - ${prof.sala}</li>`).join("\n");
    return `<ul>${list}</ul>`
}