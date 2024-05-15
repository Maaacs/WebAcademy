"use client";
import React, { useState, useEffect } from "react";
import { ResumoCarrinho } from "../components/ResumoCarrinho";
import { ItemCarrinho } from "../components/ItemCarrinho";

export default function Carrinho() {
  const [itensCarrinho, setItensCarrinho] = useState<Produto[]>([]);

  useEffect(() => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    setItensCarrinho(carrinho);
  }, []);

  const quantidadeItensTotal = itensCarrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );
  const precoTotal = itensCarrinho.reduce(
    (total, item) => total + parseFloat(item.preco) * item.quantidade,
    0
  );

  const removerItemDoCarrinho = (id: string) => {
    const carrinhoAtualizado = itensCarrinho.filter((item) => item.id !== id);
    setItensCarrinho(carrinhoAtualizado);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado));
  };

  return (
    <main>
      <div className="container p-5">
        <ItemCarrinho
          itens={itensCarrinho}
          removerItemDoCarrinho={removerItemDoCarrinho}
        />
        <ResumoCarrinho
          quantidadeItensTotal={quantidadeItensTotal}
          precoTotal={precoTotal}
        />
      </div>
    </main>
  );
}
