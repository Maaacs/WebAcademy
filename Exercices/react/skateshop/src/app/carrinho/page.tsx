"use client";
import React from "react";
import { ResumoCarrinho } from "../components/ResumoCarrinho";
import { ItemCarrinho } from "../components/ItemCarrinho";

export default function Carrinho() {
  return (
    <>
      <main>
        <div className="container p-5">
          <ItemCarrinho />
          <ResumoCarrinho />
        </div>
      </main>
    </>
  );
}