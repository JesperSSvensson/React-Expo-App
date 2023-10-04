import "react-native-gesture-handler";
import * as React from "react";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";

import MyNavigator from "./Navigator/MyNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <MyNavigator />
    </NavigationContainer>
  );
}
