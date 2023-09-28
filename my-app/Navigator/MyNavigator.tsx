import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screens/Home";
import Login from "../Screens/Login";
import CameraScreen from "../Screens/Camera";
import SavedPhotosScreen from "../Screens/Storage";
import Videos from "../Screens/Video";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons'; 

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Camera: undefined;
  Storage: undefined;
  Videos: undefined;
};

const Drawer = createDrawerNavigator<RootStackParamList>();

const MyNavigator = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Drawer.Navigator>
        <Drawer.Screen
          options={{
            drawerItemStyle: { display: "none" },
            swipeEnabled: false,
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Drawer.Screen name="Home" component={HomeScreen}  options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="home" size={24} color={"black"} />
            ),
          }}
        />
        <Drawer.Screen name="Camera" component={CameraScreen}options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="camera-alt" size={24} color={"black"} />
            ),
          }}
        />
        <Drawer.Screen name="Storage" component={SavedPhotosScreen} options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="storage" size={24} color={"black"} />
            ),
          }}
        />
        <Drawer.Screen name="Videos" component={Videos} options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="video-library" size={24} color={"black"} />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default MyNavigator;