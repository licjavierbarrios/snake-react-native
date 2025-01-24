// components/Snake.tsx
import { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { Coordinate } from "@/types/types";

interface SnakeProps {
  snake: Coordinate[];
  cellSize: number;
}

export default function Snake({ snake, cellSize }: SnakeProps) {
  return (
    <Fragment>
      {snake.map((segment: Coordinate, index: number) => {
        const segmentStyle = {
          width: cellSize,
          height: cellSize,
          top: segment.y * cellSize,
          left: segment.x * cellSize,
        };
        return <View key={index} style={[styles.snake, segmentStyle]} />;
      })}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  snake: {
    position: "absolute",
    backgroundColor: "#00ff00", // verde “retro”
    // Sin borderRadius
    // Añade un borde si quieres un contorno 8-bit:
    borderWidth: 1,
    borderColor: "#000000",
  },
});
