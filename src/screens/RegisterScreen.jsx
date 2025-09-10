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
import RNPickerSelect from "react-native-picker-select";

export default function RegisterScreen({ navigation }) {
  const [selectedRole, setSelectedRole] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Skyline */}
      <Image
        source={require("../assets/building.png")}
        style={styles.skyline}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Register</Text>

      {/* Full Name */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter full name"
          placeholderTextColor="#999"
          style={styles.input}
        />
        <MaterialCommunityIcons name="account-outline" size={22} color="#FF5F06" />
      </View>

      {/* Email */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="#999"
          style={styles.input}
        />
        <MaterialCommunityIcons name="email-outline" size={22} color="#FF5F06" />
      </View>

      {/* Phone */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Phone number"
          placeholderTextColor="#999"
          style={styles.input}
          keyboardType="phone-pad"
        />
        <MaterialCommunityIcons name="phone-outline" size={22} color="#FF5F06" />
      </View>

      {/* OTP */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter OTP"
          placeholderTextColor="#999"
          style={styles.input}
          keyboardType="numeric"
        />
        <MaterialCommunityIcons name="key-outline" size={22} color="#FF5F06" />
      </View>

      {/* Register As (Dropdown) */}
      <View style={styles.pickerWrapper}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedRole(value)}
          value={selectedRole}
          placeholder={{ label: "Register as", value: "" }}
          items={[
            { label: "User", value: "user" },
            { label: "Agent", value: "agent" },
            { label: "Company", value: "company" },
          ]}
          useNativeAndroidPickerStyle={false}
          style={{
            inputIOS: {
              height: 50,
              color: "#FF5F06",
              paddingHorizontal: 16,
            },
            inputAndroid: {
              height: 50,
              color: "#FF5F06",
              paddingHorizontal: 16,
            },
            iconContainer: {
              top: 9,
              right: 11,
              
            },
          }}
          Icon={() => (
            <MaterialCommunityIcons
              name="chevron-down"
              size={30}
              color="#FF5F06"
            />
          )}
        />
      </View>


      {/* Register Button */}
      <TouchableOpacity
        onPress={() => navigation.replace("Search")}
        style={styles.loginButton}
      >
        <Text style={styles.loginText}>Sign in</Text>
      </TouchableOpacity>

      {/* Already have account */}
      <View style={{ flexDirection: "row", }}>
        <Text style={styles.signupText}>Already have an account ? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.signIn}>Log in</Text>
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
    marginTop: 20,
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
  pickerWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderColor: "#FF5F06",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  picker: {
    flex: 1,
    height: 55,
    color: "#65666A",
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
