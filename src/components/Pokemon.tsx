import "../App.css";

const pokemons = ["pikachu", "squirtle", "bulbasaur", "charmander"];

function Pokemon() {
  return (
    <div>
      <h2 className="font-semibold text-3xl text-yellow-200 py-10">Pokemons</h2>
      <ul className="text-green-300">
        {pokemons.map((pokemon) => (
          <li key={pokemon} className="border w-30 my-2 p-2 text-center rounded-md transition-all hover:scale-105">{pokemon}</li>
        ))}
      </ul>
    </div>
  );
}

export default Pokemon;
