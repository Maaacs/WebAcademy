"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useParams } from "next/navigation";
import api from '../../services/api'; 

export default function ProdutoPage() {
  const params = useParams();
  const produtoId = params.produto as string;

  const [produtoDetalhes, setProdutoDetalhes] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api.get(`/produto/${produtoId}`)
      .then(response => {
        setProdutoDetalhes(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [produtoId]);

  if (loading) {
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
            <h5 className="card-title mb-4 fw-bold">{produtoDetalhes?.nome}</h5>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
              {produtoDetalhes.fotos.map((foto) => (
                <Image
                  key={foto.titulo}
                  src={foto.src}
                  alt={foto.titulo}
                  width={300}
                  height={320}
                  placeholder='blur'
                  blurDataURL={foto.src}
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
