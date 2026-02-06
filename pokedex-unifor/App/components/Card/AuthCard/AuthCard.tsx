import React from "react";
import { StyleSheet, Text, View } from "react-native";

type AuthCardProps = {
  children: React.ReactNode;
};

export const AuthCard = ({ children }: AuthCardProps) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    height: 600,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25);",
    borderRadius: 24,
    padding: 16,
  },
});
