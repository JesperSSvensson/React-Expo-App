import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { BlurView } from "expo-blur";
import { RootStackParamList } from "../Navigator/MyNavigator";
import { RouteProp } from "@react-navigation/native";

interface Props {
  navigation: any;
  route: RouteProp<RootStackParamList, "Login">;
}

export default function Login({ navigation }: Props) {
  const getAccesWithPinCode = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Logga in med din personliga kod",
    });

    if (result.success) {
      alert("Authentication successful!");
      navigation.navigate("Home");
    } else {
      alert("Authentication failed or canceled.");
    }
  };

  const uri =
    "https://images.pexels.com/photos/7125282/pexels-photo-7125282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.backgroundImage} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.blurContainer}>
          <BlurView intensity={10} style={styles.blurView} tint="default">
            <Text style={styles.textContainer}>Välkommen</Text>
            <Button
              color="white"
              title="Logga in"
              onPress={getAccesWithPinCode}
            />
          </BlurView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  blurContainer: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
  },
  scrollViewContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blurView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
