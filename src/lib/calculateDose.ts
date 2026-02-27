import { drugs } from "./drugs";

export interface DoseResult {
    drugName: string;
    formulation: string;
    route: string;
    singleDose: string | null;
    frequencyPerDay: number;
    maxDoseApplied: boolean;
    considerations: string[];
}

export function calculateDose(
    age: number,
    weight: number,
    drugKey: string,
    formulationLabel: string
): DoseResult | null {
    const drug = drugs[drugKey];
    if (!drug) return null;

    const formulation = drug.formulations.find((f) => f.label === formulationLabel);
    if (!formulation) return null;

    let singleDoseStr: string | null = null;
    let maxDoseApplied = false;

    if (formulation.adultFixedDose && age >= 18) {
        singleDoseStr = formulation.adultFixedDose;
    } else if (formulation.pediatricMgPerKgPerDay !== null) {
        let totalDailyDose = weight * formulation.pediatricMgPerKgPerDay;

        if (formulation.maxMgPerDay !== null && totalDailyDose > formulation.maxMgPerDay) {
            totalDailyDose = formulation.maxMgPerDay;
            maxDoseApplied = true;
        }

        const singleDoseMg = totalDailyDose / formulation.frequencyPerDay;

        if (formulation.type === "suspension" && formulation.strengthMgPer5ml !== null) {
            const mlPerDose = (singleDoseMg / formulation.strengthMgPer5ml) * 5;
            singleDoseStr = `${singleDoseMg.toFixed(1)} mg (${mlPerDose.toFixed(1)} mL)`;
        } else {
            singleDoseStr = `${singleDoseMg.toFixed(1)} mg`;
        }
    }

    return {
        drugName: drug.name,
        formulation: formulation.label,
        route: drug.route,
        singleDose: singleDoseStr,
        frequencyPerDay: formulation.frequencyPerDay,
        maxDoseApplied,
        considerations: drug.considerations,
    };
}
