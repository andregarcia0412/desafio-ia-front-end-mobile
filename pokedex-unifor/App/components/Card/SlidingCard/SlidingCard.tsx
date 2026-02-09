import React from "react";
import { Animated, StyleSheet, TouchableOpacity, Text } from "react-native";
import XClose from "../../../assets/x-close.svg";

type SlidingCardProps = {
  children: React.ReactNode;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const SlidingCard = ({
  children,
  visible,
  setVisible,
}: SlidingCardProps) => {
  const translateY = React.useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    Animated.spring(translateY, {
      toValue: visible ? -0 : 600,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setVisible(false)}
      >
        <XClose />
      </TouchableOpacity>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 600,
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    top: 24,
    right: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
