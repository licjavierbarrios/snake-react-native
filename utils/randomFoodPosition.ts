// utils/randomFoodPosition.ts
import { Coordinate } from "../types/types";

export const randomFoodPosition = (
  maxX: number,
  maxY: number,
  snake: Coordinate[]
): Coordinate => {
  let newFoodPosition: Coordinate;
  do {
    newFoodPosition = {
      x: Math.floor(Math.random() * (maxX - 1)) + 1,
      y: Math.floor(Math.random() * (maxY - 1)) + 1,
    };
  } while (
    snake.some(
      (segment) =>
        segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
    )
  );
  return newFoodPosition;
};
