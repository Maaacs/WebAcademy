"use client"

import { ListagemProdutos } from "./components/ListagemProdutos";
import { mockProdutos } from "./mocks/produtos";
import { ResumoCarrinho } from "./components/ResumoCarrinho";


export default function Produtos() {
  const produtos = mockProdutos;

  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho quantidadeItensTotal={2} precoTotal={1300}/>

          <ListagemProdutos produtos={produtos} />
        </div>
      </main>
    </>
  );
}