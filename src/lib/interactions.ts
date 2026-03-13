import { drugs } from "./drugs";
import type { PrescriptionItem } from "./prescriptionEngine";

const KNOWN_INTERACTIONS: Record<string, Record<string, string>> = {
  cetirizine: {
    loratadine: "Duplicate antihistamine therapy; increased sedation/dryness risk.",
    fexofenadine: "Duplicate antihistamine therapy; increased side effects risk.",
  },
  loratadine: {
    cetirizine: "Duplicate antihistamine therapy; increased sedation/dryness risk.",
    fexofenadine: "Duplicate antihistamine therapy; increased side effects risk.",
  },
  fexofenadine: {
    cetirizine: "Duplicate antihistamine therapy; increased side effects risk.",
    loratadine: "Duplicate antihistamine therapy; increased side effects risk.",
  },
  fluticasone: {
    mometasone: "Duplicate intranasal corticosteroids; increased local steroid adverse effects.",
  },
  mometasone: {
    fluticasone: "Duplicate intranasal corticosteroids; increased local steroid adverse effects.",
  },
  amoxicillin: {
    "amoxicillin-clavulanate":
      "Duplicate penicillin antibiotic coverage; increased adverse effects risk.",
  },
  "amoxicillin-clavulanate": {
    amoxicillin: "Duplicate penicillin antibiotic coverage; increased adverse effects risk.",
  },
};

export function checkInteractions(prescription: PrescriptionItem[]): string[] {
  if (!prescription || prescription.length < 2) return [];

  const warnings: string[] = [];

  for (let i = 0; i < prescription.length; i++) {
    for (let j = i + 1; j < prescription.length; j++) {
      const a = prescription[i].drugKey;
      const b = prescription[j].drugKey;

      const msg = KNOWN_INTERACTIONS[a]?.[b] ?? KNOWN_INTERACTIONS[b]?.[a] ?? null;
      if (!msg) continue;

      const aName = drugs[a]?.name ?? a;
      const bName = drugs[b]?.name ?? b;
      warnings.push(`${aName} + ${bName}: ${msg}`);
    }
  }

  return warnings;
}
