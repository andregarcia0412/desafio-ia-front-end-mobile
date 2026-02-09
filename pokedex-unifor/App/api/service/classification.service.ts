import type { ClassificationDto } from "../../data/dto/classification.dto";
import { api } from "../client";

export const uploadPicture = async (
  formData: FormData,
): Promise<ClassificationDto> => {
  try {
    const response = await api.post("/classification", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (e) {
    console.error(
      "Erro ao classificar:",
      e instanceof Error ? e.message : "Unknown Error",
    );
    throw e;
  }
};
