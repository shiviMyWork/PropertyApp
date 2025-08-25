// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
// import API from "../api";
// import { saveAuthData } from "../utils/auth";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import SmsRetriever from "react-native-sms-retriever"; // ✅ Auto OTP read (Android only)

// export default function Login({ navigation }) {
//     const [phone, setPhone] = useState("");
//     const [otp, setOtp] = useState("");
//     const [step, setStep] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [timer, setTimer] = useState(0); // Resend OTP timer

//     // 📌 Auto-read OTP (Android only)
//     useEffect(() => {
//         if (step === 2 && Platform.OS === "android") {
//             startOtpListener();
//         }
//         return () => SmsRetriever.removeSmsListener();
//     }, [step]);

//     const startOtpListener = async () => {
//         try {
//             const registered = await SmsRetriever.startSmsRetriever();
//             if (registered) {
//                 SmsRetriever.addSmsListener(event => {
//                     const message = event.message;
//                     const otpRegex = /\b\d{4,6}\b/; // Extract 4-6 digit OTP
//                     const extractedOtp = message.match(otpRegex)?.[0];
//                     if (extractedOtp) {
//                         setOtp(extractedOtp);
//                         SmsRetriever.removeSmsListener();
//                         verifyOtp();
//                     }
//                 });
//             }
//         } catch (error) {
//             console.log("SMS Retriever Error:", error);
//         }
//     };

//     // 📌 Send OTP API
//     const sendOtp = async () => {
//         if (!phone || phone.length < 10) return Alert.alert("Enter a valid phone number");
//         try {
//             setLoading(true);
//             await API.post("/auth/send-otp", { phone });
//             // Alert.alert("OTP sent!");
//             setStep(2);
//             setTimer(60); // Start 60s timer
//         } catch (err) {
//             Alert.alert("Failed to send OTP");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // 📌 Resend OTP
//     const resendOtp = () => {
//         if (timer === 0) sendOtp();
//     };

//     // 📌 Timer Countdown
//     useEffect(() => {
//         let interval;
//         if (timer > 0) {
//             interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//         }
//         return () => clearInterval(interval);
//     }, [timer]);

//     // 📌 Verify OTP
//     const verifyOtp = async () => {
//         if (!otp) return Alert.alert("Please enter OTP");
//         try {
//             setLoading(true);
//             const res = await API.post("/auth/verify-otp", { phone, otp });
//             global.authToken = res.data.token;
//             global.currentUser = res.data.user;
//             await saveAuthData(res.data.token, res.data.user);
//             // Alert.alert("Login successful!");
//             navigation.replace("Dashboard");
//         } catch (err) {
//             Alert.alert("Invalid OTP");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
//             <View style={styles.card}>
//                 <Ionicons name="school-outline" size={70} color="#007bff" style={styles.icon} />
//                 <Text style={styles.title}>Student Login</Text>

//                 {step === 1 ? (
//                     <>
//                         <Text style={styles.label}>Phone Number</Text>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Enter Phone Number"
//                             keyboardType="phone-pad"
//                             value={phone}
//                             onChangeText={setPhone}
//                             maxLength={10}
//                         />
//                         <TouchableOpacity style={styles.button} onPress={sendOtp} disabled={loading}>
//                             <Ionicons name="send-outline" size={18} color="white" />
//                             <Text style={styles.btnText}>{loading ? "Sending..." : "Send OTP"}</Text>
//                         </TouchableOpacity>
//                     </>
//                 ) : (
//                     <>
//                         <Text style={styles.label}>OTP</Text>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Enter OTP"
//                             keyboardType="number-pad"
//                             value={otp}
//                             onChangeText={setOtp}
//                             maxLength={6}
//                         />
//                         <TouchableOpacity style={styles.button} onPress={verifyOtp} disabled={loading}>
//                             <Ionicons name="checkmark-circle-outline" size={18} color="white" />
//                             <Text style={styles.btnText}>{loading ? "Verifying..." : "Verify OTP"}</Text>
//                         </TouchableOpacity>

