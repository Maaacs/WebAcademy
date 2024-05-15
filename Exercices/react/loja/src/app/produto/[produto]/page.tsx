"use client";
import Image from "next/image";
import { useDetalhesProduto } from "../../hooks/useDetalheProdutos";
import { Produto as ProdutoType, Foto } from "../../types/produto"; // Verifique o caminho

export default function ProdutoPage({ produto }: { produto: string }) {
  const { data: produtoDetalhes, isLoading, isError } = useDetalhesProduto(produto);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (isError || !produtoDetalhes) {
    return <p>Erro ao carregar detalhes do produto ou nenhum detalhe disponível.</p>;
  }

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
            <h5 className="card-title mb-4 fw-bold">{produtoDetalhes.nome}</h5>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
              {produtoDetalhes.fotos.map((foto: Foto) => (
                <Image key={foto.titulo} src={foto.src} alt={foto.titulo} width={300} height={320} layout="responsive" />
              ))}
            </div>
            <p className="card-text fw-medium">Valor: R${Number(produtoDetalhes.preco).toFixed(2)}</p>
            <p className="card-text fw-medium">Descrição: {produtoDetalhes.descricao}</p>
            <p className="card-text fw-medium">Anunciado por: {produtoDetalhes.usuario_id}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
