// components/Food.tsx
import { StyleSheet, Image } from "react-native";
import { Coordinate } from "@/types/types";

interface FoodProps extends Coordinate {
  cellSize: number;
}

export default function Food({ x, y, cellSize }: FoodProps): JSX.Element {
  return (
    <Image
      // Mueve la imagen según la posición en la cuadrícula
      style={[
        {
          top: y * cellSize,
          left: x * cellSize,
          width: cellSize, 
          height: cellSize,
        },
        styles.food,
      ]}
      source={require("@/assets/images/apple.png")} 
      resizeMode="contain" 
    />
  );
}

const styles = StyleSheet.create({
  food: {
    position: "absolute",
    transform: [{ scale: 1 }],
    backgroundColor: 'transparent', 
  },
});
