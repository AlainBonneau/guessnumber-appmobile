import { StyleSheet, Text, View } from "react-native";

function Navbar() {
  return (
    <View style={styles.navbar} className="navbar">
      <Text style={styles.text}>Guess The Number</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#333",
    padding: 10,
    marginBottom: 10,
  },
  text: {
    color: "#FFF176",
    textAlign: "center",
    fontSize: 20,
  },
});

export default Navbar;