//                         {/* Resend OTP with timer */}
//                         <TouchableOpacity disabled={timer > 0} onPress={resendOtp}>
//                             <Text style={[styles.resendText, timer > 0 && { color: "#aaa" }]}>
//                                 {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
//                             </Text>
//                         </TouchableOpacity>
//                     </>
//                 )}
//             </View>
//         </KeyboardAvoidingView>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8f9fa", padding: 20 },
//     card: {
//         width: "100%",
//         backgroundColor: "white",
//         padding: 25,
//         borderRadius: 15,
//         elevation: 5,
//         shadowColor: "#000",
//         shadowOpacity: 0.1,
//         shadowRadius: 6,
//         alignItems: "center",
//     },
//     icon: { marginBottom: 15 },
//     title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#333" },
//     label: { fontSize: 16, fontWeight: "500", alignSelf: "flex-start", marginBottom: 5, color: "#555" },
//     input: {
//         borderWidth: 1,
//         borderColor: "#ddd",
//         backgroundColor: "#fdfdfd",
//         width: "100%",
//         padding: 12,
//         borderRadius: 10,
//         marginBottom: 15,
//         fontSize: 16,
//     },
//     button: {
//         flexDirection: "row",
//         backgroundColor: "#007bff",
//         padding: 14,
//         borderRadius: 10,
//         justifyContent: "center",
//         alignItems: "center",
//         width: "100%",
//     },
//     btnText: { color: "white", fontWeight: "bold", fontSize: 16, marginLeft: 8 },
//     resendText: { marginTop: 12, fontSize: 14, color: "#007bff", fontWeight: "500" },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import API from "../api";
import { saveAuthData } from "../utils/auth";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0); // Resend OTP timer

  // 📌 Send OTP API
  const sendOtp = async () => {
    if (!email || !email.includes("@")) return Alert.alert("Enter a valid email");
    try {
      setLoading(true);
      await API.post("/auth/send-otp", { email });
      setStep(2);
      setTimer(60); // Start 60s timer
    } catch (err) {
      Alert.alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 📌 Resend OTP
  const resendOtp = () => {
    if (timer === 0) sendOtp();
  };

  // 📌 Timer Countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // 📌 Verify OTP
  const verifyOtp = async () => {
    if (!otp) return Alert.alert("Please enter OTP");
    try {
      setLoading(true);
      const res = await API.post("/auth/verify-otp", { email, otp });
      global.authToken = res.data.token;
      global.currentUser = res.data.user;
      await saveAuthData(res.data.token, res.data.user);
      navigation.replace("Dashboard");
    } catch (err) {
      Alert.alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Ionicons name="school-outline" size={70} color="#007bff" style={styles.icon} />
        <Text style={styles.title}>Student Login</Text>

        {step === 1 ? (
          <>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={sendOtp} disabled={loading}>
              <Ionicons name="send-outline" size={18} color="white" />
              <Text style={styles.btnText}>{loading ? "Sending..." : "Send OTP"}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              maxLength={4}
            />
            <TouchableOpacity style={styles.button} onPress={verifyOtp} disabled={loading}>
              <Ionicons name="checkmark-circle-outline" size={18} color="white" />
              <Text style={styles.btnText}>{loading ? "Verifying..." : "Verify OTP"}</Text>
            </TouchableOpacity>

            {/* Resend OTP with timer */}
            <TouchableOpacity disabled={timer > 0} onPress={resendOtp}>
              <Text style={[styles.resendText, timer > 0 && { color: "#aaa" }]}>
                {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8f9fa", padding: 20 },
  card: {
    width: "100%",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: "center",
  },
  icon: { marginBottom: 15 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#333" },
  label: { fontSize: 16, fontWeight: "500", alignSelf: "flex-start", marginBottom: 5, color: "#555" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fdfdfd",
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  btnText: { color: "white", fontWeight: "bold", fontSize: 16, marginLeft: 8 },
  resendText: { marginTop: 12, fontSize: 14, color: "#007bff", fontWeight: "500" },
});
