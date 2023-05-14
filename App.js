import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CanvasComponent from './components/canvasComponent';
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color:'#ff0000'}}>Wizduds Fantastic Tee's</Text>
      <CanvasComponent></CanvasComponent>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
