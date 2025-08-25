// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useFocusEffect } from "@react-navigation/native";

// export default function Dashboard({ navigation }) {
//   const [user, setUser] = useState(global.currentUser);

//   // ✅ Update user data whenever Dashboard is focused
//   useFocusEffect(
//     React.useCallback(() => {
//       setUser(global.currentUser); // Refresh from global
//     }, [])
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Text style={styles.title}>👋 Welcome, {user?.name}</Text>
//       <Text style={styles.subtitle}>Manage your attendance, profile, and feedback easily.</Text>

//       {/* Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Attendance")}>
//           <Ionicons name="calendar-outline" size={28} color="#007bff" />
//           <Text style={styles.cardText}>View Attendance</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Profile")}>
//           <Ionicons name="person-circle-outline" size={28} color="#28a745" />
//           <Text style={styles.cardText}>Update Profile</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Feedback")}>
//           <Ionicons name="chatbubbles-outline" size={28} color="#ffc107" />
//           <Text style={styles.cardText}>Feedback</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Logout */}
//       <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace("Login")}>
//         <Ionicons name="log-out-outline" size={22} color="white" />
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f8f9fa", paddingHorizontal: 20, justifyContent: "center" },
//   title: { fontSize: 26, fontWeight: "bold", color: "#333", textAlign: "center", marginBottom: 5 },
//   subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 30 },
//   buttonContainer: { marginTop: 10 },
//   card: {
//     backgroundColor: "white",
//     padding: 18,
//     marginVertical: 10,
//     borderRadius: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardText: { fontSize: 18, fontWeight: "500", marginLeft: 15, color: "#333" },
//   logoutBtn: {
//     flexDirection: "row",
//     backgroundColor: "red",
//     padding: 14,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 30,
//   },
//   logoutText: { color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
// });

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Dashboard({ navigation }) {
  const [user, setUser] = useState(global.currentUser);

  // ✅ Keep checking for updated profile info
  useEffect(() => {
    const interval = setInterval(() => {
      if (global.currentUser && global.currentUser.name !== user.name) {
        setUser({ ...global.currentUser });
      }
    }, 500); // Poll every 0.5s
    return () => clearInterval(interval);
  }, [user]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>👋 Welcome, {user.name}</Text>
      <Text style={styles.subtitle}>Manage your attendance, profile, and feedback easily.</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Attendance")}>
          <Ionicons name="calendar-outline" size={28} color="#007bff" />
          <Text style={styles.cardText}>View Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle-outline" size={28} color="#28a745" />
          <Text style={styles.cardText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Feedback")}>
          <Ionicons name="chatbubbles-outline" size={28} color="#ffc107" />
          <Text style={styles.cardText}>Feedback</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace("Login")}>
        <Ionicons name="log-out-outline" size={22} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", paddingHorizontal: 20, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "bold", color: "#333", textAlign: "center", marginBottom: 5 },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 30 },
  buttonContainer: { marginTop: 10 },
  card: {
    backgroundColor: "white",
    padding: 18,
    marginVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: { fontSize: 18, fontWeight: "500", marginLeft: 15, color: "#333" },
  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "red",
    padding: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  logoutText: { color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
});
