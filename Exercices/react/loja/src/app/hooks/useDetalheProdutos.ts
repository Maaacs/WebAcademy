import { useQuery } from "react-query";
import { getDetalhesProduto } from "../services/produtos";

export function useDetalhesProduto(produto: string) {
  return useQuery(["produto", produto], () => getDetalhesProduto());
}
