export interface Formulation {
    id: string;
    label: string;
    type: "tablet" | "suspension" | "capsule" | "drops" | "spray" | "infusion" | "injection";
    strength: string;
    route: string;
    strengthMgPerUnit: number | null;
    strengthMgPer5ml: number | null;
    unitVolumeMl: number | null;
    pediatricMgPerKgPerDay: number | null;
    pediatricMgPerKgPerDose?: number | null;
    adultFixedDose: string | null;
    frequencyPerDay: number;
    maxMgPerDay: number | null;
    minAgeMonths: number | null;
    notes: string[];
}

export interface Drug {
    key?: string;
    name: string;
    drugClass: string;
    route: string;
    pediatricMgPerKgPerDay: number | null;
    pediatricMgPerKgPerDose?: number | null;
    adultDose: string | null;
    frequencyPerDay: number;
    maxMgPerDay: number | null;
    importantNotes: string[];
    considerations: string[];
    formulations: Formulation[];
}

import { drugCatalog } from "./drugCatalog";
import { dosingGuidelines } from "./dosingGuidelines";
import { formulationsByDrug } from "./formulations";

export const drugs: Record<string, Drug> = Object.fromEntries(
  Object.entries(drugCatalog).map(([drugKey, catalogEntry]) => {
    const guideline = dosingGuidelines[drugKey];
    const formulations = formulationsByDrug[drugKey] ?? [];

    const drug: Drug = {
      key: drugKey,
      name: catalogEntry.name,
      drugClass: catalogEntry.drugClass,
      route: catalogEntry.route,
      pediatricMgPerKgPerDay: guideline?.pediatricMgPerKgPerDay ?? null,
      pediatricMgPerKgPerDose: guideline?.pediatricMgPerKgPerDose ?? null,
      adultDose: guideline?.adultDose ?? null,
      frequencyPerDay: guideline?.frequencyPerDay ?? 0,
      maxMgPerDay: guideline?.maxMgPerDay ?? null,
      importantNotes: guideline?.importantNotes ?? [],
      considerations: guideline?.considerations ?? [],
      formulations,
    };

    return [drugKey, drug] as const;
  })
);
