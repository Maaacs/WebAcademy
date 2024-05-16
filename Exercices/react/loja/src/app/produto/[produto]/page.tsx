"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useDetalhesProduto } from "../../hooks/useDetalheProdutos";

export default function ProdutoPage() {
  const params = useParams();
  const produtoId = params.produto as string;

  const {
    data: produtoDetalhes,
    error,
    isLoading,
  } = useDetalhesProduto(produtoId);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro ao buscar os detalhes do produto.</p>;
  }

  if (!produtoDetalhes) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-bold">{produtoDetalhes.nome}</h5>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
              {produtoDetalhes.fotos.map((foto: Foto) => (
                <Image
                  key={foto.titulo}
                  src={foto.src}
                  alt={foto.titulo}
                  width={300}
                  height={320}
                />
              ))}
            </div>
            <p className="card-text fw-medium">
              Valor: R${Number(produtoDetalhes.preco).toFixed(2)}
            </p>
            <p className="card-text fw-medium">
              Descrição: {produtoDetalhes.descricao}
            </p>
            <p className="card-text fw-medium">
              Anunciado por: {produtoDetalhes.usuario_id}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
