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

export const drugs: Record<string, Drug> = {
    "amoxicillin": {
        "name": "Amoxicillin",
        "drugClass": "Antibiotic (Penicillin)",
        "route": "PO",
        "formulations": [
            {
                "id": "amox-susp-125",
                "label": "Suspension 125mg/5mL",
                "type": "suspension",
                "strength": "125 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 125,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 40,
                "adultFixedDose": null,
                "frequencyPerDay": 3,
                "maxMgPerDay": 3000,
                "minAgeMonths": null,
                "notes": [
                    "Shake well before use",
                    "Refrigerate suspension after mixing (usually 14 days)"
                ]
            },
            {
                "id": "amox-susp-250",
                "label": "Suspension 250mg/5mL",
                "type": "suspension",
                "strength": "250 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 250,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 40,
                "adultFixedDose": null,
                "frequencyPerDay": 3,
                "maxMgPerDay": 3000,
                "minAgeMonths": null,
                "notes": [
                    "Shake well before use",
                    "Refrigerate suspension after mixing (usually 14 days)"
                ]
            },
            {
                "id": "amox-susp-400",
                "label": "Suspension 400mg/5mL",
                "type": "suspension",
                "strength": "400 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 400,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 45,
                "adultFixedDose": null,
                "frequencyPerDay": 2,
                "maxMgPerDay": 3000,
                "minAgeMonths": 2,
                "notes": [
                    "Shake well before use",
                    "Refrigerate suspension after mixing (14 days)"
                ]
            },
            {
                "id": "amox-cap-250",
                "label": "Capsule 250mg",
                "type": "capsule",
                "strength": "250 mg",
                "route": "PO",
                "strengthMgPerUnit": 250,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 40,
                "adultFixedDose": "250 mg three times daily",
                "frequencyPerDay": 3,
                "maxMgPerDay": 3000,
                "minAgeMonths": 96,
                "notes": [
                    "Swallow whole, do not open capsule"
                ]
            },
            {
                "id": "amox-cap-500",
                "label": "Capsule 500mg",
                "type": "capsule",
                "strength": "500 mg",
                "route": "PO",
                "strengthMgPerUnit": 500,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "500 mg three times daily",
                "frequencyPerDay": 3,
                "maxMgPerDay": 3000,
                "minAgeMonths": 144,
                "notes": [
                    "Swallow whole, do not open capsule"
                ]
            },
            {
                "id": "amox-tab-500",
                "label": "Tablet 500mg",
                "type": "tablet",
                "strength": "500 mg",
                "route": "PO",
                "strengthMgPerUnit": 500,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "500 mg three times daily",
                "frequencyPerDay": 3,
                "maxMgPerDay": 3000,
                "minAgeMonths": 144,
                "notes": []
            },
            {
                "id": "amox-tab-875",
                "label": "Tablet 875mg",
                "type": "tablet",
                "strength": "875 mg",
                "route": "PO",
                "strengthMgPerUnit": 875,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "875 mg twice daily",
                "frequencyPerDay": 2,
                "maxMgPerDay": 3000,
                "minAgeMonths": 144,
                "notes": []
            },
            {
                "id": "amox-inj-500",
                "label": "IV Injection 500mg",
                "type": "injection",
                "strength": "500 mg",
                "route": "IV",
                "strengthMgPerUnit": 500,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 50,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "500 mg",
                "frequencyPerDay": 3,
                "maxMgPerDay": 3000,
                "minAgeMonths": null,
                "notes": []
            }
        ],
        "pediatricMgPerKgPerDay": 40,
        "adultDose": "500 mg",
        "frequencyPerDay": 3,
        "maxMgPerDay": 3000,
        "importantNotes": [
            "Administer with or without food",
            "May cause mild GI upset or rash"
        ],
        "considerations": [
            "Administer with or without food",
            "May cause mild GI upset or rash"
        ]
    },
    "paracetamol": {
        "name": "Paracetamol",
        "drugClass": "Analgesic / Antipyretic",
        "route": "PO",
        "formulations": [
            {
                "id": "para-susp-120",
                "label": "Syrup 120mg/5mL",
                "type": "suspension",
                "strength": "120 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 120,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 60,
                "pediatricMgPerKgPerDose": 15,
                "adultFixedDose": null,
                "frequencyPerDay": 4,
                "maxMgPerDay": 4000,
                "minAgeMonths": 2,
                "notes": [
                    "Use calibrated syringe or cup for accurate dosing"
                ]
            },
            {
                "id": "para-tab-500",
                "label": "Tablet 500mg",
                "type": "tablet",
                "strength": "500 mg",
                "route": "PO",
                "strengthMgPerUnit": 500,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "1000 mg every 6 hours",
                "frequencyPerDay": 4,
                "maxMgPerDay": 4000,
                "minAgeMonths": 144,
                "notes": []
            },
            {
                "id": "para-susp-250",
                "label": "Suspension 250mg/5mL",
                "type": "suspension",
                "strength": "250 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 250,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 60,
                "pediatricMgPerKgPerDose": 15,
                "adultFixedDose": null,
                "frequencyPerDay": 4,
                "maxMgPerDay": 4000,
                "minAgeMonths": 6,
                "notes": [
                    "Use calibrated syringe or cup for accurate dosing"
                ]
            },
            {
                "id": "para-iv-1000",
                "label": "IV Infusion 1000mg/100mL",
                "type": "infusion",
                "strength": "1000 mg",
                "route": "IV",
                "strengthMgPerUnit": 1000,
                "strengthMgPer5ml": null,
                "unitVolumeMl": 100,
                "pediatricMgPerKgPerDay": 60,
                "pediatricMgPerKgPerDose": 15,
                "adultFixedDose": "1000 mg every 6 hours",
                "frequencyPerDay": 4,
                "maxMgPerDay": 4000,
                "minAgeMonths": null,
                "notes": [
                    "Administer over 15 minutes"
                ]
            },
            {
                "id": "para-cap-500",
                "label": "Capsule 500mg",
                "type": "capsule",
                "strength": "500 mg",
                "route": "PO",
                "strengthMgPerUnit": 500,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 60,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "1000 mg every 6 hours",
                "frequencyPerDay": 4,
                "maxMgPerDay": 4000,
                "minAgeMonths": null,
                "notes": []
            }
        ],
        "pediatricMgPerKgPerDay": 60,
        "adultDose": "500 - 1000 mg",
        "frequencyPerDay": 4,
        "maxMgPerDay": 4000,
        "importantNotes": [
            "Do not exceed maximum daily dose to prevent hepatotoxicity",
            "Commonly found in combination products; check other medications"
        ],
        "pediatricMgPerKgPerDose": 15,
        "considerations": [
            "Do not exceed maximum daily dose to prevent hepatotoxicity",
            "Commonly found in combination products; check other medications"
        ]
    },
    "ibuprofen": {
        "name": "Ibuprofen",
        "drugClass": "NSAID",
        "route": "PO",
        "formulations": [
            {
                "id": "ibu-susp-100",
                "label": "Suspension 100mg/5mL",
                "type": "suspension",
                "strength": "100 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 100,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 30,
                "pediatricMgPerKgPerDose": 10,
                "adultFixedDose": null,
                "frequencyPerDay": 3,
                "maxMgPerDay": 1200,
                "minAgeMonths": 6,
                "notes": [
                    "Shake well before use"
                ]
            },
            {
                "id": "ibu-tab-400",
                "label": "Tablet 400mg",
                "type": "tablet",
                "strength": "400 mg",
                "route": "PO",
                "strengthMgPerUnit": 400,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "400 mg every 8 hours",
                "frequencyPerDay": 3,
                "maxMgPerDay": 2400,
                "minAgeMonths": 144,
                "notes": []
            },
            {
                "id": "ibu-susp-200",
                "label": "Suspension 200mg/5mL",
                "type": "suspension",
                "strength": "200 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 200,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 30,
                "pediatricMgPerKgPerDose": 10,
                "adultFixedDose": null,
                "frequencyPerDay": 3,
                "maxMgPerDay": 1200,
                "minAgeMonths": 6,
                "notes": [
                    "Shake well before use"
                ]
            },
            {
                "id": "ibu-tab-200",
                "label": "Tablet 200mg",
                "type": "tablet",
                "strength": "200 mg",
                "route": "PO",
                "strengthMgPerUnit": 200,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "200-400 mg every 6-8 hours",
                "frequencyPerDay": 3,
                "maxMgPerDay": 2400,
                "minAgeMonths": 144,
                "notes": []
            },
            {
                "id": "ibu-tab-600",
                "label": "Tablet 600mg",
                "type": "tablet",
                "strength": "600 mg",
                "route": "PO",
                "strengthMgPerUnit": 600,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "600 mg every 8 hours",
                "frequencyPerDay": 3,
                "maxMgPerDay": 2400,
                "minAgeMonths": 144,
                "notes": []
            },
            {
                "id": "ibu-cap-200",
                "label": "Capsule 200mg",
                "type": "capsule",
                "strength": "200 mg",
                "route": "PO",
                "strengthMgPerUnit": 200,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 30,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "200-400 mg every 6-8 hours",
                "frequencyPerDay": 3,
                "maxMgPerDay": 2400,
                "minAgeMonths": null,
                "notes": []
            },
            {
                "id": "ibu-inj-400",
                "label": "IV Injection 400mg/4mL",
                "type": "injection",
                "strength": "400 mg",
                "route": "IV",
                "strengthMgPerUnit": 400,
                "strengthMgPer5ml": null,
                "unitVolumeMl": 4,
                "pediatricMgPerKgPerDay": 30,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "400 mg",
                "frequencyPerDay": 3,
                "maxMgPerDay": 2400,
                "minAgeMonths": null,
                "notes": []
            }
        ],
        "pediatricMgPerKgPerDay": 30,
        "adultDose": "400 mg",
        "frequencyPerDay": 3,
        "maxMgPerDay": 2400,
        "importantNotes": [
            "Administer with food or milk to avoid GI upset",
            "Avoid in severe renal impairment or active peptic ulcer"
        ],
        "pediatricMgPerKgPerDose": 10,
        "considerations": [
            "Administer with food or milk to avoid GI upset",
            "Avoid in severe renal impairment or active peptic ulcer"
        ]
    },
    "amoxicillin-clavulanate": {
        "name": "Amoxicillin-clavulanate",
        "drugClass": "Antibiotic (Beta-lactam + inhibitor)",
        "route": "PO",
        "formulations": [
            {
                "id": "amoxclav-susp-125",
                "label": "Suspension 125/31.25mg per 5mL",
                "type": "suspension",
                "strength": "125 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 125,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 45,
                "adultFixedDose": null,
                "frequencyPerDay": 3,
                "maxMgPerDay": 1750,
                "minAgeMonths": 2,
                "notes": [
                    "Refrigerate and discard after 10 days",
                    "Q8H dosing typically for this concentration"
                ]
            },
            {
                "id": "amoxclav-susp-200",
                "label": "Suspension 200/28.5mg per 5mL",
                "type": "suspension",
                "strength": "200 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 200,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 45,
                "adultFixedDose": null,
                "frequencyPerDay": 2,
                "maxMgPerDay": 1750,
                "minAgeMonths": 2,
                "notes": [
                    "Refrigerate and discard after 10 days",
                    "Q12H dosing typical for this concentration"
                ]
            },
            {
                "id": "amoxclav-susp-400",
                "label": "Suspension 400/57mg per 5mL",
                "type": "suspension",
                "strength": "400 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 400,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 45,
                "adultFixedDose": null,
                "frequencyPerDay": 2,
                "maxMgPerDay": 1750,
                "minAgeMonths": 2,
                "notes": [
                    "Refrigerate and discard after 10 days"
                ]
            },
            {
                "id": "amoxclav-tab-500",
                "label": "Tablet 500/125mg",
                "type": "tablet",
                "strength": "500 mg",
                "route": "PO",
                "strengthMgPerUnit": 500,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "500 mg every 12 hours or every 8 hours depending on severity",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1750,
                "minAgeMonths": 144,
                "notes": [
                    "Take with meals to enhance absorption and decrease GI upset"
                ]
            },
            {
                "id": "amoxclav-tab-875",
                "label": "Tablet 875/125mg",
                "type": "tablet",
                "strength": "875 mg",
                "route": "PO",
                "strengthMgPerUnit": 875,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "875 mg twice daily",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1750,
                "minAgeMonths": 144,
                "notes": [
                    "Take with meals to enhance absorption and decrease GI upset"
                ]
            },
            {
                "id": "amoxclav-iv-1200",
                "label": "IV Injection 1.2g",
                "type": "infusion",
                "strength": "1200 mg",
                "route": "IV",
                "strengthMgPerUnit": 1200,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "1.2g every 8 hours",
                "frequencyPerDay": 3,
                "maxMgPerDay": 3600,
                "minAgeMonths": null,
                "notes": [
                    "Must be given via slow IV injection"
                ]
            },
            {
                "id": "amoxclav-cap-500",
                "label": "Capsule 500/125mg",
                "type": "capsule",
                "strength": "500 mg / 125 mg",
                "route": "PO",
                "strengthMgPerUnit": 500,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 45,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "875 mg",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1750,
                "minAgeMonths": null,
                "notes": []
            },
            {
                "id": "amoxclav-inj-600",
                "label": "IV Injection 600mg",
                "type": "injection",
                "strength": "600 mg",
                "route": "IV",
                "strengthMgPerUnit": 600,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 45,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "875 mg",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1750,
                "minAgeMonths": null,
                "notes": []
            }
        ],
        "pediatricMgPerKgPerDay": 45,
        "adultDose": "875 mg",
        "frequencyPerDay": 2,
        "maxMgPerDay": 1750,
        "importantNotes": [
            "Calculate dose based on amoxicillin component",
            "May cause diarrhea; consider probiotics",
            "High-dose formulation used for resistant infections."
        ],
        "considerations": [
            "Calculate dose based on amoxicillin component",
            "May cause diarrhea; consider probiotics"
        ]
    },
    "azithromycin": {
        "name": "Azithromycin",
        "drugClass": "Antibiotic (Macrolide)",
        "route": "PO",
        "formulations": [
            {
                "id": "azithro-susp-200",
                "label": "Suspension 200mg/5mL",
                "type": "suspension",
                "strength": "200 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 200,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 10,
                "adultFixedDose": null,
                "frequencyPerDay": 1,
                "maxMgPerDay": 500,
                "minAgeMonths": 6,
                "notes": [
                    "10 mg/kg on day 1, followed by 5 mg/kg on days 2-5 for typical courses"
                ]
            },
            {
                "id": "azithro-tab-500",
                "label": "Tablet 500mg",
                "type": "tablet",
                "strength": "500 mg",
                "route": "PO",
                "strengthMgPerUnit": 500,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "500 mg on day 1, then 250 mg daily for 4 days",
                "frequencyPerDay": 1,
                "maxMgPerDay": 500,
                "minAgeMonths": 144,
                "notes": []
            },
            {
                "id": "azithro-tab-250",
                "label": "Tablet 250mg",
                "type": "tablet",
                "strength": "250 mg",
                "route": "PO",
                "strengthMgPerUnit": 250,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "500 mg on day 1, then 250 mg daily for 4 days",
                "frequencyPerDay": 1,
                "maxMgPerDay": 500,
                "minAgeMonths": 144,
                "notes": []
            },
            {
                "id": "azithro-iv-500",
                "label": "IV Infusion 500mg",
                "type": "infusion",
                "strength": "500 mg",
                "route": "IV",
                "strengthMgPerUnit": 500,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "500 mg daily for 2 days, then convert to oral",
                "frequencyPerDay": 1,
                "maxMgPerDay": 500,
                "minAgeMonths": null,
                "notes": [
                    "Must be reconstituted properly and infused over at least 1 hr"
                ]
            },
            {
                "id": "azithro-cap-250",
                "label": "Capsule 250mg",
                "type": "capsule",
                "strength": "250 mg",
                "route": "PO",
                "strengthMgPerUnit": 250,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 10,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "500 mg",
                "frequencyPerDay": 1,
                "maxMgPerDay": 500,
                "minAgeMonths": null,
                "notes": []
            },
            {
                "id": "azithro-ophth-1",
                "label": "Eye Drops 1%",
                "type": "drops",
                "strength": "1%",
                "route": "Ophthalmic",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 10,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "500 mg",
                "frequencyPerDay": 1,
                "maxMgPerDay": 500,
                "minAgeMonths": null,
                "notes": []
            }
        ],
        "pediatricMgPerKgPerDay": 10,
        "adultDose": "500 mg",
        "frequencyPerDay": 1,
        "maxMgPerDay": 500,
        "importantNotes": [
            "Can be taken with or without food",
            "Usually given as a 3 or 5 day course"
        ],
        "considerations": [
            "Can be taken with or without food",
            "Usually given as a 3 or 5 day course"
        ]
    },
    "cefuroxime": {
        "name": "Cefuroxime",
        "drugClass": "Antibiotic (Cephalosporin)",
        "route": "PO",
        "formulations": [
            {
                "id": "cef-susp-125",
                "label": "Suspension 125mg/5mL",
                "type": "suspension",
                "strength": "125 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 125,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 30,
                "adultFixedDose": null,
                "frequencyPerDay": 2,
                "maxMgPerDay": 1000,
                "minAgeMonths": 3,
                "notes": [
                    "Shake well. Must be taken with food."
                ]
            },
            {
                "id": "cef-tab-250",
                "label": "Tablet 250mg",
                "type": "tablet",
                "strength": "250 mg",
                "route": "PO",
                "strengthMgPerUnit": 250,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "250 mg twice daily",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1000,
                "minAgeMonths": 144,
                "notes": [
                    "Do not crush tablets (strong bitter taste)"
                ]
            },
            {
                "id": "cef-susp-250",
                "label": "Suspension 250mg/5mL",
                "type": "suspension",
                "strength": "250 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 250,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 30,
                "adultFixedDose": null,
                "frequencyPerDay": 2,
                "maxMgPerDay": 1000,
                "minAgeMonths": 3,
                "notes": [
                    "Shake well. Must be taken with food."
                ]
            },
            {
                "id": "cef-tab-500",
                "label": "Tablet 500mg",
                "type": "tablet",
                "strength": "500 mg",
                "route": "PO",
                "strengthMgPerUnit": 500,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "500 mg twice daily",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1000,
                "minAgeMonths": 144,
                "notes": [
                    "Do not crush tablets (strong bitter taste)"
                ]
            },
            {
                "id": "cef-iv-750",
                "label": "IV Injection 750mg",
                "type": "infusion",
                "strength": "750 mg",
                "route": "IV",
                "strengthMgPerUnit": 750,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "750 mg every 8 hours",
                "frequencyPerDay": 3,
                "maxMgPerDay": 6000,
                "minAgeMonths": null,
                "notes": [
                    "Can be given IM or IV"
                ]
            },
            {
                "id": "cef-cap-250",
                "label": "Capsule 250mg",
                "type": "capsule",
                "strength": "250 mg",
                "route": "PO",
                "strengthMgPerUnit": 250,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 30,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "250 mg",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1000,
                "minAgeMonths": null,
                "notes": []
            }
        ],
        "pediatricMgPerKgPerDay": 30,
        "adultDose": "250 mg",
        "frequencyPerDay": 2,
        "maxMgPerDay": 1000,
        "importantNotes": [
            "Take with food to increase absorption",
            "May have a metallic, bitter taste in suspension form"
        ],
        "considerations": [
            "Take with food to increase absorption",
            "May have a metallic, bitter taste in suspension form"
        ]
    },
    "cetirizine": {
        "name": "Cetirizine",
        "drugClass": "Antihistamine",
        "route": "PO",
        "formulations": [
            {
                "id": "cet-syr-5",
                "label": "Syrup 5mg/5mL",
                "type": "suspension",
                "strength": "5 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 5,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 0.25,
                "adultFixedDose": null,
                "frequencyPerDay": 1,
                "maxMgPerDay": 10,
                "minAgeMonths": 6,
                "notes": [
                    "Often dosed as 2.5mg once daily for ages 6-23 months"
                ]
            },
            {
                "id": "cet-tab-10",
                "label": "Tablet 10mg",
                "type": "tablet",
                "strength": "10 mg",
                "route": "PO",
                "strengthMgPerUnit": 10,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "10 mg once daily",
                "frequencyPerDay": 1,
                "maxMgPerDay": 10,
                "minAgeMonths": 72,
                "notes": []
            },
            {
                "id": "cet-drops-10",
                "label": "Oral Drops 10mg/mL",
                "type": "drops",
                "strength": "50 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 50,
                "unitVolumeMl": 1,
                "pediatricMgPerKgPerDay": 0.25,
                "adultFixedDose": null,
                "frequencyPerDay": 1,
                "maxMgPerDay": 10,
                "minAgeMonths": 6,
                "notes": [
                    "Often dosed as 2.5mg (0.25mL) once daily for ages 6-23 months"
                ]
            },
            {
                "id": "cet-cap-10",
                "label": "Capsule 10mg",
                "type": "capsule",
                "strength": "10 mg",
                "route": "PO",
                "strengthMgPerUnit": 10,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 0.25,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "10 mg",
                "frequencyPerDay": 1,
                "maxMgPerDay": 10,
                "minAgeMonths": null,
                "notes": []
            }
        ],
        "pediatricMgPerKgPerDay": 0.25,
        "adultDose": "10 mg",
        "frequencyPerDay": 1,
        "maxMgPerDay": 10,
        "importantNotes": [
            "May cause drowsiness in some patients",
            "Can be taken with or without food"
        ],
        "considerations": [
            "May cause drowsiness in some patients",
            "Can be taken with or without food"
        ]
    },
    "loratadine": {
        "name": "Loratadine",
        "drugClass": "Antihistamine",
        "route": "PO",
        "formulations": [
            {
                "id": "lor-syr-5",
                "label": "Syrup 5mg/5mL",
                "type": "suspension",
                "strength": "5 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 5,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 0.2,
                "adultFixedDose": null,
                "frequencyPerDay": 1,
                "maxMgPerDay": 10,
                "minAgeMonths": 24,
                "notes": [
                    "Usually dosed as 5mg flat for 2-5 years or <30kg"
                ]
            },
            {
                "id": "lor-tab-10",
                "label": "Tablet 10mg",
                "type": "tablet",
                "strength": "10 mg",
                "route": "PO",
                "strengthMgPerUnit": 10,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "10 mg once daily",
                "frequencyPerDay": 1,
                "maxMgPerDay": 10,
                "minAgeMonths": 72,
                "notes": []
            },
            {
                "id": "lor-tab-5",
                "label": "Tablet 5mg",
                "type": "tablet",
                "strength": "5 mg",
                "route": "PO",
                "strengthMgPerUnit": 5,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": null,
                "frequencyPerDay": 1,
                "maxMgPerDay": 10,
                "minAgeMonths": 24,
                "notes": []
            },
            {
                "id": "lor-cap-10",
                "label": "Capsule 10mg",
                "type": "capsule",
                "strength": "10 mg",
                "route": "PO",
                "strengthMgPerUnit": 10,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 0.2,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "10 mg",
                "frequencyPerDay": 1,
                "maxMgPerDay": 10,
                "minAgeMonths": null,
                "notes": []
            }
        ],
        "pediatricMgPerKgPerDay": 0.2,
        "adultDose": "10 mg",
        "frequencyPerDay": 1,
        "maxMgPerDay": 10,
        "importantNotes": [
            "Non-sedating antihistamine",
            "Can be taken with or without food"
        ],
        "considerations": [
            "Non-sedating antihistamine",
            "Can be taken with or without food"
        ]
    },
    "fexofenadine": {
        "name": "Fexofenadine",
        "drugClass": "Antihistamine",
        "route": "PO",
        "formulations": [
            {
                "id": "fex-susp-30",
                "label": "Suspension 30mg/5mL",
                "type": "suspension",
                "strength": "30 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 30,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 4,
                "adultFixedDose": null,
                "frequencyPerDay": 2,
                "maxMgPerDay": 60,
                "minAgeMonths": 6,
                "notes": [
                    "Take with water, not juice",
                    "Usually 15mg BID for 6-23 mo, 30mg BID for 2-11 yr"
                ]
            },
            {
                "id": "fex-tab-180",
                "label": "Tablet 180mg",
                "type": "tablet",
                "strength": "180 mg",
                "route": "PO",
                "strengthMgPerUnit": 180,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "180 mg once daily",
                "frequencyPerDay": 1,
                "maxMgPerDay": 180,
                "minAgeMonths": 144,
                "notes": [
                    "Do not take with fruit juices"
                ]
            },
            {
                "id": "fex-tab-30",
                "label": "Tablet 30mg",
                "type": "tablet",
                "strength": "30 mg",
                "route": "PO",
                "strengthMgPerUnit": 30,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": null,
                "frequencyPerDay": 2,
                "maxMgPerDay": 60,
                "minAgeMonths": 72,
                "notes": [
                    "Do not take with fruit juices"
                ]
            },
            {
                "id": "fex-tab-120",
                "label": "Tablet 120mg",
                "type": "tablet",
                "strength": "120 mg",
                "route": "PO",
                "strengthMgPerUnit": 120,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "120 mg once daily",
                "frequencyPerDay": 1,
                "maxMgPerDay": 180,
                "minAgeMonths": 144,
                "notes": [
                    "Do not take with fruit juices"
                ]
            },
            {
                "id": "fex-cap-60",
                "label": "Capsule 60mg",
                "type": "capsule",
                "strength": "60 mg",
                "route": "PO",
                "strengthMgPerUnit": 60,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 4,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "180 mg",
                "frequencyPerDay": 1,
                "maxMgPerDay": 180,
                "minAgeMonths": null,
                "notes": []
            }
        ],
        "pediatricMgPerKgPerDay": 4,
        "adultDose": "180 mg",
        "frequencyPerDay": 1,
        "maxMgPerDay": 180,
        "importantNotes": [
            "Do not take with fruit juices (e.g., apple, orange, grapefruit) as they reduce absorption",
            "Non-sedating"
        ],
        "considerations": [
            "Do not take with fruit juices (e.g., apple, orange, grapefruit) as they reduce absorption",
            "Non-sedating"
        ]
    },
    "mometasone": {
        "name": "Mometasone",
        "drugClass": "Corticosteroid",
        "route": "Intranasal",
        "formulations": [
            {
                "id": "mom-spray-50",
                "label": "Nasal Spray 50mcg/actuation",
                "type": "spray",
                "strength": "0.05 mg",
                "route": "Intranasal",
                "strengthMgPerUnit": 0.05,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "2 sprays in each nostril once daily",
                "frequencyPerDay": 1,
                "maxMgPerDay": null,
                "minAgeMonths": 24,
                "notes": [
                    "Pediatric dose is usually 1 spray per nostril daily for ages 2-11"
                ]
            }
        ],
        "pediatricMgPerKgPerDay": null,
        "adultDose": "100 mcg per nostril",
        "frequencyPerDay": 1,
        "maxMgPerDay": null,
        "importantNotes": [
            "Clear nasal passages before use",
            "Aim away from nasal septum"
        ],
        "considerations": [
            "Clear nasal passages before use",
            "Aim away from nasal septum"
        ]
    },
    "fluticasone": {
        "name": "Fluticasone",
        "drugClass": "Corticosteroid",
        "route": "Intranasal",
        "formulations": [
            {
                "id": "flut-spray-50",
                "label": "Nasal Spray 50mcg/actuation",
                "type": "spray",
                "strength": "0.05 mg",
                "route": "Intranasal",
                "strengthMgPerUnit": 0.05,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "2 sprays in each nostril once daily",
                "frequencyPerDay": 1,
                "maxMgPerDay": null,
                "minAgeMonths": 48,
                "notes": [
                    "Pediatric dose is typically 1 spray per nostril daily for children 4-11 years"
                ]
            }
        ],
        "pediatricMgPerKgPerDay": null,
        "adultDose": "100 mcg per nostril",
        "frequencyPerDay": 1,
        "maxMgPerDay": null,
        "importantNotes": [
            "May take several days to achieve maximum benefit",
            "Prime the pump before first use or after periods of non-use"
        ],
        "considerations": [
            "May take several days to achieve maximum benefit",
            "Prime the pump before first use or after periods of non-use"
        ]
    },
    "oxymetazoline": {
        "name": "Oxymetazoline",
        "drugClass": "Decongestant",
        "route": "Intranasal",
        "formulations": [
            {
                "id": "oxy-spray-005",
                "label": "Nasal Spray 0.05%",
                "type": "spray",
                "strength": "0.05%",
                "route": "Intranasal",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "2 to 3 sprays or drops in each nostril every 10 to 12 hours",
                "frequencyPerDay": 2,
                "maxMgPerDay": null,
                "minAgeMonths": 72,
                "notes": [
                    "Maximum 2 doses in any 24-hour period",
                    "Not recommended for children under 6 years without medical advice"
                ]
            }
        ],
        "pediatricMgPerKgPerDay": null,
        "adultDose": "2 to 3 sprays per nostril",
        "frequencyPerDay": 2,
        "maxMgPerDay": null,
        "importantNotes": [
            "Do not use for more than 3 consecutive days to prevent rebound congestion"
        ],
        "considerations": [
            "Do not use for more than 3 consecutive days to prevent rebound congestion"
        ]
    },
    "ciprofloxacin": {
        "name": "Ciprofloxacin",
        "drugClass": "Antibiotic (Fluoroquinolone)",
        "route": "PO / IV / Otic / Ophthalmic",
        "formulations": [
            {
                "id": "cipro-susp-250",
                "label": "Suspension 250mg/5mL",
                "type": "suspension",
                "strength": "250 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 250,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 20,
                "adultFixedDose": null,
                "frequencyPerDay": 2,
                "maxMgPerDay": 1500,
                "minAgeMonths": 12,
                "notes": [
                    "Shake vigorously for 15 seconds each time before use",
                    "Do not chew the microcapsules in the suspension"
                ]
            },
            {
                "id": "cipro-tab-250",
                "label": "Tablet 250mg",
                "type": "tablet",
                "strength": "250 mg",
                "route": "PO",
                "strengthMgPerUnit": 250,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "250 mg twice daily",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1500,
                "minAgeMonths": 216,
                "notes": [
                    "Swallow whole. Do not crush, split, or chew"
                ]
            },
            {
                "id": "cipro-tab-500",
                "label": "Tablet 500mg",
                "type": "tablet",
                "strength": "500 mg",
                "route": "PO",
                "strengthMgPerUnit": 500,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "500 mg twice daily",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1500,
                "minAgeMonths": 216,
                "notes": [
                    "Swallow whole. Do not crush, split, or chew"
                ]
            },
            {
                "id": "cipro-tab-750",
                "label": "Tablet 750mg",
                "type": "tablet",
                "strength": "750 mg",
                "route": "PO",
                "strengthMgPerUnit": 750,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "750 mg twice daily",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1500,
                "minAgeMonths": 216,
                "notes": [
                    "Swallow whole. Do not crush, split, or chew"
                ]
            },
            {
                "id": "cipro-iv-200",
                "label": "IV Infusion 200mg/100mL",
                "type": "infusion",
                "strength": "200 mg",
                "route": "IV",
                "strengthMgPerUnit": 200,
                "strengthMgPer5ml": null,
                "unitVolumeMl": 100,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "200 mg every 12 hours",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1200,
                "minAgeMonths": null,
                "notes": [
                    "Administer over 60 minutes"
                ]
            },
            {
                "id": "cipro-iv-400",
                "label": "IV Infusion 400mg/200mL",
                "type": "infusion",
                "strength": "400 mg",
                "route": "IV",
                "strengthMgPerUnit": 400,
                "strengthMgPer5ml": null,
                "unitVolumeMl": 200,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "400 mg every 12 hours",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1200,
                "minAgeMonths": null,
                "notes": [
                    "Administer over 60 minutes"
                ]
            },
            {
                "id": "cipro-otic-03",
                "label": "Ear Drops 0.3%",
                "type": "drops",
                "strength": "0.3%",
                "route": "Otic",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "Apply contents of 1 single-use vial (or 4 drops) into affected ear twice daily",
                "frequencyPerDay": 2,
                "maxMgPerDay": null,
                "minAgeMonths": 6,
                "notes": [
                    "Avoid touching the dropper tip to the ear to prevent contamination"
                ]
            },
            {
                "id": "cipro-ophth-03",
                "label": "Eye Drops 0.3%",
                "type": "drops",
                "strength": "0.3%",
                "route": "Ophthalmic",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "1-2 drops in the affected eye(s) every 2 hours while awake for 2 days, then every 4 hours while awake",
                "frequencyPerDay": 6,
                "maxMgPerDay": null,
                "minAgeMonths": 12,
                "notes": [
                    "Avoid touching the dropper tip to the eye"
                ]
            },
            {
                "id": "cipro-cap-250",
                "label": "Capsule 250mg",
                "type": "capsule",
                "strength": "250 mg",
                "route": "PO",
                "strengthMgPerUnit": 250,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 20,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "500 mg",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1500,
                "minAgeMonths": null,
                "notes": []
            },
            {
                "id": "cipro-inj-400",
                "label": "IV Injection 400mg",
                "type": "injection",
                "strength": "400 mg",
                "route": "IV",
                "strengthMgPerUnit": 400,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 20,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "500 mg",
                "frequencyPerDay": 2,
                "maxMgPerDay": 1500,
                "minAgeMonths": null,
                "notes": []
            }
        ],
        "pediatricMgPerKgPerDay": 20,
        "adultDose": "500 mg",
        "frequencyPerDay": 2,
        "maxMgPerDay": 1500,
        "importantNotes": [
            "Not recommended as first-line in pediatrics due to joint/cartilage concerns",
            "Do not take PO with dairy products or calcium-fortified juices alone",
            "Administer PO 2 hours before or 6 hours after antacids, iron, or zinc"
        ],
        "considerations": [
            "Not recommended as first-line in pediatrics due to joint/cartilage concerns",
            "Do not take PO with dairy products or calcium-fortified juices alone"
        ]
    },
    "acetic-acid-otic": {
        "name": "Acetic Acid",
        "drugClass": "Antibacterial/Antifungal",
        "route": "Otic",
        "formulations": [
            {
                "id": "acetic-drops-2",
                "label": "Ear Drops 2%",
                "type": "drops",
                "strength": "2%",
                "route": "Otic",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "5 drops (adults) or 3-4 drops (children) in affected ear 3-4 times daily",
                "frequencyPerDay": 3,
                "maxMgPerDay": null,
                "minAgeMonths": 36,
                "notes": [
                    "Keep the head tilted for about 2 minutes after instilling drops"
                ]
            }
        ],
        "pediatricMgPerKgPerDay": null,
        "adultDose": "5 drops",
        "frequencyPerDay": 3,
        "maxMgPerDay": null,
        "importantNotes": [
            "Instill into the ear canal 3 to 4 times daily",
            "Use a cotton wick for the first 24 hours if necessary to ensure contact"
        ],
        "considerations": [
            "Instill into the ear canal 3 to 4 times daily",
            "Use a cotton wick for the first 24 hours if necessary to ensure contact"
        ]
    },
    "clotrimazole-otic": {
        "name": "Clotrimazole",
        "drugClass": "Antifungal",
        "route": "Otic",
        "formulations": [
            {
                "id": "clotrimazole-drops-1",
                "label": "Ear Drops 1%",
                "type": "drops",
                "strength": "1%",
                "route": "Otic",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "adultFixedDose": "4 to 5 drops in affected ear 2-3 times daily",
                "frequencyPerDay": 3,
                "maxMgPerDay": null,
                "minAgeMonths": 24,
                "notes": [
                    "Often used for fungal ear infections (otomycosis)"
                ]
            }
        ],
        "pediatricMgPerKgPerDay": null,
        "adultDose": "4-5 drops",
        "frequencyPerDay": 3,
        "maxMgPerDay": null,
        "importantNotes": [
            "Clean and dry the ear canal thoroughly before applying",
            "Complete the full course even if symptoms disappear quickly"
        ],
        "considerations": [
            "Clean and dry the ear canal thoroughly before applying",
            "Complete the full course even if symptoms disappear quickly"
        ]
    },
    "prednisolone": {
        "name": "Prednisolone",
        "drugClass": "Corticosteroid",
        "route": "PO",
        "formulations": [
            {
                "id": "pred-susp-15",
                "label": "Solution 15mg/5mL",
                "type": "suspension",
                "strength": "15 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 15,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 1,
                "pediatricMgPerKgPerDose": 1,
                "adultFixedDose": null,
                "frequencyPerDay": 1,
                "maxMgPerDay": 60,
                "minAgeMonths": null,
                "notes": [
                    "Often prescribed for 3-5 days for acute asthma exacerbations"
                ]
            },
            {
                "id": "pred-tab-5",
                "label": "Tablet 5mg",
                "type": "tablet",
                "strength": "5 mg",
                "route": "PO",
                "strengthMgPerUnit": 5,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "40 mg once daily",
                "frequencyPerDay": 1,
                "maxMgPerDay": 60,
                "minAgeMonths": null,
                "notes": []
            },
            {
                "id": "pred-tab-25",
                "label": "Tablet 25mg",
                "type": "tablet",
                "strength": "25 mg",
                "route": "PO",
                "strengthMgPerUnit": 25,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": null,
                "frequencyPerDay": 1,
                "maxMgPerDay": 60,
                "minAgeMonths": null,
                "notes": []
            },
            {
                "id": "pred-syr-5",
                "label": "Solution 5mg/5mL",
                "type": "suspension",
                "strength": "5 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 5,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 1,
                "pediatricMgPerKgPerDose": 1,
                "adultFixedDose": null,
                "frequencyPerDay": 1,
                "maxMgPerDay": 60,
                "minAgeMonths": null,
                "notes": []
            },
            {
                "id": "pred-cap-5",
                "label": "Capsule 5mg",
                "type": "capsule",
                "strength": "5 mg",
                "route": "PO",
                "strengthMgPerUnit": 5,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 1,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "40 mg",
                "frequencyPerDay": 1,
                "maxMgPerDay": 60,
                "minAgeMonths": null,
                "notes": []
            },
            {
                "id": "pred-ophth-1",
                "label": "Eye Drops 1%",
                "type": "drops",
                "strength": "1%",
                "route": "Ophthalmic",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 1,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "40 mg",
                "frequencyPerDay": 1,
                "maxMgPerDay": 60,
                "minAgeMonths": null,
                "notes": []
            }
        ],
        "pediatricMgPerKgPerDay": 1,
        "adultDose": "40 mg",
        "frequencyPerDay": 1,
        "maxMgPerDay": 60,
        "importantNotes": [
            "Administer with food or milk to decrease GI upset",
            "Give in the morning to mimic natural cortisol production and prevent insomnia"
        ],
        "pediatricMgPerKgPerDose": 1,
        "considerations": [
            "Administer with food or milk to decrease GI upset",
            "Give in the morning to mimic natural cortisol production and prevent insomnia"
        ]
    },
    "dexamethasone": {
        "name": "Dexamethasone",
        "drugClass": "Corticosteroid",
        "route": "PO",
        "formulations": [
            {
                "id": "dex-susp-2",
                "label": "Elixir/Solution 0.5mg/5mL",
                "type": "suspension",
                "strength": "0.5 mg / 5 mL",
                "route": "PO",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": 0.5,
                "unitVolumeMl": 5,
                "pediatricMgPerKgPerDay": 0.6,
                "pediatricMgPerKgPerDose": 0.6,
                "adultFixedDose": null,
                "frequencyPerDay": 1,
                "maxMgPerDay": 16,
                "minAgeMonths": null,
                "notes": [
                    "Often given as a stat dose for croup (0.15 - 0.6 mg/kg)"
                ]
            },
            {
                "id": "dex-tab-4",
                "label": "Tablet 4mg",
                "type": "tablet",
                "strength": "4 mg",
                "route": "PO",
                "strengthMgPerUnit": 4,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": null,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "6 mg once daily",
                "frequencyPerDay": 1,
                "maxMgPerDay": 16,
                "minAgeMonths": null,
                "notes": []
            },
            {
                "id": "dex-inj-4",
                "label": "Injection 4mg/mL",
                "type": "infusion",
                "strength": "4 mg",
                "route": "IV",
                "strengthMgPerUnit": 4,
                "strengthMgPer5ml": null,
                "unitVolumeMl": 1,
                "pediatricMgPerKgPerDay": 0.6,
                "pediatricMgPerKgPerDose": 0.6,
                "adultFixedDose": "6 mg once daily",
                "frequencyPerDay": 1,
                "maxMgPerDay": 16,
                "minAgeMonths": null,
                "notes": [
                    "Given IV or IM"
                ]
            },
            {
                "id": "dex-ophth-0.1",
                "label": "Eye Drops 0.1%",
                "type": "drops",
                "strength": "0.1%",
                "route": "Ophthalmic",
                "strengthMgPerUnit": null,
                "strengthMgPer5ml": null,
                "unitVolumeMl": null,
                "pediatricMgPerKgPerDay": 0.6,
                "pediatricMgPerKgPerDose": null,
                "adultFixedDose": "6 mg",
                "frequencyPerDay": 1,
                "maxMgPerDay": 16,
                "minAgeMonths": null,
                "notes": []
            }
        ],
        "pediatricMgPerKgPerDay": 0.6,
        "adultDose": "6 mg",
        "frequencyPerDay": 1,
        "maxMgPerDay": 16,
        "importantNotes": [
            "Administer with food or milk to decrease GI upset",
            "Long-acting steroid"
        ],
        "pediatricMgPerKgPerDose": 0.6,
        "considerations": [
            "Administer with food or milk to decrease GI upset",
            "Long-acting steroid"
        ]
    }
};
