// app/_layout.tsx
import { useEffect } from "react";
import { Slot, SplashScreen } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";
import { View, StyleSheet } from "react-native";

SplashScreen.preventAutoHideAsync(); // Prevenir que la pantalla de splash se oculte automáticamente

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Ocultar la pantalla de carga una vez que las fuentes están listas
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Mientras las fuentes no están cargadas, no renderizar nada
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Slot />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Ajusta este color según tu diseño
  },
});
