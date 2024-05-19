import React, { createContext } from 'react';

const FavoritosContext = createContext<{
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}>({
  favoritos: [],
  setFavoritos: () => {},
});

export default FavoritosContext; 