import { StyleSheet, Text, View } from "react-native";

function TryCounter({ tryCounter }) {
    return (
        <View style={styles.tryCounter}>
        <Text style={styles.text}>Nombre d'essais : {tryCounter} / 10</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tryCounter: {
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
    text: {
        color: "#FFF176",
        textAlign: "center",
        fontSize: 20,
    },
});

export default TryCounter;
