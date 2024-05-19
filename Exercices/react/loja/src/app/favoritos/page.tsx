"use client";
import { useProdutosFavoritos } from "../hooks/useFavoritos";
import ListagemFavoritos from "../components/ListagemFavoritos";

export default function Favoritos() {
  const produtosFavoritos = useProdutosFavoritos(); 

  return (
    <main>
      <div className="container p-5">
        <ListagemFavoritos produtosFavoritos={produtosFavoritos} /> 
      </div>
    </main>
  );
}