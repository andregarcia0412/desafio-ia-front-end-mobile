import type { ClassificationDto } from "../../data/dto/classification.dto";
import { api } from "../client";

export const uploadPicture = async (
  userId: string,
  image: File,
): Promise<ClassificationDto> => {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("image", image);
    const response = await api.post("/classification", formData);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.error(
      "Erro ao classificar:",
      e instanceof Error ? e.message : "Unknown Error",
    );

    console.log(image);
    throw e;
  }
};
