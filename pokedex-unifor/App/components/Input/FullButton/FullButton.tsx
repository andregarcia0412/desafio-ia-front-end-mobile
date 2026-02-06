import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

type FullButtonProps = {
  title: string;
  backgroundColor: string;
  width: number;
  onPress: () => void;
  loading: boolean;
};

export const FullButton = ({
  title,
  backgroundColor,
  width,
  onPress,
  loading,
}: FullButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: backgroundColor, width: `${width}%` },
      ]}
    >
      {!loading ? (
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{title}</Text>
      ) : (
        <ActivityIndicator color={"#fff"} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
});
