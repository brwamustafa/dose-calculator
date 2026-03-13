export type DrugCatalogEntry = {
  name: string;
  drugClass: string;
  route: string;
};

export const drugCatalog: Record<string, DrugCatalogEntry> = {
  "amoxicillin": {
    name: "Amoxicillin",
    drugClass: "Antibiotic (Penicillin)",
    route: "PO",
  },
  "paracetamol": {
    name: "Paracetamol",
    drugClass: "Analgesic / Antipyretic",
    route: "PO",
  },
  "ibuprofen": {
    name: "Ibuprofen",
    drugClass: "NSAID",
    route: "PO",
  },
  "amoxicillin-clavulanate": {
    name: "Amoxicillin-clavulanate",
    drugClass: "Antibiotic (Beta-lactam + inhibitor)",
    route: "PO",
  },
  "azithromycin": {
    name: "Azithromycin",
    drugClass: "Antibiotic (Macrolide)",
    route: "PO",
  },
  "cefuroxime": {
    name: "Cefuroxime",
    drugClass: "Antibiotic (Cephalosporin)",
    route: "PO",
  },
  "cetirizine": {
    name: "Cetirizine",
    drugClass: "Antihistamine",
    route: "PO",
  },
  "loratadine": {
    name: "Loratadine",
    drugClass: "Antihistamine",
    route: "PO",
  },
  "fexofenadine": {
    name: "Fexofenadine",
    drugClass: "Antihistamine",
    route: "PO",
  },
  "mometasone": {
    name: "Mometasone",
    drugClass: "Corticosteroid",
    route: "Intranasal",
  },
  "fluticasone": {
    name: "Fluticasone",
    drugClass: "Corticosteroid",
    route: "Intranasal",
  },
  "oxymetazoline": {
    name: "Oxymetazoline",
    drugClass: "Decongestant",
    route: "Intranasal",
  },
  "ciprofloxacin": {
    name: "Ciprofloxacin",
    drugClass: "Antibiotic (Fluoroquinolone)",
    route: "PO / IV / Otic / Ophthalmic",
  },
  "acetic-acid-otic": {
    name: "Acetic Acid",
    drugClass: "Antibacterial/Antifungal",
    route: "Otic",
  },
  "clotrimazole-otic": {
    name: "Clotrimazole",
    drugClass: "Antifungal",
    route: "Otic",
  },
  "prednisolone": {
    name: "Prednisolone",
    drugClass: "Corticosteroid",
    route: "PO",
  },
  "dexamethasone": {
    name: "Dexamethasone",
    drugClass: "Corticosteroid",
    route: "PO",
  },
};

