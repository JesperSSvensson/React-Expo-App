import { StyleSheet, Button, View } from "react-native";
import { Video } from "expo-av";
import React, { useRef, useState } from "react";

export default function Videos() {
  const video = useRef<Video | null>(null);
  const secondVideo = useRef<Video | null>(null);
  const [status, setStatus] = useState<any>({});
  const [statusSecondVideo, setStatusSecondVideo] = useState<any>({});

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />
      <View style={styles.buttons}>
        <Button
          title="Start video"
          onPress={() => video.current?.playFromPositionAsync(0)}
        />
        <Button
          title={status.isLooping ? "Set to not loop" : "Set to loop"}
          onPress={() => video.current?.setIsLoopingAsync(!status.isLooping)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  buttons: {
    margin: 16,
  },
});
