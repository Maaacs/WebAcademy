import { Produto } from "../types/produto";

interface ItemCarrinhoProps {
  itens: Produto[];
  removerItemDoCarrinho: (id: string) => void;
}

export function ItemCarrinho({
  itens,
  removerItemDoCarrinho,
}: ItemCarrinhoProps) {
  const valorTotalProduto = (
    precoUnitario: number,
    quantidade: number
  ): number => precoUnitario * quantidade;

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
                  <td>R$ {parseFloat(item.preco).toFixed(2)}</td>
                  <td>{item.quantidade}</td>
                  <td>
                    R${" "}
                    {valorTotalProduto(
                      parseFloat(item.preco),
                      item.quantidade
                    ).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removerItemDoCarrinho(item.id)}
                    >
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
