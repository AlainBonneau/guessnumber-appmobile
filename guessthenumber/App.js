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
  const [showResult, setShowResult] = useState(false); // Contrôle l'affichage de "C'est plus" ou "C'est moins"
  const [resultMessage, setResultMessage] = useState(""); // Montre si le nombre est plus grand ou plus petit

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
    setShowResult(false);
    setResultMessage("");
  };

  // Gestion du compteur de temps
  useEffect(() => {
    if (!isGameStarted || isGameOver || isGameWon) return;

    if (count === 0) {
      setIsGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setCount((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameStarted, isGameOver, isGameWon, count]);

  // Gestion de la soumission de l'utilisateur
  const handleUserInput = () => {
    if (!userGuess) return;

    const guess = parseInt(userGuess, 10);

    if (isNaN(guess) || guess < 1 || guess > 1000) {
      alert("Veuillez entrer un nombre valide entre 1 et 1000.");
      return;
    }

    if (guess === randomNumber) {
      setIsGameWon(true);
      return;
    }

    if (tryCounter === 9) {
      setIsGameOver(true);
      return;
    }

    setTryCounter((prev) => prev + 1);

    setResultMessage(guess > randomNumber ? "C'est moins" : "C'est plus");
    setShowResult(true);
    setUserGuess("");
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

  // Gestion de la saisie de l'utilisateur
  const handleGridInput = (value) => {
    if (value === "DEL") {
      setUserGuess((prev) => prev.slice(0, -1));
    } else {
      setUserGuess((prev) => prev + value.toString());
    }
  };

  // Effacer la saisie de l'utilisateur
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

  function result() {
    if (!showResult) return null;
    return (
      <View style={styles.result}>
        <Text style={styles.textWhite}>
          {parseInt(userGuess, 10) > randomNumber
            ? "C'est moins"
            : "C'est plus"}
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
      <View style={styles.result}>
        <Text style={styles.textResult}>{resultMessage}</Text>
      </View>
      <TextInput
        style={styles.userInput}
        placeholder="Votre saisie s'affiche ici"
        keyboardType="numeric"
        value={userGuess}
        editable={false}
      />
      <FlatList
        data={gridData}
        style={{ width: "100%", height: 200 }}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.gridItem, item.value === "DEL" && styles.delButton]}
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
  result: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    backgroundColor: "#546E7A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textResult: {
    color: "#FFF176",
    textAlign: "center",
    fontSize: 30,
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
    borderWidth: 1,
    borderColor: "#FFF176",
    borderStyle: "solid",
    borderRadius: 10,
  },
  delButton: {
    backgroundColor: "#FF5252",
  },
  gridText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
