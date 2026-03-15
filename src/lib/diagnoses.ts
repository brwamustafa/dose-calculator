export interface BundleItem {
  role: string;
  drug: string;
}

export interface TreatmentBundle {
  line: string;
  items: BundleItem[];
}

export interface Diagnosis {
  name: string;
  /** @deprecated Use `bundles` instead */
  recommendedBundle?: BundleItem[];
  bundles: TreatmentBundle[];
}

export const diagnoses: Record<string, Diagnosis> = {
  acute_otitis_media: {
    name: "Acute Otitis Media",
    bundles: [
      {
        line: "First line",
        items: [
          { role: "Antibiotic", drug: "amoxicillin" },
          { role: "Analgesic", drug: "paracetamol" },
        ],
      },
      {
        line: "Second line",
        items: [
          { role: "Antibiotic", drug: "amoxicillin-clavulanate" },
          { role: "Analgesic", drug: "paracetamol" },
        ],
      },
      {
        line: "Alternative",
        items: [
          { role: "Antibiotic", drug: "azithromycin" },
          { role: "Analgesic", drug: "ibuprofen" },
          { role: "Adjunct", drug: "mometasone" },
        ],
      },
    ],
  },
  acute_sinusitis: {
    name: "Acute Sinusitis",
    bundles: [
      {
        line: "First line",
        items: [
          { role: "Antibiotic", drug: "amoxicillin" },
          { role: "Analgesic", drug: "paracetamol" },
          { role: "Decongestant", drug: "oxymetazoline" },
        ],
      },
      {
        line: "Second line",
        items: [
          { role: "Antibiotic", drug: "amoxicillin-clavulanate" },
          { role: "Analgesic", drug: "ibuprofen" },
          { role: "Decongestant", drug: "oxymetazoline" },
        ],
      },
      {
        line: "Alternative",
        items: [
          { role: "Antibiotic", drug: "azithromycin" },
          { role: "Steroid", drug: "mometasone" },
        ],
      },
    ],
  },
  otitis_externa: {
    name: "Otitis Externa",
    bundles: [
      {
        line: "First line",
        items: [
          { role: "Antibiotic", drug: "ciprofloxacin" },
          { role: "Antiseptic", drug: "acetic-acid-otic" },
        ],
      },
      {
        line: "Alternative",
        items: [
          { role: "Antibiotic", drug: "ciprofloxacin" },
          { role: "Analgesic", drug: "paracetamol" },
        ],
      },
    ],
  },
  allergic_rhinitis: {
    name: "Allergic Rhinitis",
    bundles: [
      {
        line: "First line",
        items: [
          { role: "Antihistamine", drug: "cetirizine" },
          { role: "Steroid", drug: "mometasone" },
        ],
      },
      {
        line: "Second line",
        items: [
          { role: "Antihistamine", drug: "cetirizine" },
          { role: "Steroid", drug: "mometasone" },
          { role: "Decongestant", drug: "oxymetazoline" },
        ],
      },
    ],
  },
  tonsillitis: {
    name: "Tonsillitis",
    bundles: [
      {
        line: "First line",
        items: [
          { role: "Antibiotic", drug: "amoxicillin" },
          { role: "Analgesic", drug: "paracetamol" },
        ],
      },
      {
        line: "Second line",
        items: [
          { role: "Antibiotic", drug: "amoxicillin-clavulanate" },
          { role: "Analgesic", drug: "paracetamol" },
          { role: "Anti-inflammatory", drug: "ibuprofen" },
        ],
      },
      {
        line: "Alternative",
        items: [
          { role: "Antibiotic", drug: "azithromycin" },
          { role: "Analgesic", drug: "ibuprofen" },
        ],
      },
    ],
  },
};
