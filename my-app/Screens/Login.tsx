import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import * as LocalAuthentication from "expo-local-authentication";
import { RootStackParamList } from "../Navigator/MyNavigator";
import { RouteProp } from "@react-navigation/native";
import { BackgroundImageUri } from "../Components/BackgroundImage";
import LottieAnimation from "../Components/LottieAnimation";

interface Props {
  navigation: any;
  route: RouteProp<RootStackParamList, "Login">;
}

export default function Login({ navigation }: Props) {
  const getAccessWithPinCode = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Use your verification code",
      });

      if (result.success) {
        alert("Authentication successful!");
        navigation.navigate("Home");
      } else {
        alert("Authentication failed or canceled.");
        LocalAuthentication.cancelAuthenticate();
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      alert("An error occurred during authentication. Please try again later.");
    }
  };

  return (
    <ImageBackground
      source={{ uri: BackgroundImageUri }}
      style={styles.backgroundImage}
    >
      <LottieAnimation />
      <View style={styles.container}>
        <View style={styles.blurContainer}>
          <BlurView intensity={10} style={styles.blurView} tint="dark">
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.7}
              onPress={getAccessWithPinCode}
            >
              <Text style={styles.buttonText}>Logga in</Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  blurContainer: {
    width: 110,
    height: 110,
    borderRadius: 90,
    overflow: "hidden",
  },
  blurView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loginButton: {
    backgroundColor: "pink",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowOffset: { width: 2, height: 2 },
  },
});
