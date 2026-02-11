import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Visibility from "../../../assets/visibility.svg";
import VisibilityOff from "../../../assets/visibility_off.svg";
import React from "react";

type AuthInputProps = {
  text: string;
  setText: (text: string) => void;
  isPassword?: boolean;
  placeholder: string;
};

export const AuthInput = ({
  text,
  setText,
  isPassword,
  placeholder,
}: AuthInputProps) => {
  const [visible, setVisible] = React.useState<boolean>(false);

  if (isPassword) {
    return (
      <View style={styles.input}>
        <TextInput
          style={{ width: "90%", color: "#000" }}
          secureTextEntry={!visible}
          onChangeText={(text: string) => setText(text)}
          placeholder={placeholder}
          placeholderTextColor={"#9a9a9a"}
          value={text}
          maxLength={32}
        />
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          {visible ? <VisibilityOff /> : <Visibility />}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { color: "#000" }]}
        placeholder={placeholder}
        value={text}
        onChangeText={(text: string) => setText(text)}
        placeholderTextColor={"#9a9a9a"}
        maxLength={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  input: {
    paddingHorizontal: 8,
    borderWidth: 1,
    width: "95%",
    borderColor: "#ccc",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
