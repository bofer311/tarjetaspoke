import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, Alert } from "react-native";
import PokemonCard from "../components/PokemonCard"; // Asegúrate de que la ruta sea correcta
import AsyncStorage from "@react-native-async-storage/async-storage";

const TeamView = ({ route }) => {
  const { team: initialTeam } = route.params; // Obteniendo el equipo pasado desde HomeScreen
  const [team, setTeam] = useState(initialTeam);
  const [message, setMessage] = useState("");

  const handleRemoveFromTeam = async (pokemon) => {
    const updatedTeam = team.filter((p) => p.id !== pokemon.id);
    setTeam(updatedTeam);
    await AsyncStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam)); // Guardar en AsyncStorage
    setMessage("Pokémon eliminado correctamente"); // Mostrar mensaje
    setTimeout(() => setMessage(""), 2000); // Ocultar mensaje después de 2 segundos
  };

  return (
    <View style={styles.container}>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <FlatList
        data={team}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onRemoveFromTeam={handleRemoveFromTeam} // Pasar la función de eliminación
            showRemoveButton={true} // Mostrar botón de eliminar
          />
        )}
        keyExtractor={(item) => item.name}
        numColumns={2} // Cambia esto si quieres que se muestre en una sola columna
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default TeamView;
