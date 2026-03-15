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

export interface InteractionWarning {
  /** "rx"      = prescription ↔ prescription
   *  "chronic" = involves a chronic (background) medication */
  type: "rx" | "chronic";
  drugA: string;
  drugB: string;
  nameA: string;
  nameB: string;
  message: string;
}

export function checkInteractions(
  prescription: PrescriptionItem[],
  chronicMedications: string[] = []
): InteractionWarning[] {
  const warnings: InteractionWarning[] = [];
  // Deduplicate by sorted pair key
  const seen = new Set<string>();

  const addWarning = (
    type: "rx" | "chronic",
    keyA: string,
    keyB: string,
    msg: string
  ) => {
    const pairKey = [keyA, keyB].sort().join("||");
    if (seen.has(pairKey)) return;
    seen.add(pairKey);
    warnings.push({
      type,
      drugA: keyA,
      drugB: keyB,
      nameA: drugs[keyA]?.name ?? keyA,
      nameB: drugs[keyB]?.name ?? keyB,
      message: msg,
    });
  };

  // 1. Prescription ↔ Prescription
  for (let i = 0; i < prescription.length; i++) {
    for (let j = i + 1; j < prescription.length; j++) {
      const a = prescription[i].drugKey;
      const b = prescription[j].drugKey;
      const msg = KNOWN_INTERACTIONS[a]?.[b] ?? KNOWN_INTERACTIONS[b]?.[a] ?? null;
      if (msg) addWarning("rx", a, b, msg);
    }
  }

  // 2. Prescription ↔ Chronic
  for (const chronicKey of chronicMedications) {
    for (const rxItem of prescription) {
      const rxKey = rxItem.drugKey;
      if (chronicKey === rxKey) continue;
      const msg =
        KNOWN_INTERACTIONS[chronicKey]?.[rxKey] ??
        KNOWN_INTERACTIONS[rxKey]?.[chronicKey] ??
        null;
      if (msg) addWarning("chronic", chronicKey, rxKey, msg);
    }
  }

  // 3. Chronic ↔ Chronic
  for (let i = 0; i < chronicMedications.length; i++) {
    for (let j = i + 1; j < chronicMedications.length; j++) {
      const a = chronicMedications[i];
      const b = chronicMedications[j];
      if (a === b) continue;
      const msg = KNOWN_INTERACTIONS[a]?.[b] ?? KNOWN_INTERACTIONS[b]?.[a] ?? null;
      if (msg) addWarning("chronic", a, b, msg);
    }
  }

  return warnings;
}
