import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const fetches = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        Promise.all(fetches).then((results) => {
          setData(results);
          setFilteredData(results);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const filtered = data.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <div style={{ padding: "20px",textAlign:"center"}}>
      <h1 >Pokemon Search</h1>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "300px",
          fontSize: "16px",
        }}
      />
      <div style={{ display: "flex",justifyContent:"center", flexWrap: "wrap", gap:"30px" }}>
        {Array.isArray(filteredData) && filteredData.length > 0 ? (
          filteredData.map((pokemon) => (
            <div
              key={pokemon.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                width: "300px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                style={{ width: "100px", height: "100px" }}
              />
              <h2 style={{ textTransform: "capitalize" }}>{pokemon.name}</h2>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
            </div>
          ))
        ) : (
          <p>No Pokémon found</p>
        )}
      </div>
    </div>
  );
};

export default App;
