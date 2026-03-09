export interface Diagnosis {
    name: string;
    firstLine: string[];
    secondLine: string[];
    alternatives: string[];
}

export const diagnoses: Record<string, Diagnosis> = {
    acute_otitis_media: {
        name: "Acute Otitis Media",
        firstLine: ["amoxicillin"],
        secondLine: ["amoxicillin-clavulanate"],
        alternatives: ["azithromycin", "cefuroxime"],
    },
    acute_sinusitis: {
        name: "Acute Sinusitis",
        firstLine: ["amoxicillin"],
        secondLine: ["amoxicillin-clavulanate"],
        alternatives: ["cefuroxime", "azithromycin"],
    },
    otitis_externa: {
        name: "Otitis Externa",
        firstLine: ["ciprofloxacin"],
        secondLine: ["acetic-acid-otic"],
        alternatives: ["clotrimazole-otic"],
    },
    allergic_rhinitis: {
        name: "Allergic Rhinitis",
        firstLine: ["cetirizine", "loratadine"],
        secondLine: ["mometasone", "fluticasone"],
        alternatives: ["fexofenadine", "oxymetazoline"],
    },
    tonsillitis: {
        name: "Tonsillitis",
        firstLine: ["amoxicillin"],
        secondLine: ["cefuroxime"],
        alternatives: ["azithromycin"],
    },
};
