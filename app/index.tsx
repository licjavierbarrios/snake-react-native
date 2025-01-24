// app/index.tsx
import "react-native-gesture-handler";
import {
  SafeAreaView,
  StyleSheet,
  View,
  LayoutChangeEvent,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Colors } from "@/components/styles/colors";
import { Direction, GestureEventType } from "@/types/types";
import Food from "@/components/Food";
import Header from "@/components/Header";
import Score from "@/components/Score";
import Snake from "@/components/Snake";
import { useGameStore } from "@/store/store";

const CELL_SIZE = 20; // Tamaño de cada celda

export default function Game(): JSX.Element {
  const {
    snake,
    food,
    score,
    isPaused,
    setDirection,
    reloadGame,
    pauseGame,
    setGameBounds,
    startGameLoop,
    stopGameLoop,
  } = useGameStore();

  // Para no recalcular layout múltiples veces
  const [layoutMeasured, setLayoutMeasured] = useState(false);

  // Limpia el intervalo al desmontar
  useEffect(() => {
    return () => {
      stopGameLoop();
    };
  }, []);

  // Maneja la detección de deslizamiento (arrastre)
  const handleGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      setDirection(translationX > 0 ? Direction.Right : Direction.Left);
    } else {
      setDirection(translationY > 0 ? Direction.Down : Direction.Up);
    }
  };

 
  const onBoundariesLayout = (e: LayoutChangeEvent) => {
    if (!layoutMeasured) {
      const { width, height } = e.nativeEvent.layout;
      // Calcula cuántas celdas caben
      const xMax = Math.floor(width / CELL_SIZE) - 1;
      const yMax = Math.floor(height / CELL_SIZE) - 1;

      setGameBounds({ xMin: 0, xMax, yMin: 0, yMax });
      startGameLoop(); 
      setLayoutMeasured(true);
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          reloadGame={reloadGame}
          pauseGame={pauseGame}
          isPaused={isPaused}
        >
          <Score score={score} />
        </Header>

        {/* Esta es tu zona de juego, la medimos con onLayout */}
        <View style={styles.boundaries} onLayout={onBoundariesLayout}>
          {/* Render de la serpiente y la comida */}
          <Snake snake={snake} cellSize={CELL_SIZE} />
          <Food x={food.x} y={food.y} cellSize={CELL_SIZE} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 1,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderColor: "#00ff00", // borde verde retro
    backgroundColor: "#000000",
    overflow: "hidden", // ¡Clave para “cortar” lo que salga!
  },
});
