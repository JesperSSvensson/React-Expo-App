import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate } from "react-native-reanimated";

const HomeScreen = () => {
  const welcomeOpacity = useSharedValue(0); // Initialize opacity value

  // Define an animation function
  const startAnimation = () => {
    welcomeOpacity.value = withSpring(1, { damping: 2, stiffness: 80 });
  };

  useEffect(() => {
    startAnimation();
  }, []); 

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Animated.Text
        style={[
          styles.welcomeText,
          useAnimatedStyle(() => {
            return {
              opacity: welcomeOpacity.value,
              transform: [{ translateY: interpolate(welcomeOpacity.value, [0, 1], [-20, 0]) }],
            };
          }),
        ]}
      >
        Welcome to My App!
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50
  },
});

export default HomeScreen;