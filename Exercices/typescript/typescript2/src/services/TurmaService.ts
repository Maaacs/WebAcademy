import { Turma } from "../models/Turma";
import { Aluno } from "../models/Aluno";

export class TurmaService {
    constructor(public turma: Turma) {}

    adicionarAluno(aluno: Aluno) {
        this.turma.adicionarAluno(aluno);
    }

    removerAluno(id: number) {
        this.turma.removerAluno(id);
    }

    editarAluno(alunoEditado: Aluno) {
        let aluno = this.turma.getAlunos().find(a => a.id === alunoEditado.id);
        if (aluno) {
            aluno.nomeCompleto = alunoEditado.nomeCompleto;
            aluno.idade = alunoEditado.idade;
            aluno.altura = alunoEditado.altura;
            aluno.peso = alunoEditado.peso;
        }
    }

    getAlunoById(id: number): Aluno | undefined {
      return this.turma.getAlunos().find(aluno => aluno.id === id);
    }

    public getTurma(): Turma {
      return this.turma;
    }

  }
