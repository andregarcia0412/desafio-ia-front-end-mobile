import { StyleSheet, Text, TouchableOpacity } from "react-native";

export type BlankButtonProps = {
  title: string;
  width: number;
  color: string;
  onPress: () => void;
};

export const BlankButton = ({
  title,
  width,
  color,
  onPress,
}: BlankButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { borderColor: color, width: `${width}%` }]}
    >
      <Text style={{ color, fontWeight: "bold" }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
