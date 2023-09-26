import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { LocationObject } from "expo-location";
import Maps from './Maps'; 


interface SavedPhoto {
  uri: string;
  timestamp: number;
  location: LocationObject | null; 
}

const SavedPhotosScreen = () => {
  const [savedPhotos, setSavedPhotos] = useState<SavedPhoto[]>([]);

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


  

  return (
    <ScrollView style={styles.container}>
      <Button onPress={deleteAll} title="Ta bort alla bilder"></Button>
      {savedPhotos.map((photo, index) => (
        <View key={index} style={styles.photoContainer}>
          <Image source={{ uri: photo.uri }} style={styles.photo} />
          <Text>{photo.location ? `Latitude: ${photo.location.coords.latitude}, Longitude: ${photo.location.coords.longitude}` : "Location not available"}</Text>
          
          <Button
            title="Delete"
            color="red"
            onPress={() => deletePhoto(photo)}
          />
        </View>
      ))}
    </ScrollView>
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
    height: 200,
    resizeMode: "cover",
    marginBottom: 8,
  },
});

export default SavedPhotosScreen;
