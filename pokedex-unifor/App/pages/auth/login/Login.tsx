import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import Pattern from "../../../assets/pikachu_pattern.png";
import { AuthCard } from "../../../components/Card/AuthCard/AuthCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthInput } from "../../../components/Input/AuthInput/AuthInput";
import React from "react";
import { Icon } from "../../../components/Icon/Icon";
import { FullButton } from "../../../components/Input/FullButton/FullButton";
import { loginService } from "../../../api/service/auth.service";
import { LoginSchema } from "../../../schemas/login.schema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { BlankButton } from "../../../components/Input/BlankButton/BlankButton";

export const Login = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const navigation = useNavigation<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLogin = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const parsed = LoginSchema.safeParse({ email, password });

      if (!parsed.success) {
        setErrorMessage(parsed.error.issues[0].message);
        return;
      }

      const response = await loginService({ email, password });
      setErrorMessage("");
      AsyncStorage.setItem("userData", JSON.stringify(response));
      navigation.navigate("Home");
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorMessage(e.response?.data.message);
      } else {
        console.error("Erro ao realizar login:", e);
      }
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={Pattern}
      style={styles.background}
      resizeMode="repeat"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AuthCard>
              <View style={styles.mainContainer}>
                <View style={styles.title}>
                  <Icon />
                  <Text
                    style={{
                      fontSize: 32,
                      fontWeight: "bold",
                      color: "#111827",
                    }}
                  >
                    Pokedex Unifor
                  </Text>
                  <Text style={{ color: "#4b5563" }}>
                    Acesse sua conta para continuar
                  </Text>
                </View>
              </View>
              <View style={styles.inputsContainer}>
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 32,
                  }}
                >
                  <AuthInput
                    setText={setEmail}
                    text={email}
                    placeholder="Email"
                  />
                  <AuthInput
                    setText={setPassword}
                    text={password}
                    placeholder="Password"
                    isPassword
                  />
                </View>

                {errorMessage && (
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                )}

                <FullButton
                  title="Entrar"
                  backgroundColor="#00a63e"
                  onPress={handleLogin}
                  width={95}
                  loading={loading}
                />

                <View style={styles.footer}>
                  <Text>Você ainda não tem uma conta?</Text>
                  <BlankButton
                    onPress={() => navigation.navigate("Register")}
                    color="#00a63e"
                    title="Criar uma conta"
                    width={60}
                  />
                </View>
              </View>
            </AuthCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  title: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 48,
  },

  background: {
    flex: 1,
    alignItems: "center",
  },

  inputsContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },

  errorMessage: {
    color: "#ff2c2c",
    textAlign: "center",
  },

  footer: {
    paddingTop: 24,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 8,
  },
});
