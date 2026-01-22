import { Icon } from "@iconify/react";
import { useFavorites } from "../hooks/useFavorites";
import { TYPE_COLORS } from "../utils/typeColors";

/* ---------- Component ---------- */

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold tracking-tight mb-2">
        Favorite Pokemons
      </h2>

      <p className="text-gray-600 mb-8 max-w-xl mx-auto">
        Your personal Pokédex. All your favorite Pokémon, saved in one place.
      </p>

      {favorites.length === 0 ? (
        <p className="text-center text-lg font-medium text-gray-500 mt-16">
          No favorite Pokémon yet 😢
        </p>
      ) : (
        <>
          <p className="font-medium text-lg mb-4 text-gray-700">
            {favorites.length} Favorite Pokémon
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((pokemon) => {
              const mainType = pokemon.types?.[0] ?? "normal";
              const bgColor = TYPE_COLORS[mainType];

              return (
                <li
                  key={pokemon.id}
                  className={`
                    relative
                    flex flex-col items-center
                    p-3
                    border-2 rounded-xl
                    shadow-md
                    transition-transform duration-200
                    hover:scale-105
                    select-none
                    ${bgColor}
                  `}
                >
                  <Icon
                    icon="mdi:heart"
                    onClick={() => toggleFavorite(pokemon)}
                    className="
                      absolute top-3 right-3
                      w-6 h-6
                      text-red-500
                      cursor-pointer
                      transition-transform
                      hover:scale-110
                    "
                  />

                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={pokemon.name}
                    loading="lazy"
                  />

                  <p className="capitalize font-semibold mt-1">
                    {pokemon.name}
                  </p>
                  <p className="capitalize text-sm text-gray-800">
                    {pokemon.types?.join(" / ")}
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Favorites;
