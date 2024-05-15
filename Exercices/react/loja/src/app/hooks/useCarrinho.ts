/*
import { useState, useEffect } from 'react';

function getInitialState() {
  const carrinho = localStorage.getItem('carrinho');
  return carrinho ? JSON.parse(carrinho) : [];
}

export function useCarrinho() {
  const [itensCarrinho, setItensCarrinho] = useState(getInitialState());

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(itensCarrinho));
  }, [itensCarrinho]);

  return [itensCarrinho, setItensCarrinho];
}*/
