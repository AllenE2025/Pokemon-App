import { Icon } from "@iconify/react";
import { useFavorites } from "../hooks/useFavorites";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <p className="text-center mt-10">No favorite Pokémon yet 😢</p>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {favorites.map((pokemon) => (
        <li
          key={pokemon.id}
          className="relative p-4 border-2 rounded-md shadow-lg bg-gray-200 text-center"
        >
          <Icon
            icon="mdi:heart"
            onClick={() => toggleFavorite(pokemon)}
            className="absolute top-3 right-3 w-6 h-6 text-red-500 cursor-pointer"
          />

          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            className="mx-auto"
          />

          <p className="capitalize font-semibold mt-2">{pokemon.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default Favorites;
