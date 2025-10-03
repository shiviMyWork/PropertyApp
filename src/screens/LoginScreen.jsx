import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function LoginScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/newlogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Bottom Skyline Image */}
      <Image
        source={require("../assets/building.png")}
        style={styles.skyline}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Log in</Text>

      {/* Email Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="#999"
          style={styles.input}
        />
        <MaterialCommunityIcons
          name="email-outline"
          size={22}
          color="#FF5F06"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!passwordVisible}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <MaterialCommunityIcons
            name={passwordVisible ? "eye-outline" : "eye-off-outline"}
            size={22}
            color="#FF5F06"
          />
        </TouchableOpacity>
      </View>

      {/* Forget Password */}
      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText}>Forget password</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity onPress={() => navigation.replace("Search")} style={styles.loginButton}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={styles.signupText}>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.signIn}>Sign in</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b154f",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FF5F06",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  inputWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    borderColor: "#FF5F06",
    borderWidth: 1,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#000",
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#fff",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#FF5F06",
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  signupText: {
    color: "#fff",
    fontSize: 14,
  },
  signIn: {
    fontWeight: "700",
    textDecorationLine: "underline",
    color: "#fff",

  },
  skyline: {
    position: "absolute",
    bottom: 0,
    width: 420,
    height: 310,
    pointerEvents: "none",
  },
});

