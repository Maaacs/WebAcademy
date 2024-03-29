import { Aluno } from "./Aluno.js";

export class Turma {
    private alunos: Aluno[] = [];

    constructor(public id: number, public nome: string) {}

    adicionarAluno(aluno: Aluno) {
        this.alunos.push(aluno);
    }

    removerAluno(id: number) {
        this.alunos = this.alunos.filter(aluno => aluno.id !== id);
    }

    getNumAlunos(): number {
        return this.alunos.length;
    }

    getMediaIdades(): number {
        return this.alunos.reduce((acc, curr) => acc + curr.idade, 0) / this.getNumAlunos();
    }

    getMediaAlturas(): number {
        return this.alunos.reduce((acc, curr) => acc + curr.altura, 0) / this.getNumAlunos();
    }

    getMediaPesos(): number {
        return this.alunos.reduce((acc, curr) => acc + curr.peso, 0) / this.getNumAlunos();
    }

    getAlunos(): Aluno[] {
        return [...this.alunos];
    }
    
}
