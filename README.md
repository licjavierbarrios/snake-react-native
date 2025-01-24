# Snake Retro (React Native + Expo)

Este es un pequeño juego de Snake con estilo retro hecho con [React Native](https://reactnative.dev/) y [Expo](https://expo.dev/).  
Incluye:
- Estilo de interfaz de los 80 (colores verde/negro tipo arcade).
- Control por deslizamiento (PanGestureHandler) para mover la serpiente.
- Uso de la librería [Zustand](https://github.com/pmndrs/zustand) para estado global.
- Fuentes retro (Press Start 2P) cargadas con `expo-font` y `@expo-google-fonts/press-start-2p`.

## Requisitos

- **Node.js** 16 o superior (o la versión compatible con tu Expo).
- **Expo CLI local** (usa `npx expo` en lugar de la CLI global de expo).
- [Git](https://git-scm.com/) (para clonar el repositorio).

> Si deseas usar otro gestor de paquetes como `yarn` o `bun`, puedes hacerlo, pero asegúrate de instalar las dependencias de manera compatible con Expo.

## Instalación

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/tu-repo-snake.git
   cd tu-repo-snake
   ```

2. **Instala las dependencias**:

   Con npm:

   ```bash
   npm install
   ```

   O con yarn:

   ```bash
   yarn
   ```

   O con bun (si lo usas):

   ```bash
   bun install
   ```

3. **Inicia la app**:

   ```bash
   npx expo start
   ```

   Luego elige “run on Android” o “run on iOS” en la interfaz web de Expo, o bien escanea el código QR con la app Expo Go (si estás en un dispositivo físico).

## Estructura de Directorios

```plaintext
.
├── app
│   ├── _layout.tsx      // Carga de fuentes y envoltura global
│   └── index.tsx        // Componente principal del juego
├── components
│   ├── Header.tsx       // Barra superior retro
│   ├── Score.tsx        // Texto de puntaje
│   ├── Snake.tsx        // Renderiza la serpiente
│   ├── Food.tsx         // Renderiza la manzana
│   └── styles
│       └── colors.ts    // Paleta de colores
├── store
│   └── store.ts         // Estado global (Zustand) con lógica de juego
├── utils                // Utilidades como checkGameOver, randomFoodPosition, etc.
├── assets               // Imágenes, fuentes, etc.
├── package.json
└── README.md
```

## Cómo Jugar

1. **Iniciar el juego**: Al abrir la app, verás la serpiente en el área de juego.
2. **Mover la serpiente**: Desliza (swipe) con el dedo en la pantalla en la dirección que deseas mover la serpiente (arriba, abajo, izquierda o derecha).
3. **Pausa**: Toca el ícono de pausa/play en la esquina superior izquierda.
4. **Reiniciar**: Toca el ícono de refresh para reiniciar la partida.
5. **Objetivo**: Comer las manzanas para aumentar el puntaje. Evita chocar contra los bordes o tu propio cuerpo.

## Notas

- El juego ajusta el área de juego según el tamaño disponible en pantalla, usando `onLayout` para medir el contenedor.
- Si la serpiente o la manzana se salen de los límites, se recortan con `overflow: hidden`.
- Se incluye un borde verde retro y un header con estilo arcade.

## Créditos

- Iconos de retro design: FontAwesome.
- Fuente Press Start 2P de Google Fonts.

## Licencia

MIT License




¡Disfruta tu partida retro de Snake!