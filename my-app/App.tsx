import "react-native-gesture-handler";
import { StatusBar, StyleSheet } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import MyNavigator from "./Navigator/MyNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <MyNavigator />
    </NavigationContainer>
  );
}
