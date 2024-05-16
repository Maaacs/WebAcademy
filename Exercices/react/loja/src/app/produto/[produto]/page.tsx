"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProdutoPage() {
  const { produto } = useParams();
  const [produtoDetalhes, setProdutoDetalhes] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`https://ranekapi.origamid.dev/json/api/produto/${produto}`);
            const data = await response.json();
            setProdutoDetalhes(data);
        } catch (error) {
            console.error("Erro ao carregar detalhes do produto:", error);
        } finally {
            setLoading(false);
        }
    };

    if (produto) {
        fetchData();
    }
}, [produto]);

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>

            {loading ? (
              <h5 className="card-title mb-4 fw-bold">Carregando...</h5>
            ) : produtoDetalhes ? (
              <>
                <h5 className="card-title mb-4 fw-bold">{produtoDetalhes.nome}</h5>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
                  {produtoDetalhes.fotos.map((foto) => (
                    <Image 
                      key={foto.titulo} 
                      src={foto.src} 
                      alt={foto.titulo} 
                      width={300} 
                      height={320} 
                    />
                  ))}
                </div>

                <p className="card-text fw-medium">Valor: R${Number(produtoDetalhes.preco).toFixed(2)}</p>
                <p className="card-text fw-medium">Descrição: {produtoDetalhes.descricao}</p>
                <p className="card-text fw-medium">Anunciado por: {produtoDetalhes.usuario_id}</p>
              </>
            ) : (
              <p>Produto não encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}