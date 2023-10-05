import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

const LottieAnimation = () => {
  useEffect(() => {
    const playAnimation = () => {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    };

    playAnimation();
  }, []);
  const lottieRef = React.useRef<LottieView | null>(null);

  return (
    <LottieView
      ref={lottieRef}
      source={require("../assets/Animation - 1696448678389.json")}
      autoPlay={true}
      style={styles.animation}
    />
  );
};

const styles = StyleSheet.create({
  animation: {
    position: "absolute",
    width: "25%",
    height: "20%",
    top: "20%",
    left: "19%",
  },
});

export default LottieAnimation;
