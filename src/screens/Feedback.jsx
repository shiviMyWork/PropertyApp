import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, Alert } from "react-native";
import API from "../api";
import StarRating from "react-native-star-rating-widget";
import * as ImagePicker from "react-native-image-picker";
import { PermissionsAndroid, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const requestPermissions = async (type = "camera") => {
    if (Platform.OS === "android") {
        try {
            let permissions = [];

            if (type === "camera") {
                permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
            } else if (type === "gallery") {
                if (Platform.Version >= 33) {
                    permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES); // Android 13+
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

export default function Feedback() {
    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);
    const [image, setImage] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);

    const pickImage = async () => {
        const hasPermission = await requestPermissions("gallery");
        if (!hasPermission) return Alert.alert("Permission Denied", "Please allow gallery permission.");

        ImagePicker.launchImageLibrary({ mediaType: "photo", selectionLimit: 1 }, (res) => {
            if (!res.didCancel && res.assets && res.assets.length > 0) {
                setImage(res.assets[0]);
            }
        });
    };

    const takePhoto = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return Alert.alert("Permission Denied", "Please allow camera/gallery permissions from settings.");

        ImagePicker.launchCamera({ mediaType: "photo" }, (res) => {
            if (!res.didCancel && res.assets) setImage(res.assets[0]);
        });
    };

    const submitFeedback = async () => {
        if (!rating) return Alert.alert("Please give a rating!");

        const formData = new FormData();
        formData.append("text", text);
        formData.append("rating", rating);
        if (image) {
            formData.append("image", {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            });
        }

        await API.post("/feedback", formData, { headers: { "Content-Type": "multipart/form-data" } });
        Alert.alert("Feedback submitted!");
        setText(""); setRating(0); setImage(null);
        loadFeedbacks();
    };

    const loadFeedbacks = async () => {
        const res = await API.get("/feedback");
        setFeedbacks(res.data);
    };

    useEffect(() => { loadFeedbacks(); }, []);

    const renderFeedback = ({ item }) => (
        <View style={styles.feedbackCard}>
            <View style={styles.feedbackHeader}>
                <Ionicons name="chatbubble-ellipses-outline" size={20} color="#007bff" />
                <Text style={styles.feedbackText}>{item.text}</Text>
            </View>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
            {item.image && <Image source={{ uri: `https://backend-t41o.onrender.com${item.image}` }} style={styles.feedbackImage} />}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>💬 Submit Feedback</Text>
            
            {/* Feedback Input */}
            <TextInput
                style={styles.input}
                placeholder="Write your feedback..."
                value={text}
                onChangeText={setText}
                multiline
            />

            {/* Star Rating */}
            <Text style={styles.label}>Your Rating:</Text>
            <StarRating rating={rating} onChange={setRating} starSize={32} color="#f1c40f" />

            {/* Image Preview */}
            <View style={styles.imageContainer}>
                {image && <Image source={{ uri: image.uri }} style={styles.image} />}
            </View>

            {/* Image Buttons */}
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

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
                <Ionicons name="send-outline" size={20} color="white" />
                <Text style={styles.submitBtnText}>Submit Feedback</Text>
            </TouchableOpacity>

            {/* Feedback List */}
            <Text style={[styles.label, { marginTop: 20 }]}>Your Previous Feedback:</Text>
            <FlatList
                data={feedbacks}
                keyExtractor={(item) => item._id}
                renderItem={renderFeedback}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={<Text style={styles.emptyText}>No feedback yet</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop:"12%", backgroundColor: "#f8f9fa" },
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#333" },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "white",
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        textAlignVertical: "top",
        height: 80,
    },
    label: { fontSize: 16, fontWeight: "600", color: "#555", marginBottom: 8 },
    imageContainer: { alignItems: "center", marginVertical: 10 },
    image: { width: 100, height: 100, borderRadius: 8 },
    photoButtons: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
    smallButton: {
        flexDirection: "row",
        flex: 0.48,
        padding: 12,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    smallBtnText: { color: "white", fontWeight: "bold", marginLeft: 6 },
    submitButton: {
        flexDirection: "row",
        backgroundColor: "#007bff",
        padding: 14,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    submitBtnText: { color: "white", fontWeight: "bold", fontSize: 16, marginLeft: 8 },
    feedbackCard: {
        backgroundColor: "white",
        padding: 15,
        marginVertical: 6,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    feedbackHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
    feedbackText: { marginLeft: 8, fontSize: 15, color: "#333", flex: 1 },
    ratingText: { color: "#f39c12", fontWeight: "600", marginBottom: 6 },
    feedbackImage: { width: 70, height: 70, borderRadius: 8, marginTop: 5 },
    emptyText: { textAlign: "center", color: "#777", marginTop: 15, fontSize: 15 },
});
