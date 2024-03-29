export class Turma {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
        this.alunos = [];
    }
    adicionarAluno(aluno) {
        this.alunos.push(aluno);
    }
    removerAluno(id) {
        this.alunos = this.alunos.filter(aluno => aluno.id !== id);
    }
    getNumAlunos() {
        return this.alunos.length;
    }
    getMediaIdades() {
        return this.alunos.reduce((acc, curr) => acc + curr.idade, 0) / this.getNumAlunos();
    }
    getMediaAlturas() {
        return this.alunos.reduce((acc, curr) => acc + curr.altura, 0) / this.getNumAlunos();
    }
    getMediaPesos() {
        return this.alunos.reduce((acc, curr) => acc + curr.peso, 0) / this.getNumAlunos();
    }
    getAlunos() {
        return [...this.alunos];
    }
}
