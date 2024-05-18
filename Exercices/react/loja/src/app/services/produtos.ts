import api from './api';

export async function getDetalhesProduto(): Promise<Produto[]> {
    return api.get("/produto").then((response) => response.data);
}