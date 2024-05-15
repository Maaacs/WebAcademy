"use client"
import React, { useEffect, useState } from "react";
import { useCarrinho } from '../context/carrinhoContext';
import { ItemCarrinho } from '../components/ItemCarrinho';
import { ResumoCarrinho } from '../components/ResumoCarrinho';

export default function Carrinho() {
    const { state: itensCarrinho, dispatch } = useCarrinho();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <div className="container p-5">
                <ItemCarrinho itens={itensCarrinho} dispatch={dispatch} />
                <ResumoCarrinho
                    quantidadeItensTotal={itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0)}
                    precoTotal={itensCarrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0)}
                />
            </div>
        </main>
    );
}
