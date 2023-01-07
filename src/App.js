import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    spA: "",
    spD: "",
    speed: "",
    type: "",
  });

  const [pokemonName, setPokemonName] = useState("");

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          spA: response.data.stats[3].base_stat,
          spD: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };

  const [pokemonChosen, setPokemonChosen] = useState(false);

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokedex</h1>
        <input
          type="text"
          onChange={(e) => {
            setPokemonName(e.target.value);
          }}
        ></input>
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1>Please choose a pokemon</h1>
        ) : (
          <>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.img} alt="sprite"/>
          <h4>Species: {pokemon.species}</h4>
          <h4>Type: {pokemon.type}</h4>
          <h5>HP: {pokemon.hp}</h5>
          <h5>Attack: {pokemon.attack}</h5>
          <h5>Defense: {pokemon.defense}</h5>
          <h5>Special-Attack: {pokemon.spA}</h5>
          <h5>Special-Defense: {pokemon.spD}</h5>
          <h5>Speed: {pokemon.speed}</h5>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
