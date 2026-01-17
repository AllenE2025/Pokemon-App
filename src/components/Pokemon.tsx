import "../App.css";

import { useEffect, useMemo, useState } from "react";
import PokemonSkeleton from "./PokemonSkeleton";
import { Icon } from "@iconify/react";
import { useFavorites } from "../hooks/useFavorites";

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

/* ---------- Constants ---------- */

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

/* ---------- Component ---------- */

function Pokemon() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const { toggleFavorite, isFavorite } = useFavorites();

  const filteredPokemons = useMemo(() => {
    return allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }, [allPokemons, search]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
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
          })
        );

        setAllPokemons(detailedPokemons);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="place-items-center">
      <h2 className="font-semibold text-3xl py-10">Pokemons</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="text-center border-2 rounded-md mb-10 py-2 px-8 shadow-lg
            transition-all duration-300 ease-out
            focus:ring-2 focus:ring-red-500
            focus:scale-[1.02]
            outline-none"
          placeholder="Search for pokemon"
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
        <p className="font-semibold text-xl">No Pokémon Found</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPokemons.map((pokemon) => {
            const mainType = pokemon.types?.[0] ?? "normal";
            const bgColor = TYPE_COLORS[mainType];

            return (
              <li
                key={pokemon.id}
                className={`place-items-center relative p-2 border-2 rounded-md shadow-lg hover:scale-105 transition ${bgColor}`}
              >
                <Icon
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite({
                      id: pokemon.id,
                      name: pokemon.name,
                    });
                  }}
                  icon={
                    isFavorite(pokemon.id) ? "mdi:heart" : "mdi:heart-outline"
                  }
                  className={`absolute top-4 right-4 w-6 h-6 cursor-pointer
                    ${
                      isFavorite(pokemon.id)
                        ? "text-red-500 scale-110"
                        : "text-white hover:scale-110"
                    }`}
                />

                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  loading="lazy"
                />

                <p className="capitalize font-semibold">{pokemon.name}</p>
                <div className="capitalize">{pokemon.types?.join(" / ")}</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Pokemon;
