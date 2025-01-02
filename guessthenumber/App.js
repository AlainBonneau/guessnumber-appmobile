import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
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
    setRandomNumber(generateRandomNumber());
  };

  // Gestion du compteur de temps
  useEffect(() => {
    if (!isGameStarted || isGameOver || isGameWon) return;

    if (count === 0) {
      setIsGameOver(true); // Fin du jeu lorsque le temps est écoulé
      return;
    }

    const timer = setInterval(() => {
      setCount((prev) => Math.max(prev - 1, 0)); // Empêche count de descendre en dessous de 0
    }, 1000);

    return () => clearInterval(timer); // Nettoyage pour éviter les fuites mémoire
  }, [isGameStarted, isGameOver, isGameWon, count]);

  // Gestion de la soumission de l'utilisateur
  const handleUserInput = () => {
    if (!userGuess) return;
    const guess = parseInt(userGuess, 10);

    if (isNaN(guess) || guess < 1 || guess > 1000) {
      alert("Veuillez entrer un nombre valide entre 1 et 1000.");
      return;
    }

    if (tryCounter === 9) {
      setIsGameOver(true);
      return;
    }

    if (guess === randomNumber) {
      setIsGameWon(true);
    } else {
      setTryCounter((prev) => prev + 1);
      alert(guess > randomNumber ? "C'est moins !" : "C'est plus !");
    }

    setUserGuess(""); // Réinitialise le champ d'entrée après validation
  };

  // Données pour la grille
  const gridData = [
    { id: "1", value: 1 },
    { id: "2", value: 2 },
    { id: "3", value: 3 },
    { id: "4", value: 4 },
    { id: "5", value: 5 },
    { id: "6", value: 6 },
    { id: "7", value: 7 },
    { id: "8", value: 8 },
    { id: "9", value: 9 },
    { id: "0", value: 0 },
    { id: "999", value: "DEL" },
  ];

  const handleGridInput = (value) => {
    if (value === "DEL") {
      setUserGuess((prev) => prev.slice(0, -1)); // Supprime le dernier caractère
    } else {
      setUserGuess((prev) => prev + value.toString()); // Ajoute la valeur sélectionnée
    }
  };

  const clearInput = () => {
    setUserGuess("");
  };

  if (!isGameStarted) {
    return (
      <View style={styles.container}>
        <Text style={styles.textWhite}>Prêt à jouer ?</Text>
        <Button title="Commencer" onPress={() => setIsGameStarted(true)} />
      </View>
    );
  }

  if (isGameOver) {
    return (
      <View style={styles.container}>
        <Text style={styles.textWhite}>
          Dommage, le nombre à deviner était {randomNumber}.
        </Text>
        <Button title="Réessayer" onPress={resetGame} />
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
        placeholder="Votre saisie s'affiche ici"
        keyboardType="numeric"
        value={userGuess}
        editable={false} // Rend le champ non modifiable par l'utilisateur
      />
      <FlatList
        data={gridData}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => handleGridInput(item.value)}
          >
            <Text style={styles.gridText}>{item.value}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="OK" onPress={handleUserInput} />
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
  gridItem: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: "#546E7A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  delButton: {
    backgroundColor: "#FF5252", // Couleur différente pour DEL
  },
  gridText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
