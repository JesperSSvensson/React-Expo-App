
import "react-native-gesture-handler";
import {StyleSheet} from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import MyNavigator from "./Navigator/MyNavigator";

export default function App() {
  return (
    <NavigationContainer>
        <MyNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
