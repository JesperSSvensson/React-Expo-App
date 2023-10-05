import React, { useState } from "react";
import {
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from "react-native";

interface CameraPreviewProps {
  photo: any;
  retakePicture: () => void;
  savePhoto: (caption: string) => void;
}

function CameraPreview({ photo, retakePicture, savePhoto }: CameraPreviewProps) {
  const [textInput, setTextInput] = useState("");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="height"
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{ flex: 1 }}
        >
          <View style={styles.textContainer}>
            <TextInput
              placeholder="Add a comment..."
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
              autoCorrect={true}
              style={styles.textInput}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={retakePicture}
              style={styles.retakeButton}
            >
              <Text style={styles.buttonText}>Re-take</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => savePhoto(textInput)}
              style={styles.saveButton}
            >
              <Text style={styles.buttonText}>Save photo</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    justifyContent: "flex-end",
  },
  textInput: {
    backgroundColor: "lightgrey",
    borderStyle: "solid",
    padding: 10,
    justifyContent: "center",
    alignSelf: "stretch",
    marginBottom: 5,
    borderRadius: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  retakeButton: {
    width: 100,
    height: 30,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#333",
  },
  saveButton: {
    width: 100,
    height: 30,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "lime",
  },
  buttonText: {
    flex: 1,
    justifyContent: "center",
    color: "#fff",
    fontSize: 20,
    marginTop: 5,
  },
});

export default CameraPreview;