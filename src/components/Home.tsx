function Home() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-3xl py-10">Welcome to PokéDex</h2>

      <p className="text-lg text-gray-600">
        Discover, explore, and learn about your favorite Pokémon all in one
        place. This PokéDex app lets you browse Pokémon, view detailed
        information, and build your own collection of favorites.
      </p>

      <div>
        <h3 className="text-xl font-semibold mb-3">What You Can Do</h3>

        <ul className="space-y-3 text-gray-700">
          <li>
            🔍 <strong>Browse Pokémon</strong>
            <br />
            Explore a complete list of Pokémon with their types, abilities, and
            basic stats.
          </li>

          <li>
            ⭐ <strong>Save Your Favorites</strong>
            <br />
            Mark Pokémon as favorites and quickly access them in your favorites
            page.
          </li>

          <li>
            🎨 <strong>Type-Based Design</strong>
            <br />
            Each Pokémon card adapts its color based on its primary type for a
            more immersive experience.
          </li>

          <li>
            ⚡ <strong>Fast & Responsive</strong>
            <br />
            Built with modern web technologies to ensure smooth performance
            across devices.
          </li>
        </ul>
      </div>

      <p className="text-gray-600 italic">
        Start exploring and build your ultimate Pokémon collection!
      </p>
    </div>
  );
}

export default Home;
