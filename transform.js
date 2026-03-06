const fs = require('fs');

let code = fs.readFileSync('src/lib/drugs.ts', 'utf8');

// Paracetamol
code = code.replace(
    /id: "para-tab-500",[\s\S]*?notes: \[\],\s*\},/g,
    `$&
            {
                id: "para-susp-250",
                label: "Suspension 250mg/5mL",
                type: "suspension",
                strengthMgPerUnit: null,
                strengthMgPer5ml: 250,
                unitVolumeMl: 5,
                pediatricMgPerKgPerDay: 60,
                pediatricMgPerKgPerDose: 15,
                adultFixedDose: null,
                frequencyPerDay: 4,
                maxMgPerDay: 4000,
                minAgeMonths: 6,
                notes: ["Use calibrated syringe or cup for accurate dosing"],
            },
            {
                id: "para-iv-1000",
                label: "IV Infusion 1000mg/100mL",
                type: "infusion",
                strengthMgPerUnit: 1000,
                strengthMgPer5ml: null,
                unitVolumeMl: 100,
                pediatricMgPerKgPerDay: 60,
                pediatricMgPerKgPerDose: 15,
                adultFixedDose: "1000 mg every 6 hours",
                frequencyPerDay: 4,
                maxMgPerDay: 4000,
                minAgeMonths: null,
                notes: ["Administer over 15 minutes"],
            },`
);
code = code.replace('route: "PO",\n        pediatricMgPerKgPerDay: 60,', 'route: "PO / IV",\n        pediatricMgPerKgPerDay: 60,');

// Ibuprofen
code = code.replace(
    /id: "ibu-tab-400",[\s\S]*?notes: \[\],\s*\},/g,
    `$&
            {
                id: "ibu-susp-200",
                label: "Suspension 200mg/5mL",
                type: "suspension",
                strengthMgPerUnit: null,
                strengthMgPer5ml: 200,
                unitVolumeMl: 5,
                pediatricMgPerKgPerDay: 30,
                pediatricMgPerKgPerDose: 10,
                adultFixedDose: null,
                frequencyPerDay: 3,
                maxMgPerDay: 1200,
                minAgeMonths: 6,
                notes: ["Shake well before use"],
            },
            {
                id: "ibu-tab-200",
                label: "Tablet 200mg",
                type: "tablet",
                strengthMgPerUnit: 200,
                strengthMgPer5ml: null,
                unitVolumeMl: null,
                pediatricMgPerKgPerDay: null,
                pediatricMgPerKgPerDose: null,
                adultFixedDose: "200-400 mg every 6-8 hours",
                frequencyPerDay: 3,
                maxMgPerDay: 2400,
                minAgeMonths: 144,
                notes: [],
            },
            {
                id: "ibu-tab-600",
                label: "Tablet 600mg",
                type: "tablet",
                strengthMgPerUnit: 600,
                strengthMgPer5ml: null,
                unitVolumeMl: null,
                pediatricMgPerKgPerDay: null,
                pediatricMgPerKgPerDose: null,
                adultFixedDose: "600 mg every 8 hours",
                frequencyPerDay: 3,
                maxMgPerDay: 2400,
                minAgeMonths: 144,
                notes: [],
            },`
);

// Azithromycin
code = code.replace(
    /id: "azithro-tab-500",[\s\S]*?notes: \[\],\s*\},/g,
    `$&
            {
                id: "azithro-tab-250",
                label: "Tablet 250mg",
                type: "tablet",
                strengthMgPerUnit: 250,
                strengthMgPer5ml: null,
                unitVolumeMl: null,
                pediatricMgPerKgPerDay: null,
                adultFixedDose: "500 mg on day 1, then 250 mg daily for 4 days",
                frequencyPerDay: 1,
                maxMgPerDay: 500,
                minAgeMonths: 144,
                notes: [],
            },
            {
                id: "azithro-iv-500",
                label: "IV Infusion 500mg",
                type: "infusion",
                strengthMgPerUnit: 500,
                strengthMgPer5ml: null,
                unitVolumeMl: null,
                pediatricMgPerKgPerDay: null,
                adultFixedDose: "500 mg daily for 2 days, then convert to oral",
                frequencyPerDay: 1,
                maxMgPerDay: 500,
                minAgeMonths: null,
                notes: ["Must be reconstituted properly and infused over at least 1 hr"],
            },`
);
code = code.replace('route: "PO",\n        pediatricMgPerKgPerDay: 10', 'route: "PO / IV",\n        pediatricMgPerKgPerDay: 10');


