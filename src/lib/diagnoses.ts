export interface Diagnosis {
    name: string;
    recommendedBundle: Array<{
        role: string;
        drug: string;
    }>;
}

export const diagnoses: Record<string, Diagnosis> = {
    acute_otitis_media: {
        name: "Acute Otitis Media",
        recommendedBundle: [
            { role: "Antibiotic", drug: "amoxicillin" },
            { role: "Analgesic", drug: "paracetamol" },
            { role: "Adjunct", drug: "mometasone" }
        ]
    },
    acute_sinusitis: {
        name: "Acute Sinusitis",
        recommendedBundle: [
            { role: "Antibiotic", drug: "amoxicillin" },
            { role: "Analgesic", drug: "paracetamol" },
            { role: "Decongestant", drug: "oxymetazoline" }
        ]
    },
    otitis_externa: {
        name: "Otitis Externa",
        recommendedBundle: [
            { role: "Antibiotic", drug: "ciprofloxacin" },
            { role: "Antiseptic", drug: "acetic-acid-otic" }
        ]
    },
    allergic_rhinitis: {
        name: "Allergic Rhinitis",
        recommendedBundle: [
            { role: "Antihistamine", drug: "cetirizine" },
            { role: "Steroid", drug: "mometasone" },
            { role: "Decongestant", drug: "oxymetazoline" }
        ]
    },
    tonsillitis: {
        name: "Tonsillitis",
        recommendedBundle: [
            { role: "Antibiotic", drug: "amoxicillin" },
            { role: "Analgesic", drug: "paracetamol" },
            { role: "Anti-inflammatory", drug: "ibuprofen" }
        ]
    },
};
