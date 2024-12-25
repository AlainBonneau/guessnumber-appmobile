import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Navbar from "./components/Navbar";
import Counter from "./components/Counter";
import TryCounter from "./components/TryCounter";

// Continuer l'app avec le compteur de temps et le bouton pour commencer le jeu (et le nombre d'essais ainsi que le nombre à deviner)

export default function App() {
  let randomNumber = Math.floor(Math.random() * 1000) + 1; // Nombre aléatoire à deviner
  console.log(randomNumber);
  const [userGuess, setUserGuess] = useState(null); // Nombre que l'utilisateur entre pour deviner
  const [tryCounter, setTryCounter] = useState(0); // Nombre d'essais
  const [count, setCount] = useState(60); // Compteur de temps
  const [isGameOver, setIsGameOver] = useState(false); // Le jeu est-il terminé

  if (isGameOver) {
    return (
      <View style={styles.container}>
        <Navbar />
        <Text style={styles.textWhite}>Game Over</Text>
        <Text style={styles.textWhite}>
          Le nombre à deviner était {randomNumber}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.textWhite}>
        Trouverez-vous le bon chiffre avant la fin du temps imparti ?
      </Text>
      <Counter count={count} />
      <TextInput
        style={styles.userInput}
        placeholder="Entrez un nombre entre 1 et 1000"
      />
      <TryCounter tryCounter={tryCounter} />
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
  userInput: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "#546E7A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  userButton: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "#546E7A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
