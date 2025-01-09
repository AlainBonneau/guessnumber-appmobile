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
import Navbar from "./components/Navbar";
import Counter from "./components/Counter";
import TryCounter from "./components/TryCounter";

// Déclaration des states
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

  // Fonction pour générer un nombre aléatoire
  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  // Fonction pour réinitialiser le jeu
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

  // Hook useEffect pour gérer le temps imparti
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

  // Fonction pour gérer la saisie de l'utilisateur
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

  // Données pour la grille de chiffres
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

  // Fonction pour gérer la saisie de l'utilisateur
  const handleGridInput = (value) => {
    if (value === "DEL") {
      setUserGuess((prev) => prev.slice(0, -1));
    } else {
      setUserGuess((prev) => prev + value.toString());
    }
  };

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

  // Fonction pour afficher les éléments de la grille
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.gridItem, item.value === "DEL" && styles.delButton]}
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

      <TouchableOpacity style={styles.submitButton} onPress={handleUserInput}>
        <Text style={styles.submitButtonText}>Guess</Text>
      </TouchableOpacity>
    </View>
  );
}

// Dimensions de l’écran pour 40 %
const screenHeight = Dimensions.get("window").height;
const gridHeight = screenHeight * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263238",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    marginBottom: 16,
  },
  result: {
    width: "80%",
    marginTop: 20,
    backgroundColor: "#546E7A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
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
    margin: 4,
    padding: 30,
    backgroundColor: "#546E7A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF176",
    borderRadius: 10,
  },
  delButton: {
    backgroundColor: "#FF5252",
  },
  gridText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  gameOver: {
    color: "#FFF176",
    fontSize: 40,
    fontWeight: "bold",
  },
  startGame: {
    color: "#FFF176",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#FFF176",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  startButtonText: {
    fontSize: 18,
    color: "#263238",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#FFF176",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#263238",
    fontSize: 20,
    fontWeight: "bold",
  },
});
