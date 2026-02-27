export interface Formulation {
    label: string;
    type: "tablet" | "suspension";
    pediatricMgPerKgPerDay: number | null;
    adultFixedDose: string | null;
    frequencyPerDay: number;
    maxMgPerDay: number | null;
    strengthMg: number | null;
    strengthMgPer5ml: number | null;
}

export interface Drug {
    name: string;
    route: string;
    considerations: string[];
    formulations: Formulation[];
}

export const drugs: Record<string, Drug> = {
    "amoxicillin-clavulanate": {
        name: "Amoxicillin-clavulanate",
        route: "Oral",
        considerations: [
            "Administer with meals to reduce GI upset",
            "mg/kg calculation is based on the Amoxicillin component",
        ],
        formulations: [
            {
                label: "Suspension 400mg/57mg per 5mL",
                type: "suspension",
                pediatricMgPerKgPerDay: 45,
                adultFixedDose: null,
                frequencyPerDay: 2,
                maxMgPerDay: 1750,
                strengthMg: null,
                strengthMgPer5ml: 400,
            },
            {
                label: "Tablet 875mg/125mg",
                type: "tablet",
                pediatricMgPerKgPerDay: null,
                adultFixedDose: "875 mg twice daily",
                frequencyPerDay: 2,
                maxMgPerDay: 1750,
                strengthMg: 875,
                strengthMgPer5ml: null,
            },
        ],
    },
    paracetamol: {
        name: "Paracetamol",
        route: "Oral",
        considerations: [
            "Do not exceed maximum daily dose to prevent hepatotoxicity",
        ],
        formulations: [
            {
                label: "Syrup 120mg/5mL",
                type: "suspension",
                pediatricMgPerKgPerDay: 60,
                adultFixedDose: null,
                frequencyPerDay: 4,
                maxMgPerDay: 4000,
                strengthMg: null,
                strengthMgPer5ml: 120,
            },
            {
                label: "Tablet 500mg",
                type: "tablet",
                pediatricMgPerKgPerDay: null,
                adultFixedDose: "1000 mg every 6 hours",
                frequencyPerDay: 4,
                maxMgPerDay: 4000,
                strengthMg: 500,
                strengthMgPer5ml: null,
            },
        ],
    },
    ibuprofen: {
        name: "Ibuprofen",
        route: "Oral",
        considerations: [
            "Administer with food or milk to avoid GI upset",
            "Avoid in severe renal impairment",
        ],
        formulations: [
            {
                label: "Suspension 100mg/5mL",
                type: "suspension",
                pediatricMgPerKgPerDay: 30, // 10mg/kg/dose * 3 times a day
                adultFixedDose: null,
                frequencyPerDay: 3,
                maxMgPerDay: 1200,
                strengthMg: null,
                strengthMgPer5ml: 100,
            },
            {
                label: "Tablet 400mg",
                type: "tablet",
                pediatricMgPerKgPerDay: null,
                adultFixedDose: "400 mg every 8 hours",
                frequencyPerDay: 3,
                maxMgPerDay: 2400,
                strengthMg: 400,
                strengthMgPer5ml: null,
            },
        ],
    },
};
