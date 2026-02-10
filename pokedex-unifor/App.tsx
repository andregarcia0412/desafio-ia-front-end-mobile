import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "./App/routes/Routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <StatusBar />
          <Routes />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
