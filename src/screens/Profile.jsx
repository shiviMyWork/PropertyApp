// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
// import API from "../api";
// import * as ImagePicker from "react-native-image-picker";
// import { PermissionsAndroid, Platform } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";

// export const requestPermissions = async (type = "camera") => {
//   if (Platform.OS === "android") {
//     try {
//       let permissions = [];

//       if (type === "camera") {
//         permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
//       } else if (type === "gallery") {
//         if (Platform.Version >= 33) {
//           permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES); // Android 13+
//         } else {
//           permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
//         }
//       }

//       const granted = await PermissionsAndroid.requestMultiple(permissions);
//       return Object.values(granted).every((status) => status === PermissionsAndroid.RESULTS.GRANTED);
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   }
//   return true;
// };

// export default function Profile() {
//   const [user, setUser] = useState(global.currentUser); // ✅ Local state for re-render
//   const [name, setName] = useState(user.name || "");
//   const [photo, setPhoto] = useState(null);

//   const pickImage = async () => {
//     const hasPermission = await requestPermissions("gallery");
//     if (!hasPermission) return Alert.alert("Permission Denied", "Please allow gallery permission.");

//     ImagePicker.launchImageLibrary({ mediaType: "photo", selectionLimit: 1 }, (res) => {
//       if (!res.didCancel && res.assets && res.assets.length > 0) {
//         setPhoto(res.assets[0]);
//       }
//     });
//   };

//   const takePhoto = async () => {
//     const hasPermission = await requestPermissions();
//     if (!hasPermission) return Alert.alert("Permission Denied", "Please allow camera/gallery permissions from settings.");

//     ImagePicker.launchCamera({ mediaType: "photo" }, (res) => {
//       if (!res.didCancel && res.assets) setPhoto(res.assets[0]);
//     });
//   };

//   const updateProfile = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     if (photo) {
//       formData.append("photo", {
//         uri: photo.uri,
//         type: photo.type,
//         name: photo.fileName,
//       });
//     }

//     const res = await API.put("/profile", formData, { headers: { "Content-Type": "multipart/form-data" } });

//     global.currentUser = res.data; // ✅ Update global
//     setUser(res.data); // ✅ Update local state to trigger re-render
//     setName(res.data.name);
//     Alert.alert("Profile updated successfully!");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>👤 Update Profile</Text>

//       {/* Profile Picture */}
//       <View style={styles.imageContainer}>
//         {photo ? (
//           <Image source={{ uri: photo.uri }} style={styles.image} />
//         ) : user.photo ? (
//           <Image source={{ uri: `https://backend-t41o.onrender.com${user.photo}` }} style={styles.image} />
//         ) : (
//           <View style={styles.placeholder}>
//             <Ionicons name="person-circle-outline" size={100} color="#aaa" />
//           </View>
//         )}
//       </View>

//       {/* Name Input */}
//       <Text style={styles.label}>Full Name</Text>
//       <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter Name" />

