import React, { useEffect } from "react";
import { BackgroundImageUri } from "../Utils/BackgroundImage";
import { View, StyleSheet, ImageBackground } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen: React.FC = () => {
  const welcomeOpacity = useSharedValue(0);
  const takePicturesOpacity = useSharedValue(0);
  const savePicturesOpacity = useSharedValue(0);
  const seeLocationOpacity = useSharedValue(0);

  const startAnimation = () => {
    welcomeOpacity.value = withSpring(1, { damping: 1, stiffness: 10 });

    const delay = (ms: number, callback: () => void) =>
      setTimeout(callback, ms);

    delay(
      1000,
      () =>
        (takePicturesOpacity.value = withSpring(1, {
          damping: 1,
          stiffness: 10,
        }))
    );

    delay(
      2000,
      () =>
        (savePicturesOpacity.value = withSpring(1, {
          damping: 1,
          stiffness: 10,
        }))
    );

    delay(
      3000,
      () =>
        (seeLocationOpacity.value = withSpring(1, {
          damping: 1,
          stiffness: 10,
        }))
    );
  };

  useEffect(() => {
    const animationDelay = 2000;
    const animationTimer = setTimeout(() => {
      startAnimation();
    }, animationDelay);
    return () => {
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <ImageBackground
      source={{ uri: BackgroundImageUri }}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.welcomeText,
            useAnimatedStyle(() => {
              return {
                opacity: welcomeOpacity.value,
                transform: [
                  {
                    translateY: interpolate(
                      welcomeOpacity.value,
                      [0, 1],
                      [-20, 0]
                    ),
                  },
                ],
              };
            }),
          ]}
        >
          Welcome to My Photo App!
        </Animated.Text>

        <Animated.Text
          style={[
            styles.subtitleText,
            useAnimatedStyle(() => {
              return {
                opacity: takePicturesOpacity.value,
                transform: [
                  {
                    translateY: interpolate(
                      takePicturesOpacity.value,
                      [0, 1],
                      [-20, 0]
                    ),
                  },
                ],
              };
            }),
          ]}
        >
          -Take pictures
          <MaterialIcons name="photo-camera" size={20} color="#7fff6e" />
        </Animated.Text>

        <Animated.Text
          style={[
            styles.subtitleText,
            useAnimatedStyle(() => {
              return {
                opacity: savePicturesOpacity.value,
                transform: [
                  {
                    translateY: interpolate(
                      savePicturesOpacity.value,
                      [0, 1],
                      [-20, 0]
                    ),
                  },
                ],
              };
            }),
          ]}
        >
          -Save pictures
          <MaterialIcons name="save" size={20} color="#7fff6e" />
        </Animated.Text>

        <Animated.Text
          style={[
            styles.subtitleText,
            useAnimatedStyle(() => {
              return {
                opacity: seeLocationOpacity.value,
                transform: [
                  {
                    translateY: interpolate(
                      seeLocationOpacity.value,
                      [0, 1],
                      [-20, 0]
                    ),
                  },
                ],
              };
            }),
          ]}
        >
          -See location of pictures
          <MaterialIcons name="location-on" size={20} color="#7fff6e" />
        </Animated.Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textShadowColor: "black",
    textShadowOffset: { width: -2, height: -2 },
    textShadowRadius: 2,
  },
  subtitleText: {
    alignItems: "center",
    fontSize: 20,
    color: "white",
    textShadowColor: "#ff22a9",
    textShadowOffset: { width: -2, height: -2 },
    textShadowRadius: 2,
  },
});

export default HomeScreen;
