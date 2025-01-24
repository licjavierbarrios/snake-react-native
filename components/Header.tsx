import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import * as Updates from "expo-updates";
import { FontAwesome } from "@expo/vector-icons";

// Puedes ajustar tus colores en un archivo aparte si lo prefieres
const RETRO_GREEN = "#00ff00";

interface HeaderProps {
  reloadGame: () => void;
  pauseGame: () => void;
  children: JSX.Element; // Aquí pasas <Score />
  isPaused: boolean;
}

export default function Header({
  children,
  reloadGame,
  pauseGame,
  isPaused,
}: HeaderProps): JSX.Element {
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  // Si no quieres usar Updates, puedes eliminar todo lo referente a "showDownloadButton" y "runTypeMessage".
  // O simplemente ocultar en producción.
  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? "Embedded build"
    : "Running an update";

  return (
    <View style={styles.container}>
      {/* Bloque de botones izquierda */}
      <View style={styles.leftButtons}>
        <TouchableOpacity onPress={reloadGame} style={styles.iconButton}>
          <FontAwesome name="refresh" size={24} color={RETRO_GREEN} />
        </TouchableOpacity>

        {/* Botón de pausa o play */}
        <TouchableOpacity onPress={pauseGame} style={styles.iconButton}>
          <FontAwesome
            name={isPaused ? "play-circle" : "pause-circle"}
            size={24}
            color={RETRO_GREEN}
          />
        </TouchableOpacity>
      </View>

      {/* Título en el centro */}
      <Text style={styles.titleText}>SNAKE RETRO</Text>

      {/* Score a la derecha */}
      <View style={styles.rightSection}>{children}</View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // Ajusta altura para que no quede tan comprimido
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000000", // Fondo negro
    borderBottomWidth: 4,
    borderColor: RETRO_GREEN, // Borde verde
    paddingHorizontal: 15,
    // Agrega paddingVertical si quieres más altura:
    // paddingVertical: 5,
    position: "relative",
  },
  leftButtons: {
    flexDirection: "row",
    alignItems: "center",
    // Para que queden cerca uno del otro sin apretarse
  },
  iconButton: {
    marginRight: 10, // Espacio entre iconos
  },
  titleText: {
    fontFamily: "PressStart2P_400Regular", // Asegúrate de tener la fuente cargada
    color: RETRO_GREEN,
    fontSize: 14,
    letterSpacing: 2,
  },
  rightSection: {
    // Para la puntuación
    flexDirection: "row",
    alignItems: "center",
    // Puedes ajustar spacing si quieres
    // marginRight: 10,
  },
  runTypeText: {
    position: "absolute",
    bottom: 2,
    right: 8,
    fontFamily: "PressStart2P_400Regular",
    fontSize: 8,
    color: "gray",
  },
});
