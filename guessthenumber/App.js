import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

import { scale, moderateScale } from "react-native-size-matters";

import Navbar from "./components/Navbar";
import Counter from "./components/Counter";
import TryCounter from "./components/TryCounter";

// Génère un nombre aléatoire
function generateRandomNumber() {
  return Math.floor(Math.random() * 1000) + 1;
}

export default function App() {
  const [userGuess, setUserGuess] = useState("");
  const [tryCounter, setTryCounter] = useState(0);
  const [count, setCount] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  // Remise à zéro du jeu
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

  // Gérer le temps imparti
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

  // Validation de l'utilisateur
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

  // Données du clavier (4×3)
  const gridData = [
    { id: "1", value: "1" },
    { id: "2", value: "2" },
    { id: "3", value: "3" },
    { id: "4", value: "4" },
    { id: "5", value: "5" },
    { id: "6", value: "6" },
    { id: "7", value: "7" },
    { id: "8", value: "8" },
    { id: "9", value: "9" },
    { id: "999", value: "DEL" },
    { id: "0", value: "0" },
    { id: "guess", value: "GUESS" },
  ];

  // Gestion des touches de clavier
  const handleGridInput = (value) => {
    if (value === "DEL") {
      setUserGuess((prev) => prev.slice(0, -1));
    } else if (value === "GUESS") {
      handleUserInput();
    } else {
      setUserGuess((prev) => prev + value.toString());
    }
  };

  // Écrans
  if (!isGameStarted) {
    return (
      <View style={styles.container}>
        <Text style={styles.startGame}>Guess The Number</Text>
        <Text style={styles.textWhite}>Prêt à jouer ?</Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setIsGameStarted(true)}
        >
          <Text style={styles.startButtonText}>Commencer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isGameOver) {
    return (
      <View style={styles.container}>
        <Text style={styles.gameOver}>GAME OVER</Text>
        <Text style={styles.textWhite}>
          Dommage, le nombre à deviner était {randomNumber}.
        </Text>
        <TouchableOpacity style={styles.startButton} onPress={resetGame}>
          <Text style={styles.startButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isGameWon) {
    return (
      <View style={styles.container}>
        <Text style={styles.gameOver}>FÉLICITATIONS !</Text>
        <Text style={styles.textWhite}>
          Vous avez trouvé le bon nombre {randomNumber} en {tryCounter + 1}{" "}
          essais.
        </Text>
        <TouchableOpacity style={styles.startButton} onPress={resetGame}>
          <Text style={styles.startButtonText}>Rejouer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Rendu des items (touches du clavier)
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.gridItem,
        item.value === "DEL" && styles.delButton,
        item.value === "GUESS" && styles.guessButton,
      ]}
      onPress={() => handleGridInput(item.value)}
    >
      <Text style={styles.gridText}>{item.value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.textWhite}>
        Trouverez-vous le bon chiffre avant la fin du temps imparti ?
      </Text>
      <Counter count={count} />
      <TryCounter tryCounter={tryCounter} />

      {showResult && (
        <View style={styles.result}>
          <Text style={styles.textResult}>{resultMessage}</Text>
        </View>
      )}

      <TextInput
        style={styles.userInput}
        placeholder="Votre saisie s'affiche ici"
        keyboardType="numeric"
        value={userGuess}
        editable={false}
      />

      <View style={styles.gridWrapper}>
        <FlatList
          data={gridData}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={renderItem}
          columnWrapperStyle={{ justifyContent: "space-around" }}
        />
      </View>
    </View>
  );
}

// Dimensions
const screenHeight = Dimensions.get("window").height;
const gridHeight = screenHeight * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263238",
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  gridWrapper: {
    width: "100%",
    height: gridHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  textWhite: {
    color: "#FAFAFA",
    textAlign: "center",
    fontSize: moderateScale(15),
    marginBottom: scale(10),
  },
  result: {
    width: "80%",
    marginTop: scale(20),
    backgroundColor: "#546E7A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(10),
    paddingVertical: scale(5),
  },
  textResult: {
    color: "#FFF176",
    textAlign: "center",
    fontSize: moderateScale(15),
  },
  userInput: {
    width: "80%",
    marginVertical: scale(20),
    textAlign: "center",
    backgroundColor: "#546E7A",
    color: "#FAFAFA",
    borderRadius: scale(10),
    padding: scale(10),
    fontSize: moderateScale(12),
  },
  gridItem: {
    margin: scale(4),
    padding: scale(28),
    backgroundColor: "#546E7A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF176",
    borderRadius: scale(10),
  },
  delButton: {
    backgroundColor: "#FF5252",
  },
  guessButton: {
    backgroundColor: "#FFF176",
  },
  gridText: {
    color: "#FFFFFF",
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
  gameOver: {
    color: "#FFF176",
    fontSize: moderateScale(40),
    fontWeight: "bold",
  },
  startGame: {
    color: "#FFF176",
    fontSize: moderateScale(40),
    fontWeight: "bold",
    marginBottom: scale(20),
  },
  startButton: {
    backgroundColor: "#FFF176",
    borderRadius: scale(10),
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
  startButtonText: {
    fontSize: moderateScale(18),
    color: "#263238",
    fontWeight: "bold",
  },
});
