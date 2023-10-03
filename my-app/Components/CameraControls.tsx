import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

interface CameraControlsProps {
  handleFlashMode: () => void;
  toggleCameraType: () => void;
  takePicture: () => void;
  iconColor: string;
}

function CameraControls({
  handleFlashMode,
  toggleCameraType,
  takePicture,
  iconColor,
}: CameraControlsProps) {
  return (
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
  );
}

export default CameraControls;
