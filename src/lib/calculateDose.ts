import { drugs } from "./drugs";

export interface DoseResult {
    drugName: string;
    formulationLabel: string;
    route: string;
    singleDose: string | null;
    frequencyPerDay: number;
    totalDailyDose: number | null;
    maxDoseApplied: boolean;
    ageWarning: string | null;
    considerations: string[];
    durationDays: number | null;
    totalQuantity: string | null;
    totalAdministrations: number | null;
}

function roundToNearestHalfMl(value: number): number {
    return Math.round(value * 2) / 2;
}

function roundToNearestTenMg(value: number): number {
    return Math.round(value / 10) * 10;
}

function roundToNearestHalfTablet(value: number): number {
    return Math.round(value * 2) / 2;
}

export function calculateDose(
    ageYears: number,
    weightKg: number,
    drugKey: string,
    formulationLabel: string,
    durationDays: number | null = null
): DoseResult | null {
    const drug = drugs[drugKey];
    if (!drug) return null;

    const formulation = drug.formulations.find((f) => f.label === formulationLabel);
    if (!formulation) return null;

    const ageMonths = ageYears * 12;
    let ageWarning: string | null = null;
    if (formulation.minAgeMonths !== null && ageMonths < formulation.minAgeMonths) {
        ageWarning = "Not recommended for this age";
    }

    let singleDoseStr: string | null = null;
    let totalDailyDoseVal: number | null = null;
    let maxDoseApplied = false;

    let mlPerDose: number | null = null;
    let unitsPerDose: number | null = null;

    // 1. Adult Dosing (Age >= 18)
    if (ageYears >= 18 && formulation.adultFixedDose) {
        singleDoseStr = formulation.adultFixedDose;
    }
    // 2. Pediatric Weight-Based Dosing
    else if (ageYears < 18 && formulation.pediatricMgPerKgPerDay !== null) {
        let calculatedTotal = weightKg * formulation.pediatricMgPerKgPerDay;

        // Apply max dose cap first
        if (formulation.maxMgPerDay !== null && calculatedTotal > formulation.maxMgPerDay) {
            calculatedTotal = formulation.maxMgPerDay;
            maxDoseApplied = true;
        }

        totalDailyDoseVal = parseFloat(calculatedTotal.toFixed(1));
        const singleDoseMg = calculatedTotal / formulation.frequencyPerDay;

        // Apply specific rounding rules AFTER max dose cap
        if (formulation.type === "suspension" && formulation.strengthMgPer5ml !== null) {
            mlPerDose = (singleDoseMg / formulation.strengthMgPer5ml) * 5;
            mlPerDose = roundToNearestHalfMl(mlPerDose);

            const deliveredMg = parseFloat((mlPerDose * (formulation.strengthMgPer5ml / 5)).toFixed(1));
            singleDoseStr = `${deliveredMg} mg (${mlPerDose} mL)`;

        } else if ((formulation.type === "tablet" || formulation.type === "capsule") && formulation.strengthMgPerUnit !== null) {
            unitsPerDose = singleDoseMg / formulation.strengthMgPerUnit;
            unitsPerDose = roundToNearestHalfTablet(unitsPerDose);

            const deliveredMg = parseFloat((unitsPerDose * formulation.strengthMgPerUnit).toFixed(1));
            const unitLabel = formulation.type === "capsule" ? "cap" : "tab";
            singleDoseStr = `${deliveredMg} mg (${unitsPerDose} ${unitLabel})`;

        } else {
            const roundedMg = roundToNearestTenMg(singleDoseMg);
            singleDoseStr = `${roundedMg} mg`;
        }
    }
    // 3. Fallback for non-weight-based pediatric formulations
    else if (ageYears < 18 && formulation.adultFixedDose) {
        singleDoseStr = formulation.adultFixedDose;
    }

    // Calculate Duration Totals
    let totalAdministrationsVal: number | null = null;
    let totalQuantityStr: string | null = null;

    if (durationDays !== null && durationDays > 0) {
        totalAdministrationsVal = formulation.frequencyPerDay * durationDays;

        if (formulation.type === "suspension" && mlPerDose !== null) {
            const totalMl = mlPerDose * totalAdministrationsVal;
            totalQuantityStr = `${totalMl} mL`;
        } else if ((formulation.type === "tablet" || formulation.type === "capsule") && unitsPerDose !== null) {
            const totalUnits = unitsPerDose * totalAdministrationsVal;
            const unitLabel = formulation.type === "capsule" ? "capsules" : "tablets";
            totalQuantityStr = `${totalUnits} ${unitLabel}`;
        }
    }

    const allConsiderations = [...drug.considerations, ...formulation.notes];

    return {
        drugName: drug.name,
        formulationLabel: formulation.label,
        route: drug.route,
        singleDose: singleDoseStr,
        frequencyPerDay: formulation.frequencyPerDay,
        totalDailyDose: totalDailyDoseVal,
        maxDoseApplied,
        ageWarning,
        considerations: allConsiderations,
        durationDays,
        totalQuantity: totalQuantityStr,
        totalAdministrations: totalAdministrationsVal,
    };
}
