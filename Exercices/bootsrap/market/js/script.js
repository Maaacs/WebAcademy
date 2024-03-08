document.addEventListener('DOMContentLoaded', (event) => {
    const produtos = [
        { id: 1, nome: 'Bicicleta', preco: 'R$ 1.000,00', estoque: 110 },
        { id: 2, nome: 'Skate', preco: 'R$ 500,00', estoque: 8 },
        { id: 3, nome: 'Patins', preco: 'R$ 1.500,00', estoque: 10 },
        { id: 4, nome: 'Prancha de Surf', preco: 'R$ 3.100,00', estoque: 0 },
    ];
    
    function renderizarProdutos() {
        const tbody = document.getElementById('product-table-body');
        tbody.innerHTML = '';
    
        produtos.forEach(produto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.preco}</td>
                <td class="${produto.estoque === 0 ? 'estoque-zero' : ''}">${produto.estoque}</td>
                <td>
                    <button class="btn btn-primary"><i class="bi bi-pencil"></i> Editar</button>
                    <button class="btn btn-danger"><i class="bi bi-trash"></i> Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
    
    renderizarProdutos();

    // Agora é seguro adicionar o ouvinte de evento ao botão
    const novoProdutoBtn = document.getElementById('novo-produto-btn');
    if (novoProdutoBtn) {
        novoProdutoBtn.addEventListener('click', () => {
            const modalElement = document.getElementById('novoProdutoModal');
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
        });
    }

    function confirmarCadastro() {
        const nome = document.getElementById('produtoNome').value.trim();
        const preco = document.getElementById('produtoPreco').value.trim();
        const estoque = document.getElementById('produtoEstoque').value.trim();
      
        if (nome && preco && estoque) {
          const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
          produtos.push({ id: novoId, nome, preco, estoque: parseInt(estoque, 10) });
          renderizarProdutos();
          // Use Bootstrap 5 API to hide the modal
          const modalElement = document.getElementById('novoProdutoModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
        } else {
          alert('Todos os campos devem ser preenchidos!');
        }
    }

    // Ligar o evento de clique do botão de confirmação no modal
    const confirmarBtn = document.querySelector('.modal-footer .btn-success');
    if (confirmarBtn) {
        confirmarBtn.addEventListener('click', confirmarCadastro);
    }
});
