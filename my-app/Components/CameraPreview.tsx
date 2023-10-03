import React, { useState } from "react";
import {
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface CameraPreviewProps {
  photo: any;
  retakePicture: () => void;
  savePhoto: (caption: string) => void;
}

function CameraPreview({photo,retakePicture,savePhoto, }: CameraPreviewProps) {
  const [textInput, setTextInput] = useState("");

  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="height"
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 10,
              justifyContent: "flex-end",
            }}
          >
            <TextInput
              placeholder="Lägg till en kommentar..."
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
              autoCorrect={true}
              style={{
                backgroundColor: "lightgrey",
                borderStyle: "solid",
                padding: 10,
                justifyContent: "center",
                alignSelf: "stretch",
                marginBottom: 5,
                borderRadius: 30,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 100,
                height: 30,
                alignItems: "center",
                borderRadius: 30,
                backgroundColor: "#333",
              }}
            >
              <Text
                style={{
                  flex: 1,
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 20,
                  marginTop: 5,
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => savePhoto(textInput)}
              style={{
                width: 100,
                height: 30,
                alignItems: "center",
                borderRadius: 30,
                backgroundColor: "lime",
              }}
            >
              <Text
                style={{
                  flex: 1,
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 20,
                  marginTop: 5,
                }}
              >
                Save photo
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </View>
  );
}

export default CameraPreview;