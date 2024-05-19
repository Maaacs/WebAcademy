"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFavoritosContext, useVerificaProdutoFavorito } from "../hooks/useFavoritos";

interface CardProdutoProps {
  produto: Produto;
  adicionarAoCarrinho: (produto: Produto) => void;
}

export default function CardProduto({
  produto,
  adicionarAoCarrinho,
}: CardProdutoProps) {
  const router = useRouter();
  const { setFavoritos } = useFavoritosContext();
  const ehFavorito = useVerificaProdutoFavorito(produto.id);

  const verDetalhesProduto = (nome: string) => {
    router.push(`/produto/${nome}`);
  };

  const adicionarAosFavoritos = () => {
    setFavoritos((favoritos) => [...favoritos, produto]);
  };

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={produto.fotos[0].src}
          className="card-img-top"
          alt="imagem placeholder"
          width={300}
          height={320}
        />

        <div className="card-body bg-light">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text text-secondary">R$ {produto.preco}</p>

          <button
            className="btn btn-dark d-block w-100"
            type="button"
            onClick={() => adicionarAoCarrinho(produto)}
          >
            Adicionar no carrinho
          </button>

          <button
            className="btn btn-success d-block w-100 mt-2"
            type="button"
            onClick={adicionarAosFavoritos}
            disabled={ehFavorito}
          >
            {ehFavorito ? "Adicionado" : "Adicionar aos favoritos"}
          </button>

          <button 
            className="btn btn-light d-block w-100 mt-2" 
            type="button"
            onClick={() => verDetalhesProduto(produto.nome)}
          >
            Ver detalhes
          </button>

        </div>
      </div>
    </div>
  );
}