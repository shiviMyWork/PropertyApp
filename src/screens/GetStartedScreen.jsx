import React from "react";
import { View, Button, Image, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function GetStartedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Center Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/getstarted.png")} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b154f",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 350,
  },
   buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 60,
  },
  button: {
    backgroundColor: "#FF5F06",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
