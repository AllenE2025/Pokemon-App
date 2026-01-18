import { createContext } from "react";

export type Pokemon = {
  id: number;
  name: string;
  types?: string[];
};

export type FavoritesContextType = {
  favorites: Pokemon[];
  toggleFavorite: (pokemon: Pokemon) => void;
  isFavorite: (id: number) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);
