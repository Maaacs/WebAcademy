import React, { useEffect, useState } from 'react';

interface ResumoCarrinhoProps {
  quantidadeItensTotal: number;
  precoTotal: number;
}

export function ResumoCarrinho({
  quantidadeItensTotal,
  precoTotal,
}: ResumoCarrinhoProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
        <p className="card-text fw-medium">
          Quantidade total: {isClient ? quantidadeItensTotal : '-'}
        </p>
        <p className="card-text fw-medium">
          Valor total: {isClient ? `R$${precoTotal.toFixed(2)}` : '-'}
        </p>
      </div>
    </div>
  );
}
