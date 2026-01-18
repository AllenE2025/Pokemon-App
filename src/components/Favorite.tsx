import { Icon } from "@iconify/react";
import { useFavorites } from "../hooks/useFavorites";

const TYPE_COLORS: Record<string, string> = {
  fire: "bg-radial from-white to-red-500",
  water: "bg-radial from-white to-blue-500",
  grass: "bg-radial from-white to-green-500",
  electric: "bg-radial from-white to-yellow-400",
  ice: "bg-radial from-white to-cyan-400",
  fighting: "bg-radial from-white to-orange-600",
  poison: "bg-radial from-white to-purple-500",
  ground: "bg-radial from-white to-yellow-600",
  flying: "bg-radial from-white to-indigo-400",
  psychic: "bg-radial from-white to-pink-500",
  bug: "bg-radial from-white to-lime-500",
  rock: "bg-radial from-white to-stone-500",
  ghost: "bg-radial from-white to-violet-600",
  dark: "bg-radial from-white to-gray-800",
  dragon: "bg-radial from-white to-indigo-700",
  steel: "bg-radial from-white to-slate-400",
  fairy: "bg-radial from-white to-pink-300",
  normal: "bg-radial from-white to-gray-400",
};

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div>
      <h2 className="font-semibold text-3xl py-10">Favorite Pokemons</h2>

      {favorites.length === 0 ? (
        <p className="text-center mt-10">No favorite Pokémon yet</p>
      ) : (
        <div>
          <p className="font-semibold text-xl">
            {favorites.length} Favorite Pokemons
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((pokemon) => {
              const mainType = pokemon.types?.[0] ?? "normal";
              const bgColor = TYPE_COLORS[mainType];

              return (
                <li
                  key={pokemon.id}
                  className={`place-items-center relative p-2 border-2 rounded-md shadow-lg hover:scale-105 transition ${bgColor} select-none`}
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

                  <p className="capitalize font-semibold mt-2">
                    {pokemon.name}
                  </p>
                  <div className="capitalize">{pokemon.types?.join(" / ")}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Favorites;
