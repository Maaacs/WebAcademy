// carrrinho/page.tsx
"use client";
import React, { useReducer, useEffect, useState } from "react";
import { ResumoCarrinho } from "../components/ResumoCarrinho";
import { ItemCarrinho } from "../components/ItemCarrinho";

function reducer(state: Produto[], action: Action): Produto[] {
  switch (action.type) {
    case 'aumentar_qtd':
      return state.map(item =>
        item.id === action.id ? { ...item, quantidade: item.quantidade + 1 } : item
      );
    case 'diminuir_qtd':
      return state.map(item =>
        item.id === action.id ? { ...item, quantidade: Math.max(0, item.quantidade - 1) } : item
      );
    case 'remover':
      return state.filter(item => item.id !== action.id);
    case 'set_items':
      return action.payload || [];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function Carrinho() {
  const [itensCarrinho, dispatch] = useReducer(reducer, []);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [quantidadeItensTotal, setQuantidadeItensTotal] = useState(0);

  useEffect(() => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    dispatch({ type: 'set_items', payload: carrinho });
  }, []);

  useEffect(() => {
    const total = itensCarrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    const totalItens = itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0);
    setPrecoTotal(total);
    setQuantidadeItensTotal(totalItens);
  }, [itensCarrinho]);

  return (
    <main>
      <div className="container p-5">
        <ItemCarrinho itens={itensCarrinho} dispatch={dispatch} />
        <ResumoCarrinho precoTotal={precoTotal} quantidadeItensTotal={quantidadeItensTotal} />
      </div>
    </main>
  );
}
