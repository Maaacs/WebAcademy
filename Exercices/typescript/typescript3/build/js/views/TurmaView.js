import { Aluno } from "../models/Aluno.js";
export class TurmaView {
    constructor(selector, turmaService) {
        this.selector = selector;
        this.turmaService = turmaService;
        this.inicializarFormulario();
    }
    inicializarFormulario() {
        const container = document.querySelector(this.selector);
        if (!container)
            return;
        container.innerHTML = `
            <div class="form-group">
                <label>Nome Completo</label>
                <input type="text" class="form-control" id="nome" placeholder="Nome Completo">
            </div>
            <div class="form-group">
                <label>Idade</label>
                <input type="number" class="form-control" id="idade" placeholder="Idade">
            </div>
            <div class="form-group">
                <label>Altura (m)</label>
                <input type="number" class="form-control" id="altura" placeholder="Altura">
            </div>
            <div class="form-group">
                <label>Peso (kg)</label>
                <input type="number" class="form-control" id="peso" placeholder="Peso">
            </div>
            <button id="btnSalvar" class="btn btn-primary">Salvar</button>
        `;
        const btnSalvar = document.getElementById("btnSalvar");
        if (!btnSalvar)
            throw new Error("Botão de salvar não encontrado");
        btnSalvar.addEventListener('click', () => {
            const nomeCompletoInput = document.getElementById("nome");
            const idadeInput = document.getElementById("idade");
            const alturaInput = document.getElementById("altura");
            const pesoInput = document.getElementById("peso");
            if (!nomeCompletoInput.value.trim() || !idadeInput.value.trim() || !alturaInput.value.trim() || !pesoInput.value.trim()) {
                alert("Todos os campos devem ser preenchidos.");
                return;
            }
            const idade = parseFloat(idadeInput.value);
            const altura = parseFloat(alturaInput.value);
            const peso = parseFloat(pesoInput.value);
            if (isNaN(idade) || idade <= 0 || isNaN(altura) || altura <= 0 || isNaN(peso) || peso <= 0) {
                alert("Idade, Altura e Peso devem ser números positivos.");
                return;
            }
            const novoAluno = new Aluno(Date.now(), nomeCompletoInput.value, parseInt(idadeInput.value), parseFloat(alturaInput.value), parseFloat(pesoInput.value));
            this.turmaService.adicionarAluno(novoAluno);
            nomeCompletoInput.value = '';
            idadeInput.value = '';
            alturaInput.value = '';
            pesoInput.value = '';
            this.renderizarListaAlunos();
            this.renderizarDetalhesTurma();
        });
    }
    renderizarListaAlunos() {
        const listaAlunosElement = document.getElementById("listaAlunos");
        if (!listaAlunosElement)
            throw new Error("Lista de alunos não encontrada");
        const alunos = this.turmaService.getTurma().getAlunos();
        let linhasTabela = '';
        alunos.forEach(aluno => {
            linhasTabela += `
                <tr>
                    <td>${aluno.nomeCompleto}</td>
                    <td>${aluno.idade}</td>
                    <td>${aluno.altura}m</td>
                    <td>${aluno.peso}kg</td>
                    <td>
                        <button class="btn btn-secondary btn-sm ml-2 edit-btn" data-id="${aluno.id}">Editar</button>
                        <button class="btn btn-danger btn-sm ml-2 delete-btn" data-id="${aluno.id}">Remover</button>
                    </td>
                </tr>
            `;
        });
        listaAlunosElement.innerHTML = `
            <div id="listaAlunos" class="mt-3">
                <!-- Cabeçalho da Tabela de Alunos -->
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nome Completo</th>
                            <th>Idade</th>
                            <th>Altura</th>
                            <th>Peso</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                </table>
                <!-- Corpo da Tabela de Alunos -->
                <div class="scrollable-tbody">
                    <table class="table">
                        <tbody>
                        ${linhasTabela}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        alunos.forEach(aluno => {
            const editBtn = document.querySelector(`.edit-btn[data-id="${aluno.id}"]`);
            const deleteBtn = document.querySelector(`.delete-btn[data-id="${aluno.id}"]`);
            if (editBtn) {
                editBtn.addEventListener('click', () => this.editarAluno(aluno.id));
            }
            else {
                console.error(`Botão de editar não encontrado para o aluno com ID ${aluno.id}`);
            }
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => this.removerAluno(aluno.id));
            }
            else {
                console.error(`Botão de remover não encontrado para o aluno com ID ${aluno.id}`);
            }
        });
    }
    editarAluno(id) {
        const aluno = this.turmaService.getAlunoById(id);
        if (!aluno)
            throw new Error("Aluno não encontrado para edição.");
        const novoNome = prompt("Digite o novo nome completo do aluno:", aluno.nomeCompleto) || aluno.nomeCompleto;
        const novaIdade = prompt("Digite a nova idade do aluno:", aluno.idade.toString()) || aluno.idade.toString();
        const novaAltura = prompt("Digite a nova altura do aluno:", aluno.altura.toString()) || aluno.altura.toString();
        const novoPeso = prompt("Digite o novo peso do aluno:", aluno.peso.toString()) || aluno.peso.toString();
        const idadeNum = parseInt(novaIdade);
        const alturaNum = parseFloat(novaAltura);
        const pesoNum = parseFloat(novoPeso);
        if (isNaN(idadeNum) || idadeNum <= 0) {
            alert("Idade deve ser um número positivo.");
            return;
        }
        if (isNaN(alturaNum) || alturaNum <= 0) {
            alert("Altura deve ser um número positivo.");
            return;
        }
        if (isNaN(pesoNum) || pesoNum <= 0) {
            alert("Peso deve ser um número positivo.");
            return;
        }
        this.turmaService.editarAluno(new Aluno(id, novoNome, idadeNum, alturaNum, pesoNum));
        this.renderizarListaAlunos();
        this.renderizarDetalhesTurma();
    }
    removerAluno(id) {
        this.turmaService.removerAluno(id);
        this.renderizarListaAlunos();
        this.renderizarDetalhesTurma();
    }
    renderizarDetalhesTurma() {
        const turma = this.turmaService.getTurma();
        const detalhesTurmaElement = document.querySelector('#detalhesTurma');
        if (!detalhesTurmaElement)
            return;
        let html = `
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Número de Alunos</th>
                        <th>Média de Idades</th>
                        <th>Média de Alturas</th>
                        <th>Média de Pesos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${turma.id}</td>
                        <td>${turma.nome}</td>
                        <td>${turma.getNumAlunos()}</td>
                        <td>${turma.getMediaIdades().toFixed(2)}</td>
                        <td>${turma.getMediaAlturas().toFixed(2)}m</td>
                        <td>${turma.getMediaPesos().toFixed(2)}kg</td>
                    </tr>
                </tbody>
            </table>
        `;
        detalhesTurmaElement.innerHTML = html;
    }
    update(turma) {
        const container = document.querySelector(`${this.selector}List`);
        if (!container)
            return;
        let alunosHtml = turma.getAlunos().map(aluno => `<tr>
                <td>${aluno.nomeCompleto}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.altura}m</td>
                <td>${aluno.peso}kg</td>
                <td>
                <button class="btn btn-secondary btn-sm ml-2 edit-btn" data-id="${aluno.id}">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="turmaView.removerAluno(${aluno.id})">Remover</button>
                </td>
            </tr>`).join('');
        container.innerHTML = `<table class="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Altura</th>
                    <th>Peso</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>${alunosHtml}</tbody>
        </table>`;
    }
    init() {
        this.update(this.turmaService.getTurma());
    }
}
