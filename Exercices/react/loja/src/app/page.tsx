"use client";
import { useEffect, useState } from "react";
import { ListagemProdutos } from "./components/ListagemProdutos";
import { ResumoCarrinho } from "./components/ResumoCarrinho";
import { Produto } from "./types/produto";

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantidadeItensTotal, setQuantidadeItensTotal] = useState<number>(0);
  const [precoTotal, setPrecoTotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ranekapi.origamid.dev/json/api/produto"
        );
        const json = await response.json();
        setProdutos(json);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const atualizarResumo = (carrinho: Produto[]) => {
    const quantidadeTotal = carrinho.reduce((total, item) => total + 1, 0);
    const precoTotal = carrinho.reduce(
      (total, item) => total + parseFloat(item.preco),
      0
    );
    setQuantidadeItensTotal(quantidadeTotal);
    setPrecoTotal(precoTotal);
  };

  const adicionarAoCarrinho = (produto: Produto) => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    const produtoExistente = carrinho.find(
      (item: Produto) => item.id === produto.id
    );

    if (produtoExistente) {
      produtoExistente.quantidade += 1;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarResumo(carrinho);
  };

  useEffect(() => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    atualizarResumo(carrinho);
  }, []);

  return (
    <main>
      <div className="container p-5">
        <ResumoCarrinho
          quantidadeItensTotal={quantidadeItensTotal}
          precoTotal={precoTotal}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ListagemProdutos
            produtos={produtos}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        )}
      </div>
    </main>
  );
}
