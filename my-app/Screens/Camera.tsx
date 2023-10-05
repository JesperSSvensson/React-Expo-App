import React, { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, Alert } from "react-native";
import { Camera } from "expo-camera";
import { CameraType } from "expo-image-picker";
import {
  LocationObject,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

import CameraPreview from "../Components/CameraPreview";
import CameraControls from "../Components/CameraControls";

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
    getLocationAsync();
    StartCamera();
  }, []);


  const getLocationAsync = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync({});
      setLocation(location);
    } else {
      Alert.alert("Access to location denied.");
    }
  };

  const StartCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      setStartCamera(true);
      setCameraType(CameraType.back);
    } else {
      Alert.alert("Access to camera denied");
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
        Alert.alert("Photo saved successfully!");
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
              <CameraControls
                handleFlashMode={handleFlashMode}
                toggleCameraType={toggleCameraType}
                takePicture={takePicture}
                iconColor={iconColor}
              />
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 2,
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

export default CameraScreen;
