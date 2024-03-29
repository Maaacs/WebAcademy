export class TurmaService {
    constructor(turma) {
        this.turma = turma;
    }
    adicionarAluno(aluno) {
        this.turma.adicionarAluno(aluno);
    }
    removerAluno(id) {
        this.turma.removerAluno(id);
    }
    editarAluno(alunoEditado) {
        let aluno = this.turma.getAlunos().find(a => a.id === alunoEditado.id);
        if (aluno) {
            aluno.nomeCompleto = alunoEditado.nomeCompleto;
            aluno.idade = alunoEditado.idade;
            aluno.altura = alunoEditado.altura;
            aluno.peso = alunoEditado.peso;
        }
    }
    getAlunoById(id) {
        return this.turma.getAlunos().find(aluno => aluno.id === id);
    }
    getTurma() {
        return this.turma;
    }
}
