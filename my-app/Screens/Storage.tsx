import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  Modal,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { LocationObject } from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigator/MyNavigator";
import Swiper from "react-native-swiper";

const backgroundImageUri =
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80";

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
      const photoKeys: any = keys.filter((key) => key.startsWith("Pic-Saved-"));
      const loadedPhotos = await AsyncStorage.multiGet(photoKeys);

      const parsedPhotos: SavedPhoto[] = loadedPhotos
        .map(([_, value]) => value)
        .filter((value) => value !== null)
        .map((value) => JSON.parse(value!) as SavedPhoto);

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
      source={{ uri: backgroundImageUri }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Swiper loop={false} activeDotColor="white" dotColor="orange">
            {savedPhotos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.textdate}>
                    {new Date(photo.timestamp).toLocaleString()}
                  </Text>
                  <Text style={styles.textcaption}>{photo.caption}</Text>
                </View>
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
          <Modal
            visible={modalVisible}
            transparent={false}
            animationType="fade"
            onRequestClose={closeModal}
            presentationStyle="overFullScreen"
          >
            <View style={styles.modalContainer}>
              {selectedPhoto && (
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: selectedPhoto.location
                      ? selectedPhoto.location.coords.latitude
                      : 0,
                    longitude: selectedPhoto.location
                      ? selectedPhoto.location.coords.longitude
                      : 0,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: selectedPhoto.location
                        ? selectedPhoto.location.coords.latitude
                        : 0,
                      longitude: selectedPhoto.location
                        ? selectedPhoto.location.coords.longitude
                        : 0,
                    }}
                    title={
                      selectedPhoto.location
                        ? `Latitude: ${selectedPhoto.location.coords.latitude}, Longitude: ${selectedPhoto.location.coords.longitude}`
                        : "Location not available"
                    }
                  />
                </MapView>
              )}
              <Button title="Close" onPress={closeModal} />
            </View>
          </Modal>
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
    resizeMode: "stretch",
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
  textContainer: {
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
