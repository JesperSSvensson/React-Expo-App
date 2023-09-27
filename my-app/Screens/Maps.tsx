import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';

// const Maps = () => {
//     const [mapRegion] = useState({
//       latitude:  57.89281098643154,
//       longitude: 14.072111444560878,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     });
//     return (
//       <View style={styles.container}>
//         <MapView
//           style={{ alignSelf: 'stretch', height: '100%' }}
//           region={mapRegion}
//         >
//           <Marker coordinate={mapRegion} title='Häststigen 19' />
//         </MapView>
//       </View>
//     );
//   };
//   export default Maps;
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//   });