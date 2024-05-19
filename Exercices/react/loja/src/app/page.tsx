"use client";
import { useEffect, useState } from "react";
import { ListagemProdutos } from "./components/ListagemProdutos";
import { ResumoCarrinho } from "./components/ResumoCarrinho";
import { useCarrinho } from './context/carrinhoContext';
import api from './services/api';  

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const { state: itensCarrinho, dispatch } = useCarrinho();
    const [favoritos, setFavoritos] = useState<Produto[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/produto");
                setProdutos(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const adicionarAoCarrinho = (produto: Produto) => {
        dispatch({ type: 'adicionar', item: {...produto, quantidade: 1} });
    };

    return (
        <main>
            <div className="container p-5">
                <ResumoCarrinho
                    quantidadeItensTotal={itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0)}
                    precoTotal={itensCarrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0)}
                />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ListagemProdutos 
                    produtos={produtos} 
                    favoritos={favoritos}
                    setFavoritos={setFavoritos}
                    adicionarAoCarrinho={adicionarAoCarrinho} 
                    />
                )}
            </div>
        </main>
    );
}
