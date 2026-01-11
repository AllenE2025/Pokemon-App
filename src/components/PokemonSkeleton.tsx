function PokemonSkeleton() {
  return (
    <li className="p-8 border-2 rounded-md shadow-lg flex flex-col items-center animate-pulse h-45 w-45">
      {/* Image placeholder (same size as your real Pokémon img) */}
      <div className="h-20 w-20 bg-gray-300 rounded mb-4"></div>

      {/* Name placeholder */}
      <div className="h-5 w-24 bg-gray-300 rounded mb-2"></div>

      {/* Types placeholder */}
      <div className="h-4 w-28 bg-gray-300 rounded"></div>
    </li>
  );
}

export default PokemonSkeleton;
