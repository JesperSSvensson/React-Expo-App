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
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { LocationObject } from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigator/MyNavigator";
import Swiper from "react-native-swiper";

export type Props = NativeStackScreenProps<RootStackParamList, "Storage">;

interface SavedPhoto {
  uri: string;
  timestamp: number;
  location: LocationObject | null;
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

  const deleteAll = async () => {
    try {
      await AsyncStorage.clear();
      setSavedPhotos([]);
      console.log("Alla media deleted");
    } catch (e) {
      console.error("Error in deleteAll:", e);
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button onPress={deleteAll} title="Ta bort alla bilder" />
        <Swiper loop={false}>
          {savedPhotos.map((photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={{ uri: photo.uri }} style={styles.photo} />
              <TouchableOpacity onPress={() => openModal(photo)}>
                <Text>Show Location</Text>
              </TouchableOpacity>
              <Button
                title="Delete"
                color="red"
                onPress={() => deletePhoto(photo)}
              />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  photoContainer: {
    marginBottom: 16,
  },
  photo: {
    width: "100%",
    height: 500,
    resizeMode: "cover",
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "50%",
  },
});

export default SavedPhotosScreen;
