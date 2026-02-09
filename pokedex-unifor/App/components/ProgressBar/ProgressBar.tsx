import { View, StyleSheet } from "react-native";

type ProgressBarProps = {
  value: number;
  color: string;
  strokeWidth?: number;
};

export const ProgressBar = ({
  value,
  color,
  strokeWidth,
}: ProgressBarProps) => {
  return (
    <View style={styles.progressBarContainer}>
      <View
        style={[
          {
            backgroundColor: color,
            width: `${value}%`,
            height: strokeWidth,
          },
          styles.progressBar,
        ]}
      />
      <View style={[{ height: strokeWidth }, styles.progressBarBlank]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    position: "relative",
    width: "100%",
    height: 16,
    borderRadius: 1000,
  },

  progressBar: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
    borderRadius: 1000,
  },

  progressBarBlank: {
    position: "absolute",
    backgroundColor: "#e5e7eb",
    width: "100%",
    height: "100%",
    borderRadius: 1000,
  },
});
