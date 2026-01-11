import "../App.css";

import { useEffect, useState } from "react";
import PokemonSkeleton from "./PokemonSkeleton";

type Pokemon = {
  name: string;
  url: string;
  types?: string[];
};

type PokemonListResponse = {
  results: Pokemon[];
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

function Pokemon() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

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
  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(search.toLowerCase())
  );

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");

        const data: PokemonListResponse = await res.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon: Pokemon) => {
            const detailsRes = await fetch(pokemon.url);
            const details: PokemonDetailResponse = await detailsRes.json();

            return {
              ...pokemon,
              types: details.types.map((t) => t.type.name),
            };
          })
        );
        setAllPokemons(detailedPokemons);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon: ", error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  // if (loading)
  //   return <p className="text-3xl font-semibold py-10">Loading Pokemon...</p>;

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
           outline-none
          "
          placeholder="Search for pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </form>

      {loading ? (
        <div>
          <p className="mb-10 font-semibold text-xl">Loading Pokemon...</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <PokemonSkeleton key={i} />
            ))}
          </ul>
        </div>
      ) : filteredPokemons.length === 0 ? (
        <p className="font-semibold text-xl">No Pokemon Found</p>
      ) : (
        <div>
          <p className="mb-10 font-semibold text-xl">
            {filteredPokemons.length} Pokemons Listed
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPokemons.map((pokemon) => {
              const mainType = pokemon.types?.[0] ?? "normal";
              const bgColor = TYPE_COLORS[mainType];

              return (
                <li
                  key={pokemon.name}
                  className={`
                    active:scale-95 p-2 h-45 w-45 border-2 rounded-md place-items-center transition hover:scale-105 shadow-lg hover:shadow-xl ${bgColor}`}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      pokemon.url.split("/").filter(Boolean).pop() ?? "0"
                    }.png`}
                    alt={pokemon.name}
                    loading="lazy"
                  />

                  <p className="capitalize font-semibold">{pokemon.name}</p>

                  <div className="capitalize">{pokemon.types?.join(" / ")}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Pokemon;
