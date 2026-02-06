export type ClassificationDto = {
  id: string;
  userId: string;
  species: string;
  modelId: string;
  confidence: number;
  classifiedAt: Date;
};