// Cefuroxime
code = code.replace(
    /id: "cef-tab-250",[\s\S]*?notes: \[\"Do not crush tablets \(strong bitter taste\)\"\],\s*\},/g,
    `$&
            {
                id: "cef-susp-250",
                label: "Suspension 250mg/5mL",
                type: "suspension",
                strengthMgPerUnit: null,
                strengthMgPer5ml: 250,
                unitVolumeMl: 5,
                pediatricMgPerKgPerDay: 30,
                adultFixedDose: null,
                frequencyPerDay: 2,
                maxMgPerDay: 1000,
                minAgeMonths: 3,
                notes: ["Shake well. Must be taken with food."],
            },
            {
                id: "cef-tab-500",
                label: "Tablet 500mg",
                type: "tablet",
                strengthMgPerUnit: 500,
                strengthMgPer5ml: null,
                unitVolumeMl: null,
                pediatricMgPerKgPerDay: null,
                adultFixedDose: "500 mg twice daily",
                frequencyPerDay: 2,
                maxMgPerDay: 1000,
                minAgeMonths: 144,
                notes: ["Do not crush tablets (strong bitter taste)"],
            },
            {
                id: "cef-iv-750",
                label: "IV Injection 750mg",
                type: "infusion",
                strengthMgPerUnit: 750,
                strengthMgPer5ml: null,
                unitVolumeMl: null,
                pediatricMgPerKgPerDay: null,
                adultFixedDose: "750 mg every 8 hours",
                frequencyPerDay: 3,
                maxMgPerDay: 6000,
                minAgeMonths: null,
                notes: ["Can be given IM or IV"],
            },`
);
code = code.replace('route: "PO",\n        pediatricMgPerKgPerDay: 30', 'route: "PO / IV / IM",\n        pediatricMgPerKgPerDay: 30');


// Cetirizine
code = code.replace(
    /id: "cet-tab-10",[\s\S]*?notes: \[\],\s*\},/g,
    `$&
            {
                id: "cet-drops-10",
                label: "Oral Drops 10mg/mL",
                type: "drops",
                strengthMgPerUnit: null,
                strengthMgPer5ml: 50,
                unitVolumeMl: 1,
                pediatricMgPerKgPerDay: 0.25,
                adultFixedDose: null,
                frequencyPerDay: 1,
                maxMgPerDay: 10,
                minAgeMonths: 6,
                notes: ["Often dosed as 2.5mg (0.25mL) once daily for ages 6-23 months"],
            },`
);


// Loratadine
code = code.replace(
    /id: "lor-tab-10",[\s\S]*?notes: \[\],\s*\},/g,
    `$&
            {
                id: "lor-tab-5",
                label: "Tablet 5mg",
                type: "tablet",
                strengthMgPerUnit: 5,
                strengthMgPer5ml: null,
                unitVolumeMl: null,
                pediatricMgPerKgPerDay: null,
                adultFixedDose: null,
                frequencyPerDay: 1,
                maxMgPerDay: 10,
                minAgeMonths: 24,
                notes: [],
            },`
);


