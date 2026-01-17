import { useState } from "react";
import { FavoritesContext } from "./favoritesContext";
import type { Pokemon } from "./favoritesContext";

const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  const toggleFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === pokemon.id)
        ? prev.filter((p) => p.id !== pokemon.id)
        : [...prev, pokemon]
    );
  };

  const isFavorite = (id: number) => favorites.some((p) => p.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
