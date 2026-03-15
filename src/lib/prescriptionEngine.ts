import { diagnoses } from "./diagnoses";
import { drugCatalog } from "./drugCatalog";
import { dosingGuidelines } from "./dosingGuidelines";
import { formulationsByDrug, selectFormulation } from "./formulations";
import type { Drug } from "./drugs";
import { calculateDose, type DoseResult } from "./dosing";

export interface PrescriptionItem {
  id: string;
  result: DoseResult;
  drugKey: string;
  formulationLabel: string;
  durationDays: number | null;
  patientAgeMonths: number | null;
  role?: string;
  renalImpairment?: boolean;
  pregnancy?: boolean;
}

function combineDrug(drugKey: string): Drug | null {
  const catalogEntry = drugCatalog[drugKey];
  if (!catalogEntry) return null;
  const guideline = dosingGuidelines[drugKey];
  const formulations = formulationsByDrug[drugKey] ?? [];

  return {
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
}

export function buildPrescription(diagnosisKey: string, ageYears: number, weightKg: number, bundleIndex = 0, renalImpairment = false, pregnancy = false): PrescriptionItem[] {
  const diagnosis = diagnoses[diagnosisKey];
  if (!diagnosis) return [];

  const bundle = diagnosis.bundles?.[bundleIndex];
  if (!bundle) return [];

  const items: PrescriptionItem[] = [];

  for (const bundleItem of bundle.items) {
    const drugKey = bundleItem.drug;
    const drug = combineDrug(drugKey);
    if (!drug?.formulations?.length) continue;

    const formulation = selectFormulation(drug, ageYears);

    const res = calculateDose(ageYears, weightKg, drugKey, formulation.label, null);
    if (!res) continue;

    items.push({
      id: `rx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      result: res,
      drugKey,
      formulationLabel: formulation.label,
      durationDays: null,
      patientAgeMonths: !isNaN(ageYears) && ageYears > 0 ? ageYears * 12 : null,
      role: bundleItem.role,
      renalImpairment,
      pregnancy,
    });
  }

  return items;
}

export function buildManualPrescriptionItem(
  drugKey: string,
  formulationLabel: string,
  ageYears: number,
  weightKg: number,
  renalImpairment = false,
  pregnancy = false
): PrescriptionItem | null {
  const drug = combineDrug(drugKey);
  if (!drug?.formulations?.length) return null;

  const res = calculateDose(ageYears, weightKg, drugKey, formulationLabel, null);
  if (!res) return null;

  return {
    id: `rx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    result: res,
    drugKey,
    formulationLabel,
    durationDays: null,
    patientAgeMonths: !isNaN(ageYears) && ageYears > 0 ? ageYears * 12 : null,
    renalImpairment,
    pregnancy,
  };
}
