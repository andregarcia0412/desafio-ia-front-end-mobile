import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { getMe } from "../../api/service/auth.service";
import { uploadPicture } from "../../api/service/classification.service";
import Back from "../../assets/back.svg";
import FlashOff from "../../assets/flash_off.svg";
import FlashOn from "../../assets/flash_on.svg";
import FlipCamera from "../../assets/flip-camera.svg";
import Pattern from "../../assets/pikachu_pattern.png";
import { SlidingCard } from "../../components/Card/SlidingCard/SlidingCard";
import { FullButton } from "../../components/Input/FullButton/FullButton";
import { LoadingOverlay } from "../../components/Overlay/LoadingOverlay";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { AnimalLabels } from "../../data/AnimalLabels";
import { ClassificationDto } from "../../data/dto/classification.dto";

export const Home = () => {
  const navigation = useNavigation<any>();
  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [photo, setPhoto] = useState<string | null>(null);
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const [visibleCard, setVisibleCard] = useState<boolean>(false);
  const [animalInfo, setAnimalInfo] = useState<ClassificationDto | null>(null);
  const [zoom, setZoom] = useState<number>(0);
  const [flash, setFlash] = useState<"off" | "on">("off");
  const baseZoom = useRef<number>(0);
  const [hasIdentified, setHasIdentified] = useState<boolean>(false);

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <ImageBackground
        style={styles.permissionContainer}
        source={Pattern}
        resizeMode="repeat"
      >
        <Text>Esse aplicativo precisa da câmera para funcionar</Text>
        <FullButton
          onPress={requestPermission}
          title="Permitir"
          backgroundColor="#00a63e"
          loading={false}
          width={60}
        />
      </ImageBackground>
    );
  }

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      baseZoom.current = zoom;
    })
    .onUpdate((event) => {
      let newZoom = baseZoom.current + (event.scale - 1) * 0.5;

      newZoom = Math.max(0, Math.min(newZoom, 1));

      setZoom(newZoom);
    });

  const takePhoto = async () => {
    if (!cameraRef.current || loadingUpload) return;
    setLoadingUpload(true)

    const result = await cameraRef.current.takePictureAsync();
    setPhoto(result.uri);

    const photoFile = {
      uri: result.uri,
      name: "image.jpg",
      type: "image/jpeg",
    };

    const formData = new FormData();
    formData.append("userId", (await getMe()).id);
    formData.append("image", photoFile as any);

    await handleUpload(formData);
  };

  const toggleCamera = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlash((prev) => (prev === "off" ? "on" : "off"));
  };

  const handleUpload = async (formData: FormData) => {
    if (loadingUpload) {
      return;
    }
    setLoadingUpload(true);

    try {
      const response = await uploadPicture(formData);
      setAnimalInfo(response);
      console.log(response);
      if (response.confidence >= 50) {
        setHasIdentified(true);
      } else {
        setHasIdentified(false);
      }
    } catch (e) {
      console.error(
        "Erro ao análisar imagem:",
        e instanceof Error ? e.message : "Unknown Error",
      );
    } finally {
      setVisibleCard(true);
      setLoadingUpload(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userData");
    navigation.navigate("Login");
  };

  return (
    <GestureDetector gesture={pinchGesture}>
      <View style={{ flex: 1 }}>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing={facing}
          zoom={zoom}
          flash={flash}
        />

        {loadingUpload && <LoadingOverlay />}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Back />
        </TouchableOpacity>

        <View style={styles.hud}>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={toggleFlash}
            activeOpacity={0.5}
          >
            {flash === "on" ? <FlashOff /> : <FlashOn />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePhoto}
            activeOpacity={0.5}
          />

          <TouchableOpacity style={styles.flipButton} onPress={toggleCamera}>
            <FlipCamera />
          </TouchableOpacity>
        </View>

        <SlidingCard setVisible={setVisibleCard} visible={visibleCard}>
          {photo && <Image source={{ uri: photo }} style={styles.preview} />}
          {animalInfo && (
            <View style={styles.infoContainer}>
              <View style={styles.cardTitle}>
                <Text style={styles.animalName}>
                  {hasIdentified
                    ? AnimalLabels[animalInfo.species].name
                    : "Não Identificado"}
                </Text>
                <Text style={styles.scientificName}>
                  {hasIdentified
                    ? AnimalLabels[animalInfo.species].scientificName
                    : "Animal não reconhecido"}
                </Text>
              </View>

              <View style={styles.progressBar}>
                <View style={styles.progressBarTitle}>
                  <Text style={{ color: "#25323c", fontSize: 16 }}>
                    Confiança
                  </Text>
                  <Text
                    style={[
                      hasIdentified
                        ? { color: "#00a63e" }
                        : { color: "#D97706" },
                      {
                        fontWeight: "bold",
                        fontSize: 16,
                      },
                    ]}
                  >
                    {animalInfo.confidence.toFixed(2) + "%"}
                  </Text>
                </View>
                <ProgressBar
                  color={hasIdentified ? "#00a63e" : "#D97706"}
                  value={animalInfo.confidence}
                />
              </View>

              <View style={hasIdentified ? styles.infoCard : styles.alertCard}>
                <Text style={!hasIdentified ? { color: "#78350F" } : undefined}>
                  {hasIdentified ? (
                    AnimalLabels[animalInfo.species].description
                  ) : (
                    <>
                      <Text style={{ fontWeight: "bold" }}>
                        {
                          "A IA não conseguiu identificar o animal com segurança.\n"
                        }
                      </Text>

                      <Text>
                        Isso pode ocorrer quando a imagem está desfocada, o
                        animal não está visível claramente ou não está no
                        conjunto de animais treinados. Tente enviar com melhor
                        iluminação e enquadramento.
                      </Text>
                    </>
                  )}
                </Text>
              </View>

              <View style={{ paddingTop: 24 }}>
                <FullButton
                  backgroundColor="#00a63e"
                  onPress={() => setVisibleCard(false)}
                  loading={false}
                  title="OK"
                  width={100}
                />
              </View>
            </View>
          )}
        </SlidingCard>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },

  hud: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
  },

  flashButton: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  logoutButton: {
    position: "absolute",
    top: 32,
    left: 16,
    padding: 15,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  flipButton: {
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
  },

  preview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },

  infoContainer: {
    width: "100%",
  },

  animalName: {
    color: "#25323c",
    fontSize: 24,
  },

  scientificName: {
    color: "#4b5563",
    fontSize: 16,
  },

  progressBar: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 8,
    paddingBottom: 24,
  },

  progressBarTitle: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },

  cardTitle: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    paddingVertical: 16,
  },

  infoCard: {
    width: "100%",
    backgroundColor: "#eaf5ee",
    borderRadius: 12,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  alertCard: {
    width: "100%",
    backgroundColor: "#fef3c7",
    borderWidth: 1,
    borderColor: "#fde68a",
    gap: 8,
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
  },
});
