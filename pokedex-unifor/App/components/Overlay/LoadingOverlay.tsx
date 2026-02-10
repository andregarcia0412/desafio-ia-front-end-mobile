import { ActivityIndicator, StyleSheet, View } from "react-native";

export const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={"#fff"} size={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