// Fexofenadine
code = code.replace(
    /id: "fex-tab-180",[\s\S]*?notes: \[\"Do not take with fruit juices\"\],\s*\},/g,
    `$&
            {
                id: "fex-tab-30",
                label: "Tablet 30mg",
                type: "tablet",
                strengthMgPerUnit: 30,
                strengthMgPer5ml: null,
                unitVolumeMl: null,
                pediatricMgPerKgPerDay: null,
                adultFixedDose: null,
                frequencyPerDay: 2,
                maxMgPerDay: 60,
                minAgeMonths: 72,
                notes: ["Do not take with fruit juices"],
            },
            {
                id: "fex-tab-120",
                label: "Tablet 120mg",
                type: "tablet",
                strengthMgPerUnit: 120,
                strengthMgPer5ml: null,
                unitVolumeMl: null,
                pediatricMgPerKgPerDay: null,
                adultFixedDose: "120 mg once daily",
                frequencyPerDay: 1,
                maxMgPerDay: 180,
                minAgeMonths: 144,
                notes: ["Do not take with fruit juices"],
            },`
);


// Prednisolone
code = code.replace(
    /id: "pred-tab-5",[\s\S]*?notes: \[\],\s*\}/g,
    `$&,
            {
                id: "pred-tab-25",
                label: "Tablet 25mg",
                type: "tablet",
                strengthMgPerUnit: 25,
                strengthMgPer5ml: null,
                unitVolumeMl: null,
                pediatricMgPerKgPerDay: null,
                pediatricMgPerKgPerDose: null,
                adultFixedDose: null,
                frequencyPerDay: 1,
                maxMgPerDay: 60,
                minAgeMonths: null,
                notes: [],
            },
            {
                id: "pred-syr-5",
                label: "Solution 5mg/5mL",
                type: "suspension",
                strengthMgPerUnit: null,
                strengthMgPer5ml: 5,
                unitVolumeMl: 5,
                pediatricMgPerKgPerDay: 1,
                pediatricMgPerKgPerDose: 1,
                adultFixedDose: null,
                frequencyPerDay: 1,
                maxMgPerDay: 60,
                minAgeMonths: null,
                notes: [],
            }`
);

// Dexamethasone
code = code.replace(
    /id: "dex-tab-4",[\s\S]*?notes: \[\],\s*\}/g,
    `$&,
            {
                id: "dex-inj-4",
                label: "Injection 4mg/mL",
                type: "infusion",
                strengthMgPerUnit: 4,
                strengthMgPer5ml: null,
                unitVolumeMl: 1,
                pediatricMgPerKgPerDay: 0.6,
                pediatricMgPerKgPerDose: 0.6,
                adultFixedDose: "6 mg once daily",
                frequencyPerDay: 1,
                maxMgPerDay: 16,
                minAgeMonths: null,
                notes: ["Given IV or IM"],
            }`
);
code = code.replace('route: "PO",\n        pediatricMgPerKgPerDay: 0.6', 'route: "PO / IM / IV",\n        pediatricMgPerKgPerDay: 0.6');

// Amoxicillin Clavulanate (Add IV forms)
code = code.replace(
    /id: "amoxclav-tab-875",[\s\S]*?notes: \["Take with meals to enhance absorption and decrease GI upset"\],\s*\},/g,
    `$&
            {
                id: "amoxclav-iv-1200",
                label: "IV Injection 1.2g",
                type: "infusion",
                strengthMgPerUnit: 1200,
                strengthMgPer5ml: null,
                unitVolumeMl: null,
                pediatricMgPerKgPerDay: null,
                adultFixedDose: "1.2g every 8 hours",
                frequencyPerDay: 3,
                maxMgPerDay: 3600,
                minAgeMonths: null,
                notes: ["Must be given via slow IV injection"],
            },`
);
code = code.replace('route: "PO",\n        pediatricMgPerKgPerDay: 45,', 'route: "PO / IV",\n        pediatricMgPerKgPerDay: 45,');


fs.writeFileSync('src/lib/drugs.ts', code);
