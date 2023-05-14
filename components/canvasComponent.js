import { StyleSheet, Platform } from 'react-native';
import Canvas from 'react-native-canvas';
import WebCanvas from './webCanvas'

export default function CanvasComponent() {

  if (Platform.OS === "web") {
    return <WebCanvas></WebCanvas>
  }

  return (
      <Canvas style={{ width, height }} ref={handleCanvas} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});