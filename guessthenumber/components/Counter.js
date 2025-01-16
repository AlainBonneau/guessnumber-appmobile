import { StyleSheet, Text, View } from "react-native";

function Counter({ count }) {
  return (
    <View style={styles.counter}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  counter: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    backgroundColor: "#546E7A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "#FFF176",
    textAlign: "center",
    fontSize: 30,
  },
});

export default Counter;
