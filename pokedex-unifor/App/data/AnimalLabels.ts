export type AnimalInfo = {
  name: string;
  scientificName: string;
  description: string;
};

export const AnimalLabels: Record<string, AnimalInfo> = {
  cow: {
    name: "Vaca",
    scientificName: "Bos taurus",
    description:
      "Mamífero herbívoro domesticado, amplamente criado para produção de leite, carne e couro.",
  },

  goat: {
    name: "Cabra",
    scientificName: "Capra aegagrus hircus",
    description:
      "Mamífero herbívoro ágil e resistente, muito adaptável a terrenos montanhosos e climas secos.",
  },

  pigeon: {
    name: "Pombo",
    scientificName: "Columba livia",
    description:
      "Ave muito comum em áreas urbanas, conhecida por sua excelente orientação espacial.",
  },

  iguana: {
    name: "Iguana",
    scientificName: "Iguana iguana",
    description:
      "Réptil herbívoro de clima tropical, frequentemente encontrado em árvores e áreas próximas à água.",
  },

  possum: {
    name: "Gambá",
    scientificName: "Didelphis marsupialis",
    description:
      "Mamífero marsupial noturno, conhecido por se fingir de morto como mecanismo de defesa.",
  },

  peacock: {
    name: "Pavão",
    scientificName: "Pavo cristatus",
    description:
      "Ave ornamental famosa pelas penas coloridas e exuberantes usadas em rituais de acasalamento.",
  },

  cat: {
    name: "Gato",
    scientificName: "Felis catus",
    description:
      "Mamífero doméstico independente e ágil, amplamente conhecido como animal de companhia.",
  },

  ostrich: {
    name: "Ema",
    scientificName: "Rhea americana",
    description:
      "Ave de grande porte que não voa, típica da América do Sul e semelhante ao avestruz.",
  },

  lizard: {
    name: "Lagarto",
    scientificName: "Lacertilia",
    description:
      "Grupo diverso de répteis escamados, encontrados em diferentes habitats ao redor do mundo.",
  },

  horse: {
    name: "Cavalo",
    scientificName: "Equus ferus caballus",
    description:
      "Mamífero herbívoro utilizado historicamente para transporte, trabalho e esportes.",
  },
};
