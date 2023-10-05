import React from "react";
import { View, Modal, Button, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SavedPhoto } from "../Screens/Storage";

interface Props {
  visible: boolean;
  closeModal: () => void;
  selectedPhoto: SavedPhoto | null;
}

const PhotoLocationView = ({ visible, closeModal, selectedPhoto }: Props) => {
  return (
    <Modal
      visible={visible}
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
              latitudeDelta: 0.07,
              longitudeDelta: 0.07,
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
  );
};

const styles = StyleSheet.create({
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
});

export default PhotoLocationView;