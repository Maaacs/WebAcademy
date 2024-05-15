import { Action } from '../context/carrinhoContext'; 

interface ItemCarrinhoProps {
  itens: Produto[];
  dispatch: React.Dispatch<Action>;
}

export function ItemCarrinho({ itens, dispatch }: ItemCarrinhoProps) {
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos selecionados</h5>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>R$ {Number(item.preco).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm me-2" onClick={() => dispatch({ type: 'diminuir_qtd', id: item.id })}>-</button>
                    {item.quantidade}
                    <button className="btn btn-secondary btn-sm ms-2" onClick={() => dispatch({ type: 'aumentar_qtd', id: item.id })}>+</button>
                  </td>
                  <td>R$ {(item.preco * item.quantidade).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => dispatch({ type: 'remover', id: item.id })}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
