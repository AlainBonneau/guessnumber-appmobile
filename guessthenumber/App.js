import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navbar from "./components/Navbar";
import Counter from "./components/Counter";

// Continuer l'app avec le compteur de temps et le bouton pour commencer le jeu (et le nombre d'essais ainsi que le nombre à deviner)

export default function App() {
  const [count, setCount] = useState(60);
  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.textWhite}>
        Trouverez-vous le bon chiffre avant la fin du temps imparti ?
      </Text>
      <Counter count={count} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263238",
  },
  textWhite: {
    color: "#FAFAFA",
    textAlign: "center",
  },
});
