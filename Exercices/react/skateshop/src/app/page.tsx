"use client";
import Image from "next/image";
import React from "react";
import { ListagemProdutos } from "./components/ListagemProdutos";
import { ResumoCarrinho } from "./components/ResumoCarrinho";


export default function Produtos() {
  const nomeProduto = "Notebook 1";

  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho />
          <ListagemProdutos />
        </div>
      </main>
    </>
  );
}