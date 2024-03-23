import { servicoLembrete } from "../services/ServicoLembrete.js";
import { Lembrete } from "../models/Lembrete";


export function configurarVisualizacaoLembrete() {
    const elementoCriarLembrete = document.getElementById('createReminder');
    if (!elementoCriarLembrete) throw new Error("Botão de criar lembrete não encontrado");
    
    elementoCriarLembrete.addEventListener('click', () => {
        const entradaTitulo = document.getElementById('reminderTitle') as HTMLInputElement;
        if (!entradaTitulo) throw new Error("Campo de título do lembrete não encontrado");
        const titulo = entradaTitulo.value.trim();
        
        if (titulo) {
            const [sucesso, resultado] = servicoLembrete.criarLembrete(titulo);

            if (sucesso) {
              const lembrete = resultado as Lembrete;
              //console.log(`Lembrete criado: ${lembrete.title} às ${lembrete.createdAt}`);
              adicionarLembreteNaLista(lembrete);
              entradaTitulo.value = '';
            } else {
              console.error('Erro ao criar lembrete: ', resultado);
              alert(resultado); 
            }
            
        } else {
            console.error('Nenhum título foi fornecido para o lembrete.');
            alert('Por favor, digite um título para o lembrete.');
        }
    });
}

function adicionarLembreteNaLista(lembrete: Lembrete) {
    const listaLembretes = document.getElementById('remindersList');
    if (!listaLembretes) throw new Error("Lista de lembretes não encontrada");

    const itemLista = document.createElement('li');
    itemLista.classList.add('list-group-item');
    itemLista.innerHTML = `
        ${lembrete.title} - Criado em: ${lembrete.createdAt.toLocaleString()}
        <button class="btn btn-secondary btn-sm ml-2 edit-btn" data-id="${lembrete.id}">Editar</button>
        <button class="btn btn-danger btn-sm ml-2 delete-btn" data-id="${lembrete.id}">Remover</button>
    `;
    listaLembretes.appendChild(itemLista);
    console.log(`Lembrete criado: ${lembrete.title} às ${lembrete.createdAt}`);

    const botaoEditar = itemLista.querySelector('.edit-btn');
    const botaoRemover = itemLista.querySelector('.delete-btn');
    if (!botaoEditar || !botaoRemover) throw new Error("Botões de editar/remover não encontrados");

    botaoEditar.addEventListener('click', () => editarLembrete(lembrete.id, itemLista));
    botaoRemover.addEventListener('click', () => removerLembrete(lembrete.id, itemLista));
}

function editarLembrete(id: string, itemLista: HTMLElement) {
    const novoTitulo = prompt('Digite o novo título para o lembrete:');
    if (novoTitulo) {
        const [sucesso, resultado] = servicoLembrete.editarLembrete(id, novoTitulo);
        if (sucesso && typeof resultado !== 'string') {
            const lembrete = resultado as Lembrete;
            const lembreteEditado = resultado;
            itemLista.innerHTML = `
                ${lembreteEditado.title} - Editado em: ${lembreteEditado.createdAt.toLocaleString()}
                <button class="btn btn-secondary btn-sm ml-2 edit-btn" data-id="${id}">Editar</button>
                <button class="btn btn-danger btn-sm ml-2 delete-btn" data-id="${id}">Remover</button>
            `;
            console.log(`Lembrete editado: ${lembrete.title} às ${lembrete.createdAt}`);
            const editBtn = itemLista.querySelector('.edit-btn');
            const deleteBtn = itemLista.querySelector('.delete-btn');
            
            if (editBtn) {
                editBtn.addEventListener('click', () => editarLembrete(id, itemLista));
            }
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => removerLembrete(id, itemLista));
            }
        } else {
            alert(resultado);
        }
    }
}


function removerLembrete(id: string, itemLista: HTMLElement) {
    const lembrete = servicoLembrete.buscarLembretePorId(id);
    
    if (lembrete) {
        const [sucesso, mensagem] = servicoLembrete.removerLembrete(id);
        if (sucesso) {
            itemLista.remove();
            console.log(`Lembrete removido: ${lembrete.title} às ${lembrete.createdAt}`);
        } else {
            console.error(mensagem);
        }
    } else {
        console.error("Lembrete não encontrado.");
    }
}
