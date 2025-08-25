// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import API from "../api";

// export default function Attendance() {
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const loadAttendance = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/attendance");
//       setAttendance(res.data);
//     } catch (err) {
//       Alert.alert("Error", "Failed to load attendance records");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAttendance = async (status) => {
//     try {
//       setLoading(true);
//       await API.post("/attendance", { status });
//       Alert.alert("Success", `Attendance marked as ${status}`);
//       loadAttendance();
//     } catch (err) {
//       Alert.alert("Error", "Failed to mark attendance");
//     }
//   };

//   useEffect(() => {
//     loadAttendance();
//   }, []);

//   const renderItem = ({ item }) => (
//     <View style={styles.recordCard}>
//       <View style={styles.recordLeft}>
//         <Ionicons
//           name={item.status === "Present" ? "checkmark-circle" : "close-circle"}
//           size={28}
//           color={item.status === "Present" ? "#28a745" : "#dc3545"}
//         />
//         <Text style={styles.recordDate}>{new Date(item.date).toLocaleDateString()}</Text>
//       </View>
//       <Text style={[styles.recordStatus, { color: item.status === "Present" ? "#28a745" : "#dc3545" }]}>
//         {item.status}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>📅 Attendance Records</Text>

//       {/* Mark Attendance Buttons */}
//       <View style={styles.buttonRow}>
//         <TouchableOpacity style={[styles.button, { backgroundColor: "#28a745" }]} disabled={loading} onPress={() => markAttendance("Present")}>
//           <Ionicons name="checkmark" size={20} color="white" />
//           <Text style={styles.btnText}>Mark Present</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={[styles.button, { backgroundColor: "#dc3545" }]} disabled={loading} onPress={() => markAttendance("Absent")}>
//           <Ionicons name="close" size={20} color="white" />
//           <Text style={styles.btnText}>Mark Absent</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Loader */}
//       {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 10 }} />}

//       {/* Attendance List */}
//       <FlatList
//         data={attendance}
//         keyExtractor={(item) => item._id}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//         ListEmptyComponent={<Text style={styles.emptyText}>No attendance records found</Text>}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f8f9fa", padding: 20, paddingTop:"12%" },
//   title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#333" },
//   buttonRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
//   button: {
//     flexDirection: "row",
//     flex: 0.48,
//     padding: 14,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 3,
//   },
//   btnText: { color: "white", fontWeight: "bold", fontSize: 16, marginLeft: 8 },
//   recordCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "white",
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   recordLeft: { flexDirection: "row", alignItems: "center" },
//   recordDate: { fontSize: 16, marginLeft: 10, color: "#333" },
//   recordStatus: { fontSize: 16, fontWeight: "bold" },
//   emptyText: { textAlign: "center", color: "#777", marginTop: 20, fontSize: 16 },
// });

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import API from "../api";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todayMarked, setTodayMarked] = useState(false);

  const loadAttendance = async () => {
    try {
      setLoading(true);
      const res = await API.get("/attendance");
      setAttendance(res.data);

      // ✅ Check if today's attendance is already marked
      const today = new Date().toDateString();
      const alreadyMarked = res.data.some(
        (record) => new Date(record.date).toDateString() === today
      );
      setTodayMarked(alreadyMarked);
    } catch (err) {
      Alert.alert("Error", "Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (status) => {
    if (todayMarked) {
      Alert.alert("Already Marked", "You have already marked attendance for today.");
      return;
    }
    try {
      setLoading(true);
      await API.post("/attendance", { status });
      Alert.alert("Success", `Attendance marked as ${status}`);
      loadAttendance();
    } catch (err) {
      Alert.alert("Error", "Failed to mark attendance");
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.recordCard}>
      <View style={styles.recordLeft}>
        <Ionicons
          name={item.status === "Present" ? "checkmark-circle" : "close-circle"}
          size={28}
          color={item.status === "Present" ? "#28a745" : "#dc3545"}
        />
        <Text style={styles.recordDate}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <Text style={[styles.recordStatus, { color: item.status === "Present" ? "#28a745" : "#dc3545" }]}>
        {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Attendance Records</Text>

      {/* Mark Attendance Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: todayMarked ? "#ccc" : "#28a745" }]}
          disabled={loading || todayMarked}
          onPress={() => markAttendance("Present")}
        >
          <Ionicons name="checkmark" size={20} color="white" />
          <Text style={styles.btnText}>Mark Present</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: todayMarked ? "#ccc" : "#dc3545" }]}
          disabled={loading || todayMarked}
          onPress={() => markAttendance("Absent")}
        >
          <Ionicons name="close" size={20} color="white" />
          <Text style={styles.btnText}>Mark Absent</Text>
        </TouchableOpacity>
      </View>

      {/* Loader */}
      {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 10 }} />}

      {/* Attendance List */}
      <FlatList
        data={attendance}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No attendance records found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 20, paddingTop: "12%" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#333" },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  button: {
    flexDirection: "row",
    flex: 0.48,
    padding: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  btnText: { color: "white", fontWeight: "bold", fontSize: 16, marginLeft: 8 },
  recordCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recordLeft: { flexDirection: "row", alignItems: "center" },
  recordDate: { fontSize: 16, marginLeft: 10, color: "#333" },
  recordStatus: { fontSize: 16, fontWeight: "bold" },
  emptyText: { textAlign: "center", color: "#777", marginTop: 20, fontSize: 16 },
});
