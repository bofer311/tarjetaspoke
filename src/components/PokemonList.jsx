import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import Navbar from "./Navbar";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true); // Establecer loading a true antes de la solicitud
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${
            (currentPage - 1) * 10
          }`
        );
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            return await pokemonResponse.json();
          })
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false); // Establecer loading a false después de la solicitud
      }
    };

    fetchPokemons();
  }, [currentPage]);

  useEffect(() => {
    const storedTeam = JSON.parse(localStorage.getItem("pokemonTeam")) || [];
    setTeam(storedTeam);
  }, []);

  const handleAddToTeam = (pokemon) => {
    if (team.length < 6) {
      const updatedTeam = [...team, pokemon];
      setTeam(updatedTeam);
      localStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam));
    } else {
      alert("No puedes agregar más de 6 Pokémon a tu equipo.");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTeamView = () => {
    console.log("Ver equipo");
  };

  return (
    <View>
      <Navbar onTeamView={handleTeamView} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            onAddToTeam={handleAddToTeam}
          />
        ))
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </View>
  );
};

export default PokemonList;
