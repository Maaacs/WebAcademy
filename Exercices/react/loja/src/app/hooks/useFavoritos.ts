import { useContext } from 'react';
import FavoritosContext from '../context/favoritosContext';

export const useFavoritosContext = () => useContext(FavoritosContext);

export const useProdutosFavoritos = () => {
  const { favoritos } = useFavoritosContext();
  return favoritos;
};

export const useVerificaProdutoFavorito = (id: string) => {
  const { favoritos } = useFavoritosContext();
  return favoritos.some(item => item.id === id);
};