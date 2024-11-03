import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import PokemonCard from "../components/PokemonCard"; // Asegúrate de que la ruta sea correcta
import Pagination from "../components/Pagination"; // Asegúrate de que la ruta sea correcta
import Navbar from "../components/Navbar"; // Asegúrate de que la ruta sea correcta
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage

const HomeScreen = ({ navigation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [team, setTeam] = useState([]); // Estado para el equipo de Pokémon
  const pokemonsPerPage = 20;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${
            (currentPage - 1) * pokemonsPerPage
          }`
        );

        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const detailResponse = await axios.get(pokemon.url);
            return detailResponse.data;
          })
        );

        setPokemonList(pokemonDetails);
        setTotalPokemons(response.data.count);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemons();
  }, [currentPage]);

  // Nuevo useEffect para cargar el equipo desde AsyncStorage
  useEffect(() => {
    const loadTeam = async () => {
      const storedTeam = await AsyncStorage.getItem("pokemonTeam");
      if (storedTeam) {
        setTeam(JSON.parse(storedTeam));
      }
    };

    loadTeam();
  }, []);

  const handleAddToTeam = async (pokemon) => {
    if (team.length < 6) {
      const updatedTeam = [...team, pokemon];
      setTeam(updatedTeam);
      await AsyncStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam)); // Guardar en AsyncStorage
    } else {
      alert("Ya tienes 6 Pokémon en tu equipo");
    }
  };

  const handleRemoveFromTeam = async (pokemon) => {
    const updatedTeam = team.filter((p) => p.name !== pokemon.name);
    setTeam(updatedTeam);
    await AsyncStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam)); // Actualiza AsyncStorage
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(totalPokemons / pokemonsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar
        onTeamView={() =>
          navigation.navigate("TeamView", {
            team,
            onRemoveFromTeam: handleRemoveFromTeam,
          })
        }
      />
      <FlatList
        data={pokemonList}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onAddToTeam={handleAddToTeam}
            showRemoveButton={false} // No mostrar botón de eliminar en HomeScreen
          />
        )}
        keyExtractor={(item) => item.name}
        numColumns={2}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalPokemons / pokemonsPerPage)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
});

export default HomeScreen;
