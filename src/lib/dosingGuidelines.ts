export type DrugDosingGuideline = {
  pediatricMgPerKgPerDay: number | null;
  pediatricMgPerKgPerDose?: number | null;
  adultDose: string | null;
  frequencyPerDay: number;
  maxMgPerDay: number | null;
  importantNotes: string[];
  considerations: string[];
};

export const dosingGuidelines: Record<string, DrugDosingGuideline> = {
  "amoxicillin": {
    pediatricMgPerKgPerDay: 40,
    adultDose: "500 mg",
    frequencyPerDay: 3,
    maxMgPerDay: 3000,
    importantNotes: ["Administer with or without food", "May cause mild GI upset or rash"],
    considerations: ["Administer with or without food", "May cause mild GI upset or rash"],
  },
  "paracetamol": {
    pediatricMgPerKgPerDay: 60,
    pediatricMgPerKgPerDose: 15,
    adultDose: "500 - 1000 mg",
    frequencyPerDay: 4,
    maxMgPerDay: 4000,
    importantNotes: [
      "Do not exceed maximum daily dose to prevent hepatotoxicity",
      "Commonly found in combination products; check other medications",
    ],
    considerations: [
      "Do not exceed maximum daily dose to prevent hepatotoxicity",
      "Commonly found in combination products; check other medications",
    ],
  },
  "ibuprofen": {
    pediatricMgPerKgPerDay: 30,
    pediatricMgPerKgPerDose: 10,
    adultDose: "400 mg",
    frequencyPerDay: 3,
    maxMgPerDay: 2400,
    importantNotes: [
      "Administer with food or milk to avoid GI upset",
      "Avoid in severe renal impairment or active peptic ulcer",
    ],
    considerations: [
      "Administer with food or milk to avoid GI upset",
      "Avoid in severe renal impairment or active peptic ulcer",
    ],
  },
  "amoxicillin-clavulanate": {
    pediatricMgPerKgPerDay: 45,
    adultDose: "875 mg",
    frequencyPerDay: 2,
    maxMgPerDay: 1750,
    importantNotes: [
      "Calculate dose based on amoxicillin component",
      "May cause diarrhea; consider probiotics",
      "High-dose formulation used for resistant infections.",
    ],
    considerations: ["Calculate dose based on amoxicillin component", "May cause diarrhea; consider probiotics"],
  },
  "azithromycin": {
    pediatricMgPerKgPerDay: 10,
    adultDose: "500 mg",
    frequencyPerDay: 1,
    maxMgPerDay: 500,
    importantNotes: ["Can be taken with or without food", "Usually given as a 3 or 5 day course"],
    considerations: ["Can be taken with or without food", "Usually given as a 3 or 5 day course"],
  },
  "cefuroxime": {
    pediatricMgPerKgPerDay: 30,
    adultDose: "250 mg",
    frequencyPerDay: 2,
    maxMgPerDay: 1000,
    importantNotes: ["Take with food to increase absorption", "May have a metallic, bitter taste in suspension form"],
    considerations: ["Take with food to increase absorption", "May have a metallic, bitter taste in suspension form"],
  },
  "cetirizine": {
    pediatricMgPerKgPerDay: 0.25,
    adultDose: "10 mg",
    frequencyPerDay: 1,
    maxMgPerDay: 10,
    importantNotes: ["May cause drowsiness in some patients", "Can be taken with or without food"],
    considerations: ["May cause drowsiness in some patients", "Can be taken with or without food"],
  },
  "loratadine": {
    pediatricMgPerKgPerDay: 0.2,
    adultDose: "10 mg",
    frequencyPerDay: 1,
    maxMgPerDay: 10,
    importantNotes: ["Non-sedating antihistamine", "Can be taken with or without food"],
    considerations: ["Non-sedating antihistamine", "Can be taken with or without food"],
  },
  "fexofenadine": {
    pediatricMgPerKgPerDay: 4,
    adultDose: "180 mg",
    frequencyPerDay: 1,
    maxMgPerDay: 180,
    importantNotes: [
      "Do not take with fruit juices (e.g., apple, orange, grapefruit) as they reduce absorption",
      "Non-sedating",
    ],
    considerations: [
      "Do not take with fruit juices (e.g., apple, orange, grapefruit) as they reduce absorption",
      "Non-sedating",
    ],
  },
  "mometasone": {
    pediatricMgPerKgPerDay: null,
    adultDose: "100 mcg per nostril",
    frequencyPerDay: 1,
    maxMgPerDay: null,
    importantNotes: ["Clear nasal passages before use", "Aim away from nasal septum"],
    considerations: ["Clear nasal passages before use", "Aim away from nasal septum"],
  },
  "fluticasone": {
    pediatricMgPerKgPerDay: null,
    adultDose: "100 mcg per nostril",
    frequencyPerDay: 1,
    maxMgPerDay: null,
    importantNotes: ["May take several days to achieve maximum benefit", "Prime the pump before first use or after periods of non-use"],
    considerations: ["May take several days to achieve maximum benefit", "Prime the pump before first use or after periods of non-use"],
  },
  "oxymetazoline": {
    pediatricMgPerKgPerDay: null,
    adultDose: "2 to 3 sprays per nostril",
    frequencyPerDay: 2,
    maxMgPerDay: null,
    importantNotes: ["Do not use for more than 3 consecutive days to prevent rebound congestion"],
    considerations: ["Do not use for more than 3 consecutive days to prevent rebound congestion"],
  },
  "ciprofloxacin": {
    pediatricMgPerKgPerDay: 20,
    adultDose: "500 mg",
    frequencyPerDay: 2,
    maxMgPerDay: 1500,
    importantNotes: [
      "Not recommended as first-line in pediatrics due to joint/cartilage concerns",
      "Do not take PO with dairy products or calcium-fortified juices alone",
      "Administer PO 2 hours before or 6 hours after antacids, iron, or zinc",
    ],
    considerations: [
      "Not recommended as first-line in pediatrics due to joint/cartilage concerns",
      "Do not take PO with dairy products or calcium-fortified juices alone",
    ],
  },
  "acetic-acid-otic": {
    pediatricMgPerKgPerDay: null,
    adultDose: "5 drops",
    frequencyPerDay: 3,
    maxMgPerDay: null,
    importantNotes: [
      "Instill into the ear canal 3 to 4 times daily",
      "Use a cotton wick for the first 24 hours if necessary to ensure contact",
    ],
    considerations: [
      "Instill into the ear canal 3 to 4 times daily",
      "Use a cotton wick for the first 24 hours if necessary to ensure contact",
    ],
  },
  "clotrimazole-otic": {
    pediatricMgPerKgPerDay: null,
    adultDose: "4-5 drops",
    frequencyPerDay: 3,
    maxMgPerDay: null,
    importantNotes: [
      "Clean and dry the ear canal thoroughly before applying",
      "Complete the full course even if symptoms disappear quickly",
    ],
    considerations: [
      "Clean and dry the ear canal thoroughly before applying",
      "Complete the full course even if symptoms disappear quickly",
    ],
  },
  "prednisolone": {
    pediatricMgPerKgPerDay: 1,
    pediatricMgPerKgPerDose: 1,
    adultDose: "40 mg",
    frequencyPerDay: 1,
    maxMgPerDay: 60,
    importantNotes: [
      "Administer with food or milk to decrease GI upset",
      "Give in the morning to mimic natural cortisol production and prevent insomnia",
    ],
    considerations: [
      "Administer with food or milk to decrease GI upset",
      "Give in the morning to mimic natural cortisol production and prevent insomnia",
    ],
  },
  "dexamethasone": {
    pediatricMgPerKgPerDay: 0.6,
    pediatricMgPerKgPerDose: 0.6,
    adultDose: "6 mg",
    frequencyPerDay: 1,
    maxMgPerDay: 16,
    importantNotes: ["Administer with food or milk to decrease GI upset", "Long-acting steroid"],
    considerations: ["Administer with food or milk to decrease GI upset", "Long-acting steroid"],
  },
};

