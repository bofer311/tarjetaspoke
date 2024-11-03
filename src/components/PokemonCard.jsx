import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

// Mapa de colores para cada tipo de Pokémon
const typeColors = {
  poison: "orange",
  fire: "red",
  water: "blue",
  grass: "#FFD445",
  electric: "yellow",
  bug: "lightgreen",
  fairy: "#4B3D3D",
  normal: "lightgray",
  fighting: "#6A0DAD",
  psychic: "purple",
  rock: "#90EE90",
  ghost: "violet",
  ground: "sandybrown",
  ice: "lightcyan",
  dragon: "lightblue",
  dark: "darkgray",
  steel: "silver",
  flying: "#f5f5f9",
};

// Componente para mostrar una estadística individual
const Stat = ({ name, value }) => (
  <View style={styles.statContainer}>
    <Text style={styles.statName}>{name}: </Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const PokemonCard = ({
  pokemon,
  onAddToTeam,
  onRemoveFromTeam,
  showRemoveButton,
}) => {
  const types = pokemon.types.map((type) => type.type.name);
  const backgroundColor = typeColors[types[0]];

  // Selecciona las primeras 5 estadísticas del Pokémon
  const statsToShow = pokemon.stats.slice(0, 5);

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.image}
      />
      <Text style={styles.number}>#{pokemon.id}</Text>
      <Text style={styles.name}>{pokemon.name}</Text>
      <View style={styles.types}>
        {types.map((type) => (
          <Text key={type} style={styles.type}>
            {type}
          </Text>
        ))}
      </View>

      {/* Muestra las 5 estadísticas */}
      <View style={styles.statsContainer}>
        {statsToShow.map((stat) => (
          <Stat
            key={stat.stat.name}
            name={stat.stat.name}
            value={stat.base_stat}
          />
        ))}
      </View>

      {showRemoveButton ? (
        <Button
          title="Eliminar de equipo Pokémon"
          onPress={() => onRemoveFromTeam(pokemon)}
          color="#000"
        />
      ) : (
        <Button
          title="Agregar a equipo Pokémon"
          onPress={() => onAddToTeam(pokemon)}
          color="#000"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#000", // Fondo negro
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  number: {
    fontSize: 24, // Aumentado el tamaño de fuente
    color: "white", // Texto en blanco
  },
  name: {
    fontSize: 30, // Tamaño más grande para el nombre
    fontWeight: "bold",
    color: "white", // Texto en blanco
  },
  types: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  type: {
    backgroundColor: "#000", // Detalles en rojo
    padding: 5,
    borderRadius: 4,
    margin: 2,
    color: "white", // Texto en blanco
    fontWeight: "bold",
  },
  statsContainer: {
    marginTop: 10,
    width: "100%",
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  statName: {
    fontWeight: "bold",
    color: "white", // Texto en blanco
    fontSize: 16, // Tamaño de fuente más grande
  },
  statValue: {
    fontSize: 16, // Tamaño de fuente más grande
    color: "white", // Texto en blanco
  },
});

export default PokemonCard;
