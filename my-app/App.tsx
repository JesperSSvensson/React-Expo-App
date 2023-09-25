import { StatusBar } from "expo-status-bar";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyNavigator from "./Navigator/MyNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MyNavigator></MyNavigator>
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
