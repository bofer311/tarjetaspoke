import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Navbar = ({ onTeamView }) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>Poke Team</Text>
      <Button title="Ver Equipo" onPress={onTeamView} />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Navbar;
