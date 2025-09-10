import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("GetStarted");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0b154f", 
      }}
    >
      {/* Logo */}
      <Image
        source={require("../assets/logo.png")} 
        style={{ width: 250, height: 250 }}
        resizeMode="contain"
      />
    </View>
  );
}
