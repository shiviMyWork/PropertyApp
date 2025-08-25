import React from "react";
import { View, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "react-native-image-picker";

export default function CameraCapture({ onCapture }) {
  const takePhoto = () => {
    ImagePicker.launchCamera({ mediaType: "photo" }, (res) => {
      if (!res.didCancel && res.assets) {
        onCapture(res.assets[0]); // Pass selected image back to parent
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={takePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
});
