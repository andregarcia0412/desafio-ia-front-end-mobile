import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "./App/routes/Routes";

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <StatusBar />
        <Routes />
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