//       {/* Photo Buttons */}
//       <View style={styles.photoButtons}>
//         <TouchableOpacity style={[styles.smallButton, { backgroundColor: "#007bff" }]} onPress={pickImage}>
//           <Ionicons name="image-outline" size={20} color="white" />
//           <Text style={styles.smallBtnText}>Upload</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.smallButton, { backgroundColor: "#28a745" }]} onPress={takePhoto}>
//           <Ionicons name="camera-outline" size={20} color="white" />
//           <Text style={styles.smallBtnText}>Camera</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Save Button */}
//       <TouchableOpacity style={styles.saveButton} onPress={updateProfile}>
//         <Ionicons name="save-outline" size={22} color="white" />
//         <Text style={styles.saveBtnText}>Save Changes</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, paddingTop: "12%", backgroundColor: "#f8f9fa" },
//   title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 25, color: "#333" },
//   label: { fontSize: 16, fontWeight: "500", color: "#555", marginBottom: 5 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "white",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 20,
//     fontSize: 16,
//   },
//   imageContainer: { alignItems: "center", marginBottom: 20 },
//   image: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: "#007bff" },
//   placeholder: { width: 120, height: 120, justifyContent: "center", alignItems: "center" },
//   photoButtons: { flexDirection: "row", justifyContent: "space-between", marginBottom: 25 },
//   smallButton: {
//     flexDirection: "row",
//     flex: 0.48,
//     padding: 12,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   smallBtnText: { color: "white", fontWeight: "bold", marginLeft: 8 },
//   saveButton: {
//     flexDirection: "row",
//     backgroundColor: "#007bff",
//     padding: 14,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 3,
//   },
//   saveBtnText: { color: "white", fontWeight: "bold", fontSize: 16, marginLeft: 8 },
// });

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Modal } from "react-native";
import API from "../api";
import * as ImagePicker from "react-native-image-picker";
import { PermissionsAndroid, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageView from "react-native-image-viewing"; // ✅ For fullscreen image view

export const requestPermissions = async (type = "camera") => {
  if (Platform.OS === "android") {
    try {
      let permissions = [];

      if (type === "camera") {
        permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
      } else if (type === "gallery") {
        if (Platform.Version >= 33) {
          permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
        } else {
          permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        }
      }

      const granted = await PermissionsAndroid.requestMultiple(permissions);
      return Object.values(granted).every((status) => status === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

export default function Profile() {
  const [user, setUser] = useState(global.currentUser);
  const [name, setName] = useState(user.name || "");
  const [photo, setPhoto] = useState(null);
  const [isViewerVisible, setIsViewerVisible] = useState(false); // ✅ Image viewer state

  const profileImageUri = photo 
    ? photo.uri 
    : user.photo 
    ? `https://backend-t41o.onrender.com${user.photo}` 
    : null;

  const pickImage = async () => {
    const hasPermission = await requestPermissions("gallery");
    if (!hasPermission) return Alert.alert("Permission Denied", "Please allow gallery permission.");

    ImagePicker.launchImageLibrary({ mediaType: "photo", selectionLimit: 1 }, (res) => {
      if (!res.didCancel && res.assets && res.assets.length > 0) {
        setPhoto(res.assets[0]);
      }
    });
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return Alert.alert("Permission Denied", "Please allow camera/gallery permissions from settings.");

    ImagePicker.launchCamera({ mediaType: "photo" }, (res) => {
      if (!res.didCancel && res.assets) setPhoto(res.assets[0]);
    });
  };

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (photo) {
      formData.append("photo", {
        uri: photo.uri,
        type: photo.type,
        name: photo.fileName,
      });
    }

    const res = await API.put("/profile", formData, { headers: { "Content-Type": "multipart/form-data" } });
    global.currentUser = res.data;
    setUser(res.data);
    setName(res.data.name);
    Alert.alert("Profile updated successfully!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Update Profile</Text>

      {/* Profile Picture */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => profileImageUri && setIsViewerVisible(true)}>
          {profileImageUri ? (
            <Image source={{ uri: profileImageUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="person-circle-outline" size={100} color="#aaa" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Fullscreen Image Viewer */}
      <ImageView
        images={[{ uri: profileImageUri }]}
        imageIndex={0}
        visible={isViewerVisible}
        onRequestClose={() => setIsViewerVisible(false)}
      />

      {/* Name Input */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter Name" />

      {/* Photo Buttons */}
      <View style={styles.photoButtons}>
        <TouchableOpacity style={[styles.smallButton, { backgroundColor: "#007bff" }]} onPress={pickImage}>
          <Ionicons name="image-outline" size={20} color="white" />
          <Text style={styles.smallBtnText}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.smallButton, { backgroundColor: "#28a745" }]} onPress={takePhoto}>
          <Ionicons name="camera-outline" size={20} color="white" />
          <Text style={styles.smallBtnText}>Camera</Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={updateProfile}>
        <Ionicons name="save-outline" size={22} color="white" />
        <Text style={styles.saveBtnText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: "12%", backgroundColor: "#f8f9fa" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 25, color: "#333" },
  label: { fontSize: 16, fontWeight: "500", color: "#555", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  imageContainer: { alignItems: "center", marginBottom: 20 },
  image: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: "#007bff" },
  placeholder: { width: 120, height: 120, justifyContent: "center", alignItems: "center" },
  photoButtons: { flexDirection: "row", justifyContent: "space-between", marginBottom: 25 },
  smallButton: {
    flexDirection: "row",
    flex: 0.48,
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  smallBtnText: { color: "white", fontWeight: "bold", marginLeft: 8 },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  saveBtnText: { color: "white", fontWeight: "bold", fontSize: 16, marginLeft: 8 },
});
