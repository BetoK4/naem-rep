import { useState, useEffect } from "react";
import "./App.css";
import PropTypes from "prop-types";

const PokemonRow = ({ pokemon, onSelect }) => {
  <tr key={pokemon.id}>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select</button>
    </td>
  </tr>
};

PokemonRow.propTypes = {
  isPokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

const PokemonInfo = ({ name, base }) => {
  <div>
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map((key) => {
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        })
      }
    </table>
  </div>
}

PokemonInfo.PropTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};

function App() {
  const [filter, filterSet] = useState("");
  const [pokemon, pokemonSet] = useState([]);
  const [selectedPokemon, selectedPokemonSet] = useState(null);

  useEffect(() => {
    fetch("https://localhost:3000")
    .then((resp) => resp.json())
    .then((data) => selectedPokemonSet(data))
  }, [])
  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1rem",
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gridColumnGap: "1rem"
        }}>
        <div>
          <input 
            value={filter} 
            onChange={(evt) => filterSet(evt.target.value)} 
          />
            <table width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {pokemon
                  .filter(({ name: { english } }) =>
                    english
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                  )
                  .slice(0, 20)
                  .map((pokemon) => (
                    <PokemonRow pokemon={pokemon} onSelect={(pokemon) => 
                      selectedPokemonSet(pokemon)} />
                ))}
              </tbody>
            </table>
        </div>
        {selectedPokemon && <PokemonInfo {...selectedPokemon}/>}
      </div>
    </div>
  );
}

export default App;