"use client";
import { useEffect, useState } from "react";

import { ListagemProdutos } from "./components/ListagemProdutos";
import { ResumoCarrinho } from "./components/ResumoCarrinho";
//#mock import { mockProdutos } from "./mocks/produtos";

export default function Produtos() {
  //#mock const produtos = mockProdutos;
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ranekapi.origamid.dev/json/api/produto")
      .then((response) => response.json())
      .then((data) => {
        setProdutos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho quantidadeItensTotal={2} precoTotal={1300} />

          {/*#mock <ListagemProdutos produtos={produtos} />*/}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ListagemProdutos produtos={produtos} />
          )}
        </div>
      </main>
    </>
  );
}
