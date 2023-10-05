import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

interface CameraControlsProps {
  handleFlashMode: () => void;
  toggleCameraType: () => void;
  takePicture: () => void;
  iconColor: string;
}

function CameraControls({ handleFlashMode, toggleCameraType, takePicture, iconColor,}: CameraControlsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.flashIconContainer}>
        <TouchableOpacity onPress={handleFlashMode}>
          <Entypo name="flash" size={40} color={iconColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.cameraFlipIconContainer}>
        <TouchableOpacity onPress={toggleCameraType}>
          <MaterialCommunityIcons
            name="camera-flip-outline"
            size={40}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.takePictureButtonContainer}>
        <TouchableOpacity
          onPress={takePicture}
          style={styles.takePictureButton}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="gesture-tap-button"
              size={34}
              color="black"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  flashIconContainer: {
    position: "absolute",
    left: "5%",
    top: "5%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cameraFlipIconContainer: {
    position: "absolute",
    right: "5%",
    top: "5%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  takePictureButtonContainer: {
    position: "absolute",
    bottom: "10%",
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  takePictureButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 55,
    backgroundColor: "#fff",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CameraControls;
