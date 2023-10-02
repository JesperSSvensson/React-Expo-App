import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screens/Home";
import Login from "../Screens/Login";
import CameraScreen from "../Screens/Camera";
import SavedPhotosScreen from "../Screens/Storage";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons'; 
import Videos from "../Screens/Video";
import { View } from "react-native";
import { Image } from "react-native";

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
     <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black', 
          },
          drawerStyle: {
            backgroundColor:'black',
          },
          headerTintColor: 'orange',
          drawerActiveTintColor:'orange',
          drawerInactiveTintColor:'white',
          headerTitleStyle: {
            fontWeight: "800",
          },
        }}
    
      >
        <Drawer.Screen
          options={{
            drawerItemStyle: { display: "none" },
            swipeEnabled: false,
            headerShown: false,
          }}
          
          name="Login"
          component={Login}
          />
        <Drawer.Screen  name="Home" component={HomeScreen}  options={{
         
          drawerIcon: () => (
              <MaterialIcons name="home" size={24} color={"orange"} />
              ), 
            }}
            />
        <Drawer.Screen name="Camera" component={CameraScreen}options={{
          drawerIcon: () => (
            <MaterialIcons name="camera-alt" size={24} color={"orange"} />
            ),
          }}
          />
        <Drawer.Screen name="Storage" component={SavedPhotosScreen} options={{
          drawerIcon: () => (
            <MaterialIcons name="storage" size={24} color={"orange"} />
            ),
          }}
          />
           <Drawer.Screen name="Videos" component={Videos} options={{
            drawerIcon: () => (
              <MaterialIcons name="video-library" size={24} color={"orange"} />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default MyNavigator;