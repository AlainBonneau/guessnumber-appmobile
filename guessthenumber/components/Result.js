import { StyleSheet, Text, View } from "react-native";

function Result() {
    return (
        <View style={styles.result}>
        <Text style={styles.text}>Correct!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
    text: {
        color: "#FFF176",
        textAlign: "center",
        fontSize: 100,
    },
});

export default Result;
