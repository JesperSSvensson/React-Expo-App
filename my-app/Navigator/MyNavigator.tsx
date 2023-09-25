import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screens/Home";
import Login from "../Screens/Login";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
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
    </Drawer.Navigator>
  );
};
export default MyNavigator;
