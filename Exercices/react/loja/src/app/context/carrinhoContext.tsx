"use client"
import React, { createContext, useReducer, useContext, useEffect } from 'react';

export type Action =
  | { type: 'adicionar'; item: Produto  }
  | { type: 'remover'; id: string }
  | { type: 'aumentar_qtd'; id: string }
  | { type: 'diminuir_qtd'; id: string };

type CarrinhoState = Produto[];

const carrinhoReducer = (state: CarrinhoState, action: Action): CarrinhoState => {
  switch (action.type) {
    case 'adicionar':
      const itemIndexAdd = state.findIndex(item => item.id === action.item.id);
      if (itemIndexAdd !== -1) {
        const newState = [...state];
        newState[itemIndexAdd] = { 
          ...newState[itemIndexAdd],
          quantidade: newState[itemIndexAdd].quantidade + 1
        };
        return newState;
      }
      return [...state, { ...action.item, quantidade: 1 }];
    case 'remover':
      return state.filter(item => item.id !== action.id);
    case 'aumentar_qtd':
      return state.map(item =>
        item.id === action.id ? { ...item, quantidade: item.quantidade + 1 } : item
      );
    case 'diminuir_qtd':
      return state.map(item =>
        item.id === action.id ? { ...item, quantidade: Math.max(1, item.quantidade - 1) } : item
      );
    default:
      return state;
  }
};

const initialState = () => {
  if (typeof window !== "undefined") {
    const storedItems = sessionStorage.getItem('carrinho');
    return storedItems ? JSON.parse(storedItems) : [];
  }
  return [];
};


const CarrinhoContext = createContext<{
    state: CarrinhoState;
    dispatch: React.Dispatch<Action>;
}>({ state: initialState(), dispatch: () => null });

export const CarrinhoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(carrinhoReducer, initialState());

    useEffect(() => {
        sessionStorage.setItem('carrinho', JSON.stringify(state));
    }, [state]);

    return (
        <CarrinhoContext.Provider value={{ state, dispatch }}>
            {children}
        </CarrinhoContext.Provider>
    );
};

export const useCarrinho = () => useContext(CarrinhoContext);
