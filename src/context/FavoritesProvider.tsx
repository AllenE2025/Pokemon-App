import { useEffect, useState } from "react";
import { FavoritesContext } from "./FavoritesContext";
import type { Pokemon } from "./FavoritesContext";

const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  // 1️⃣ Load from localStorage once
  const [favorites, setFavorites] = useState<Pokemon[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  // 2️⃣ Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === pokemon.id)
        ? prev.filter((p) => p.id !== pokemon.id)
        : [...prev, pokemon],
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
