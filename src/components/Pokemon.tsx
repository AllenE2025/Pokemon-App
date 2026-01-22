import "../styles/App.css";

import { useEffect, useMemo, useState } from "react";
import PokemonSkeleton from "./PokemonSkeleton";
import { Icon } from "@iconify/react";
import { useFavorites } from "../hooks/useFavorites";
import { TYPE_COLORS } from "../utils/typeColors";

/* ---------- Types ---------- */

type Pokemon = {
  id: number;
  name: string;
  url: string;
  types?: string[];
};

type PokemonListResponse = {
  results: {
    name: string;
    url: string;
  }[];
};

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type PokemonDetailResponse = {
  types: PokemonType[];
};

/* ---------- Component ---------- */

function Pokemon() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const { toggleFavorite, isFavorite } = useFavorites();

  const filteredPokemons = useMemo(() => {
    return allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(search.toLowerCase()),
    );
  }, [allPokemons, search]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data: PokemonListResponse = await res.json();

        const detailedPokemons: Pokemon[] = await Promise.all(
          data.results.map(async ({ name, url }) => {
            const detailsRes = await fetch(url);
            const details: PokemonDetailResponse = await detailsRes.json();
            const id = Number(url.split("/").filter(Boolean).pop());

            return {
              id,
              name,
              url,
              types: details.types.map((t) => t.type.name),
            };
          }),
        );

        setAllPokemons(detailedPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold tracking-tight mb-2">Pokemons</h2>

      <p className="text-gray-600 mb-8 max-w-xl mx-auto">
        Gotta browse ’em all! Search, explore, and favorite Pokémon as you build
        your dream collection.
      </p>

      <form onSubmit={(e) => e.preventDefault()} className="mb-10">
        <input
          type="text"
          className="
            w-full sm:w-auto
            text-center
            border-2 rounded-lg
            px-8 py-2
            shadow-md
            transition-all duration-200
            focus:ring-2 focus:ring-red-500
            focus:border-red-500
            outline-none
          "
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {loading ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <PokemonSkeleton key={i} />
          ))}
        </ul>
      ) : filteredPokemons.length === 0 ? (
        <p className="text-lg font-medium">No Pokémon Found</p>
      ) : (
        <>
          <p className="font-medium text-lg mb-4 text-gray-700">
            {filteredPokemons.length} Pokémon listed
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPokemons.map((pokemon) => {
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
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite({
                        id: pokemon.id,
                        name: pokemon.name,
                        types: pokemon.types,
                      });
                    }}
                    icon={
                      isFavorite(pokemon.id) ? "mdi:heart" : "mdi:heart-outline"
                    }
                    className={`
                      absolute top-3 right-3
                      w-6 h-6
                      cursor-pointer
                      transition-transform
                      ${
                        isFavorite(pokemon.id)
                          ? "text-red-500 scale-110"
                          : "text-white hover:scale-110"
                      }
                    `}
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
}

export default Pokemon;
