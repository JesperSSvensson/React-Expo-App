import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screens/Home";
import Login from "../Screens/Login";
import CameraScreen from "../Screens/Camera";
import SavedPhotosScreen from "../Screens/Storage";
import Maps from "../Screens/Maps";
import Videos from "../Screens/Video";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Camera: undefined;
  Storage: undefined;
  Maps: undefined;
  Videos: undefined;
};

const Drawer = createDrawerNavigator<RootStackParamList>();

const MyNavigator = () => {
  return (
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
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Camera" component={CameraScreen}></Drawer.Screen>
      <Drawer.Screen name="Storage" component={SavedPhotosScreen}></Drawer.Screen>
      <Drawer.Screen name="Maps" component={Maps}></Drawer.Screen>
      <Drawer.Screen name="Videos" component={Videos}></Drawer.Screen>
    </Drawer.Navigator>
  );
};
export default MyNavigator;
