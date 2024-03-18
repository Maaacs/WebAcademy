import { servicoLembrete } from "../services/ServicoLembrete.js";
import { Lembrete } from "../models/Lembrete";


export function configurarVisualizacaoLembrete() {
    document.getElementById('createReminder').addEventListener('click', () => {
        const entradaTitulo = document.getElementById('reminderTitle') as HTMLInputElement;
        const titulo = entradaTitulo.value.trim();
        
        if (titulo) {
            const [sucesso, resultado] = servicoLembrete.criarLembrete(titulo);

            if (sucesso) {
              const lembrete = resultado as Lembrete;
              console.log(`Lembrete criado: ${lembrete.title} às ${lembrete.createdAt}`);
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

function adicionarLembreteNaLista(lembrete) {
    const listaLembretes = document.getElementById('remindersList');
    const itemLista = document.createElement('li');
    itemLista.classList.add('list-group-item');
    itemLista.innerHTML = `
        ${lembrete.title} - Criado em: ${lembrete.createdAt.toLocaleString()}
        <button class="btn btn-secondary btn-sm ml-2 edit-btn" data-id="${lembrete.id}">Editar</button>
        <button class="btn btn-danger btn-sm ml-2 delete-btn" data-id="${lembrete.id}">Remover</button>
    `;
    listaLembretes.appendChild(itemLista);

    itemLista.querySelector('.edit-btn').addEventListener('click', () => editarLembrete(lembrete.id, itemLista));
    itemLista.querySelector('.delete-btn').addEventListener('click', () => removerLembrete(lembrete.id, itemLista));
}

function editarLembrete(id, itemLista) {
    const novoTitulo = prompt('Digite o novo título para o lembrete:');
    if (novoTitulo) {
        const [sucesso, resultado] = servicoLembrete.editarLembrete(id, novoTitulo);
        if (sucesso && typeof resultado !== 'string') {
            const lembreteEditado = resultado;
            itemLista.innerHTML = `
                ${lembreteEditado.title} - Editado em: ${lembreteEditado.createdAt.toLocaleString()}
                <button class="btn btn-secondary btn-sm ml-2 edit-btn" data-id="${id}">Editar</button>
                <button class="btn btn-danger btn-sm ml-2 delete-btn" data-id="${id}">Remover</button>
            `;
            itemLista.querySelector('.edit-btn').addEventListener('click', () => editarLembrete(id, itemLista));
            itemLista.querySelector('.delete-btn').addEventListener('click', () => removerLembrete(id, itemLista));
        } else {
            alert(resultado);
        }
    }
}


function removerLembrete(id, itemLista) {
    servicoLembrete.removerLembrete(id);
    itemLista.remove();
}
