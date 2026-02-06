import { StyleSheet, View } from "react-native";
import IconSvg from "../../assets/pokeball.svg";

export const Icon = () => {
  return (
    <View style={styles.icon}>
      <IconSvg height={32} width={32}/>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: "50%",
    height: 24,
    width: 24,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.35)",
  },
});
