"use client";
import CardProduto from "./CardProduto";
import ResumoFavoritos from "./ResumoFavoritos";

interface IListagemProdutos {
  produtos: Produto[];
  favoritos: Produto[];
  adicionarAoCarrinho: (produto: Produto) => void;
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export function ListagemProdutos({
  produtos,
  favoritos,
  setFavoritos,
  adicionarAoCarrinho,
}: IListagemProdutos) {
  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            adicionarAoCarrinho={adicionarAoCarrinho}
            setFavoritos={setFavoritos}
            favoritos={favoritos}
          />
        ))}
      </div>

      <ResumoFavoritos favoritos={favoritos} setFavoritos={setFavoritos} />
    </>
  );
}
