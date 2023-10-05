import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { LocationObject } from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigator/MyNavigator";
import Swiper from "react-native-swiper";
import { BlurView } from "expo-blur";
import { BackgroundImageUri } from "../Utils/BackgroundImage";
import PhotoLocationView from "../Components/PhotoLocationView";

export type Props = NativeStackScreenProps<RootStackParamList, "Storage">;

export interface SavedPhoto {
  uri: string;
  timestamp: number;
  location: LocationObject | null;
  caption: string;
}

const SavedPhotosScreen = () => {
  const [savedPhotos, setSavedPhotos] = useState<SavedPhoto[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<SavedPhoto | null>(null);

  useFocusEffect(() => {
    loadSavedPhotos();
  });

  const loadSavedPhotos = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const photoKeys = keys.filter((key) => key.startsWith("Pic-Saved-"));
      const loadedPhotos = await AsyncStorage.multiGet(photoKeys);

      const parsedPhotos: SavedPhoto[] = [];

      loadedPhotos.forEach(([_, value]) => {
        if (value !== null) {
          const parsedValue = JSON.parse(value) as SavedPhoto;
          parsedPhotos.push(parsedValue);
        }
      });
      parsedPhotos.sort((a, b) => b.timestamp - a.timestamp);
      setSavedPhotos(parsedPhotos);
    } catch (error) {
      console.error("Error loading saved photos:", error);
    }
  };

  const deletePhoto = async (photoToDelete: SavedPhoto) => {
    try {
      const keyToDelete = `Pic-Saved-${photoToDelete.timestamp}`;
      await AsyncStorage.removeItem(keyToDelete);
      setSavedPhotos((prevPhotos) =>
        prevPhotos.filter(
          (photo) => photo.timestamp !== photoToDelete.timestamp
        )
      );
      console.log("Photo deleted successfully! ");
    } catch (error) {
      console.error("Error deleting photo:", error);
      Alert.alert("Failed to delete photo.");
    }
  };

  const openModal = (photo: SavedPhoto) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={{ uri: BackgroundImageUri }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Swiper loop={false} activeDotColor="white" dotColor="orange">
            {savedPhotos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <BlurView intensity={5} style={styles.textBlurContainer}>
                  <Text style={styles.textdate}>
                    {new Date(photo.timestamp).toLocaleString()}
                  </Text>
                  <Text style={styles.textcaption}>{photo.caption}</Text>
                </BlurView>
                <Image source={{ uri: photo.uri }} style={styles.photo} />
                <View style={styles.iconContainerWrapper}>
                  <View>
                    <TouchableOpacity onPress={() => openModal(photo)}>
                      <MaterialCommunityIcons
                        name="google-maps"
                        size={40}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => deletePhoto(photo)}>
                      <MaterialIcons
                        name="delete-forever"
                        size={40}
                        color="red"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </Swiper>
          <PhotoLocationView
            visible={modalVisible}
            closeModal={closeModal}
            selectedPhoto={selectedPhoto}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  photoContainer: {
    flex: 1,
  },
  photo: {
    flex: 1,
    resizeMode: "cover",
    marginBottom: 8,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  map: {
    width: "100%",
    height: "80%",
  },
  iconContainerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  textBlurContainer: {
    flexDirection: "column-reverse",
    justifyContent: "center",
  },
  textdate: {
    color: "white",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 15,
  },
  textcaption: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
  },
});

export default SavedPhotosScreen;
