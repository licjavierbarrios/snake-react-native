// components/Score.tsx

import { Text, StyleSheet } from "react-native";

interface ScoreProps {
  score: number;
}

export default function Score({ score }: ScoreProps): JSX.Element {
  return <Text style={styles.text}>SCORE: {score}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "PressStart2P_400Regular",
    fontSize: 12,
    color: "#00ff00",
    padding: 4,
  },
});
