"use client";
import { useParams } from "react-router-dom";
import Image from "next/image";
import { useDetalhesProduto } from "../../hooks/useDetalheProdutos";

export default function Produto() {
  const { produto = "" } = useParams<{ produto: string }>();
  const {
    data: produtoDetalhes,
    isLoading,
    isError,
  } = useDetalhesProduto(produto);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !produtoDetalhes) {
    return <p>Error loading product details or no details available.</p>;
  }

  return (
    <div>
      <Image src={produtoDetalhes.foto} alt={produtoDetalhes.nome} />
      <h1>{produtoDetalhes.nome}</h1>
      <p>{produtoDetalhes.descricao}</p>
    </div>
  );
}
