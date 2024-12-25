import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Navbar from "./components/Navbar";
import Counter from "./components/Counter";
import TryCounter from "./components/TryCounter";

export default function App() {
  const [userGuess, setUserGuess] = useState(""); // Nombre que l'utilisateur entre pour deviner
  const [tryCounter, setTryCounter] = useState(0); // Nombre d'essais
  const [count, setCount] = useState(60); // Compteur de temps
  const [isGameOver, setIsGameOver] = useState(false); // Le jeu est-il terminé ?
  const [isGameWon, setIsGameWon] = useState(false); // L'utilisateur a-t-il gagné ?
  const [isGameStarted, setIsGameStarted] = useState(false); // Le jeu a-t-il commencé ?
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber()); // Nombre aléatoire à deviner

  // Générer un nouveau nombre aléatoire
  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  // Réinitialiser le jeu
  const resetGame = () => {
    setUserGuess("");
    setTryCounter(0);
    setCount(60);
    setIsGameOver(false);
    setIsGameWon(false);
    setIsGameStarted(false);
    setRandomNumber(generateRandomNumber()); // Générer un nouveau nombre
    console.log("Nouveau chiffre aléatoire :", randomNumber);
  };

  // Gestion du compteur de temps
  useEffect(() => {
    if (!isGameStarted || isGameOver || isGameWon) return;

    if (count === 0) {
      setIsGameOver(true); // Le temps est écoulé, le jeu est terminé
    }

    if (tryCounter === 10) {
      setIsGameOver(true); // Le nombre d'essais est atteint, le jeu est terminé
    }

    const timer = setInterval(() => setCount((prev) => prev - 1), 1000);
    return () => clearInterval(timer); // Nettoyer l'intervalle pour éviter les fuites de mémoire
  }, [count, isGameStarted, isGameOver, isGameWon]);

  // Gestion de la soumission de l'utilisateur
  const handleUserInput = () => {
    if (!userGuess) return; // Si aucune entrée, ne rien faire
    const guess = parseInt(userGuess, 10);

    if (isNaN(guess) || guess < 1 || guess > 1000) {
      alert("Veuillez entrer un nombre valide entre 1 et 1000.");
      return;
    }

    if (guess === randomNumber) {
      setIsGameWon(true); // L'utilisateur a trouvé le bon nombre
    } else {
      setTryCounter((prev) => prev + 1); // Incrémente le compteur d'essais
      alert(guess > randomNumber ? "C'est moins !" : "C'est plus !");
    }

    setUserGuess(""); // Réinitialise le champ d'entrée
  };

  // Gestion de la vue d'attente
  if (!isGameStarted) {
    return (
      <View style={styles.container}>
        <Navbar />
        <Text style={styles.textWhite}>
          Êtes-vous prêt à trouver le bon nombre ? 😊
        </Text>
        <Button
          title="Commencer le jeu"
          onPress={() => setIsGameStarted(true)} // Lance le jeu
        />
      </View>
    );
  }

  // Gestion de l'affichage Game Over
  if (isGameOver) {
    return (
      <View style={styles.container}>
        <Navbar />
        <Text style={styles.textWhite}>Game Over</Text>
        <Text style={styles.textWhite}>
          Le nombre à deviner était {randomNumber}, Vous avez utilisé {tryCounter}{" "} essais
        </Text>
        <Button title="Rejouez" onPress={resetGame} />
      </View>
    );
  }

  // Gestion de l'affichage Victoire
  if (isGameWon) {
    return (
      <View style={styles.container}>
        <Navbar />
        <Text style={styles.textWhite}>
          Bravo ! Vous avez trouvé le bon chiffre
        </Text>
        <Text style={styles.textWhite}>
          Le nombre était bien {randomNumber}, félicitations !
        </Text>
        <Button title="Rejouez" onPress={resetGame} />
      </View>
    );
  }

  // Affichage du jeu en cours
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
        keyboardType="numeric"
        value={userGuess}
        onChangeText={(text) => setUserGuess(text)} // Capture l'entrée utilisateur
        onSubmitEditing={handleUserInput} // Appelé lorsqu'on valide l'entrée
      />
      <Button title="Valider" onPress={handleUserInput} />
      <TryCounter tryCounter={tryCounter} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263238",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  textWhite: {
    color: "#FAFAFA",
    textAlign: "center",
    marginBottom: 16,
  },
  userInput: {
    width: "80%",
    marginVertical: 20,
    textAlign: "center",
    backgroundColor: "#546E7A",
    color: "#FAFAFA",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
});
