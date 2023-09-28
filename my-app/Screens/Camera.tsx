import React, { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import { CameraType } from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  LocationObject,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

interface CameraProps {
  photo: any;
  retakePicture: () => void;
  savePhoto: (caption: string) => void;
  toggleCameraType: () => void;
  flashMode: () => void;
  location: LocationObject | null;
}

const CameraScreen = () => {
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type);
  const [flashMode, setFlashMode] = useState("off");
  const [iconColor, setIconColor] = useState("white");
  const [location, setLocation] = useState<LocationObject | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    async function getLocationAsync() {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await getCurrentPositionAsync({});
        setLocation(location);
      } else {
        Alert.alert("Access to location denied.");
      }
    }
    getLocationAsync();
    StartCamera();
  }, []);

  const StartCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      setStartCamera(true);
      setCameraType(CameraType.back);
    } else {
      Alert.alert("Access denied");
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo: any = await cameraRef.current.takePictureAsync();
      console.log(photo);
      setPreviewVisible(true);
      setCapturedImage(photo);

      console.log("location", location);
    }
  };

  const savePhoto = async (caption: string) => {
    if (capturedImage) {
      try {
        const timestamp = new Date().getTime();
        const key = `Pic-Saved-${timestamp}`;

        const photoWithLocation = {
          ...capturedImage,
          timestamp: timestamp,
          location: location,
          caption: caption,
         
        };

        await AsyncStorage.setItem(key, JSON.stringify(photoWithLocation));
        console.log("Photo saved successfully!");
      } catch (error) {
        console.error("Error saving photo:", error);
      }
      setStartCamera(false);
      retakePicture();
    }
  };

  const toggleCameraType = () => {
    setCameraType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    StartCamera();
  };

  const handleFlashMode = () => {
    const newIconColor = iconColor === "orange" ? "white" : "orange";
    setIconColor(newIconColor);

    if (flashMode === "off") {
      setFlashMode("on");
    } else if (flashMode === "on") {
      setFlashMode("off");
    } else {
      setFlashMode("auto");
    }
  };

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View style={{ flex: 1, width: "100%" }}>
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={savePhoto}
              retakePicture={retakePicture}
              toggleCameraType={toggleCameraType}
              flashMode={handleFlashMode}
              location={location}
            />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{ flex: 1 }}
              ref={(r) => {
                cameraRef.current = r;
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: "transparent",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    left: "5%",
                    top: "5%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={handleFlashMode}>
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      <Entypo name="flash" size={40} color={iconColor} />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: "absolute",
                    right: "5%",
                    top: "5%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={toggleCameraType}>
                    <Text
                      style={{
                        fontSize: 10,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="camera-flip-outline"
                        size={40}
                        color="white"
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    flex: 1,
                    width: "100%",
                    padding: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 35,
                        backgroundColor: "#fff",
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// console.log("Photo taken", photo, "Location:", location);
const CameraPreview: React.FC<CameraProps> = ({
  photo,
  retakePicture,
  savePhoto,
  location,
}) => {
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
                  marginTop:5,
                
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
                  marginTop:5,
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
};
export default CameraScreen;
