import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import LottieView from "lottie-react-native"; 
import * as LocalAuthentication from "expo-local-authentication";
import { RootStackParamList } from "../Navigator/MyNavigator";
import { RouteProp } from "@react-navigation/native";
import { BackgroundImageUri } from "../Utils/BackgroundImage";

interface Props {
  navigation: any;
  route: RouteProp<RootStackParamList, "Login">;
}

export default function Login({ navigation }: Props) {
  const lottieRef = useRef<LottieView | null>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, []);

  const getAccessWithPinCode = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Logga in med din personliga kod",
      });

      if (result.success) {
        alert("Authentication successful!");
        navigation.navigate("Home");
      } else {
        alert("Authentication failed or canceled.");
      }
    } catch (error) {
      LocalAuthentication.cancelAuthenticate();
    }
  };

  return (
    <ImageBackground
      source={{ uri: BackgroundImageUri }}
      style={styles.backgroundImage}
    >
      <LottieView
        ref={lottieRef}
        source={require("../Utils/Animation - 1696448678389.json")} 
        style={styles.animation}
        loop
      />
      <View style={styles.container}>
        <View style={styles.blurContainer}>
          <BlurView intensity={10} style={styles.blurView} tint="light">
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
    width: 200,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  blurView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    position: "absolute",
    width: "20%",
    height: "20%",
    top: "20%", 
    left: "20%", 
    
  },
  loginButton: {
    backgroundColor: "pink", 
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5, 
    shadowColor: "black", 
    shadowOpacity: 0.3, 
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", 
  },
});