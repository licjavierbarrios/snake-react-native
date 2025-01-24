// store/store.ts
import { create } from "zustand";
import { Direction, Coordinate } from "@/types/types";
import { checkEatsFood } from "@/utils/checkEatsFood";
import { checkGameOver } from "@/utils/checkGameOver";
import { randomFoodPosition } from "@/utils/randomFoodPosition";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const MOVE_INTERVAL = 50; // Intervalo de movimiento en milisegundos
const SCORE_INCREMENT = 10;

interface GameState {
  snake: Coordinate[];
  food: Coordinate;
  score: number;
  isGameOver: boolean;
  isPaused: boolean;
  direction: Direction;
  gameBounds: { xMin: number; xMax: number; yMin: number; yMax: number };
  moveInterval: number;
  intervalId: NodeJS.Timeout | null; // Almacenamos el ID del intervalo
  setDirection: (direction: Direction) => void;
  moveSnake: () => void;
  reloadGame: () => void;
  pauseGame: () => void;
  setGameBounds: (bounds: {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
  }) => void;
  startGameLoop: () => void; // Función para iniciar el intervalo
  stopGameLoop: () => void; // Función para detener el intervalo
}

export const useGameStore = create<GameState>((set, get) => ({
  snake: SNAKE_INITIAL_POSITION,
  food: FOOD_INITIAL_POSITION,
  score: 0,
  isGameOver: false,
  isPaused: false,
  direction: Direction.Right,
  gameBounds: { xMin: 0, xMax: 35, yMin: 0, yMax: 63 },
  moveInterval: MOVE_INTERVAL,
  intervalId: null, // Inicialmente no hay intervalo

  setDirection: (direction) => set({ direction }),

  moveSnake: () => {
    const { snake, direction, food, gameBounds, isPaused, isGameOver } = get();
    if (isPaused || isGameOver) return;

    const snakeHead = snake[0];
    const newHead = { ...snakeHead };

    if (checkGameOver(newHead, gameBounds)) {
      set({ isGameOver: true });
      get().stopGameLoop(); // Detener el intervalo cuando el juego termina
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    if (checkEatsFood(newHead, food, 2)) {
      set({
        food: randomFoodPosition(gameBounds.xMax, gameBounds.yMax, snake),
        snake: [newHead, ...snake],
        score: get().score + SCORE_INCREMENT,
      });
    } else {
      set({ snake: [newHead, ...snake.slice(0, -1)] });
    }
  },

  reloadGame: () => {
    set({
      snake: SNAKE_INITIAL_POSITION,
      food: FOOD_INITIAL_POSITION,
      score: 0,
      isGameOver: false,
      direction: Direction.Right,
      isPaused: false,
    });
    get().startGameLoop(); // Reiniciar el intervalo al recargar el juego
  },

  pauseGame: () => {
    // 1) Toggle isPaused
    set((state) => ({ isPaused: !state.isPaused }));

    // 2) Lee el nuevo valor
    const newIsPaused = get().isPaused;

    // 3) Si ahora está en pausa => parar el loop
    //    Si NO está en pausa => reanudar el loop
    if (newIsPaused) {
      get().stopGameLoop();
    } else {
      get().startGameLoop();
    }
  },

  setGameBounds: (bounds) => set({ gameBounds: bounds }),

  startGameLoop: () => {
    const { intervalId, moveInterval, isGameOver, isPaused } = get();
    if (!isGameOver && !isPaused && !intervalId) {
      const id = setInterval(() => get().moveSnake(), moveInterval);
      set({ intervalId: id }); // Guardar el ID del intervalo
    }
  },

  stopGameLoop: () => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId); // Limpiar el intervalo
      set({ intervalId: null });
    }
  },
}));
