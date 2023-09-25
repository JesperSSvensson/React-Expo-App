import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screens/Home";


export type RootStackParamList = {
    Home: undefined;
}

const Drawer = createDrawerNavigator<RootStackParamList>();

const MyNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};
export default MyNavigator;
