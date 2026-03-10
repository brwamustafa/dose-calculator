"use client";

import { useState, useCallback, useMemo } from "react";
import { drugs } from "@/lib/drugs";
import { diagnoses } from "@/lib/diagnoses";
import { calculateDose, DoseResult } from "@/lib/calculateDose";
import SearchableSelect from "@/components/SearchableSelect";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PrescriptionItem {
  id: string;
  result: DoseResult;
  drugKey: string;
  formulationLabel: string;
  durationDays: number | null;
}

type ModalErrors = {
  age?: string;
  weight?: string;
  duration?: string;
  topLevel?: string;
  medication?: string;
  formulation?: string;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const TYPE_ORDER = ["tablet", "capsule", "suspension", "drops", "spray", "infusion", "injection"];
const TYPE_LABEL: Record<string, string> = {
  tablet: "Tablet",
  capsule: "Capsule",
  suspension: "Oral Suspension / Syrup",
  drops: "Drops",
  spray: "Nasal Spray",
  infusion: "IV Infusion",
  injection: "Injection",
};

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
    "amoxicillin-clavulanate": "Duplicate penicillin antibiotic coverage; increased adverse effects risk.",
  },
  "amoxicillin-clavulanate": {
    amoxicillin: "Duplicate penicillin antibiotic coverage; increased adverse effects risk.",
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function groupFormulations(formulations: typeof drugs[string]["formulations"]) {
  const groups = new Map<string, typeof formulations>();
  for (const f of formulations) {
    const t = f.type ?? "other";
    if (!groups.has(t)) groups.set(t, []);
    groups.get(t)!.push(f);
  }
  const orderedTypes = [
    ...TYPE_ORDER.filter((t) => groups.has(t)),
    ...[...groups.keys()].filter((t) => !TYPE_ORDER.includes(t)),
  ];
  return { groups, orderedTypes };
}

function FormulationSelect({
  drugKey,
  value,
  onChange,
  hasError,
  id = "formulation",
}: {
  drugKey: string;
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
  id?: string;
}) {
  const drug = drugs[drugKey];
  if (!drug?.formulations?.length) return null;
  const { groups, orderedTypes } = groupFormulations(drug.formulations);
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-2.5 bg-white border ${hasError
        ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
        : "border-slate-300 focus:ring-blue-500/20 focus:border-blue-500"
        } rounded-lg text-slate-900 focus:ring-2 outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat`}
    >
      {orderedTypes.map((type) => (
        <optgroup
          key={type}
          label={TYPE_LABEL[type] ?? type.charAt(0).toUpperCase() + type.slice(1)}
        >
          {groups.get(type)!.map((f) => (
            <option key={f.id ?? f.label} value={f.label}>
              {f.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

// ── Prescription Item Card ────────────────────────────────────────────────────

function PrescriptionCard({
  item,
  onEdit,
  onRemove,
}: {
  item: PrescriptionItem;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const r = item.result;
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-2 group relative">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-slate-800 text-sm leading-tight">{r.drugName}</p>
          <p className="text-xs text-slate-500 mt-0.5">{r.formulationLabel}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={onEdit}
            className="text-xs px-2.5 py-1 rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 font-medium transition-colors"
            aria-label="Edit medication"
          >
            Edit
          </button>
          <button
            onClick={onRemove}
            className="text-xs px-2.5 py-1 rounded-md text-red-500 bg-red-50 hover:bg-red-100 font-medium transition-colors"
            aria-label="Remove medication"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-3 gap-2 mt-1">
        <div className="bg-slate-50 rounded-lg px-3 py-2 flex flex-col col-span-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Dose</span>
          <span className="text-xs font-bold text-blue-700 mt-0.5 leading-snug">{r.singleDose ?? "—"}</span>
        </div>
        <div className="bg-slate-50 rounded-lg px-3 py-2 flex flex-col col-span-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Freq.</span>
          <span className="text-xs font-semibold text-slate-700 mt-0.5">{r.frequencyPerDay}× daily</span>
        </div>
        <div className="bg-slate-50 rounded-lg px-3 py-2 flex flex-col col-span-1">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Duration</span>
          <span className="text-xs font-semibold text-slate-700 mt-0.5">
            {r.durationDays ? `${r.durationDays}d` : "—"}
          </span>
        </div>
      </div>

      {r.totalQuantity && (
        <p className="text-xs text-slate-500 mt-0.5">
          Total: <span className="font-semibold text-slate-700">{r.totalQuantity}</span>
        </p>
      )}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function MedicationModal({
  initialItem,
  patientAge,
  patientWeight,
  onClose,
  onSave,
}: {
  initialItem?: PrescriptionItem;
  patientAge: string;
  patientWeight: string;
  onClose: () => void;
  onSave: (item: Omit<PrescriptionItem, "id">) => void;
}) {
  const drugOptions = Object.entries(drugs).map(([key, drug]) => ({
    value: key,
    label: drug.name,
  }));

  const defaultDrugKey = initialItem?.drugKey ?? "amoxicillin-clavulanate";
  const defaultForm =
    initialItem?.formulationLabel ??
    drugs[defaultDrugKey]?.formulations[0]?.label ?? "";

  const [mDrugKey, setMDrugKey] = useState(defaultDrugKey);
  const [mFormulation, setMFormulation] = useState(defaultForm);
  const [mDuration, setMDuration] = useState(
    initialItem?.durationDays ? String(initialItem.durationDays) : ""
  );
  const [mResult, setMResult] = useState<DoseResult | null>(
    initialItem?.result ?? null
  );
  const [mErrors, setMErrors] = useState<ModalErrors>({});

  const handleDrugSelect = (key: string) => {
    setMDrugKey(key);
    const d = drugs[key];
    setMFormulation(d?.formulations[0]?.label ?? "");
    setMResult(null);
    setMErrors({});
  };

  const handleCalculate = useCallback(() => {
    const newErrors: ModalErrors = {};
    const ageNum = parseFloat(patientAge);
    const weightNum = parseFloat(patientWeight);
    const durNum = mDuration ? parseFloat(mDuration) : null;

    if (isNaN(ageNum) || ageNum <= 0) newErrors.age = "Age must be > 0";
    if (isNaN(weightNum) || weightNum < 1 || weightNum > 200)
      newErrors.weight = "Weight must be 1–200 kg";
    if (!isNaN(ageNum) && !isNaN(weightNum) && (ageNum < 1 / 12 || weightNum < 3))
      newErrors.topLevel = "Neonatal dosing requires specialist calculation.";
    if (durNum !== null && durNum < 1) newErrors.duration = "Duration must be ≥ 1";
    if (!mDrugKey) newErrors.medication = "Select a medication";
    if (!mFormulation) newErrors.formulation = "Select a formulation";

    if (Object.keys(newErrors).length) {
      setMErrors(newErrors);
      return;
    }

    const res = calculateDose(ageNum, weightNum, mDrugKey, mFormulation, durNum);
    setMResult(res);
    setMErrors({});
  }, [patientAge, patientWeight, mDrugKey, mFormulation, mDuration]);

  const handleAdd = () => {
    if (!mResult) return;
    onSave({
      result: mResult,
      drugKey: mDrugKey,
      formulationLabel: mFormulation,
      durationDays: mDuration ? parseFloat(mDuration) : null,
    });
  };

  const ageOk = !isNaN(parseFloat(patientAge)) && parseFloat(patientAge) > 0;
  const weightOk =
    !isNaN(parseFloat(patientWeight)) &&
    parseFloat(patientWeight) >= 1 &&
    parseFloat(patientWeight) <= 200;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">
            {initialItem ? "Edit Medication" : "Add Medication"}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Patient context banner */}
          {ageOk && weightOk ? (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs rounded-lg px-3 py-2">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>
                Patient: <strong>{patientAge} yr</strong> · <strong>{patientWeight} kg</strong>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-lg px-3 py-2">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Enter patient age &amp; weight in the main form first for weight-based dosing.</span>
            </div>
          )}

          {/* Top-level error */}
          {mErrors.topLevel && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-3 py-2">
              {mErrors.topLevel}
            </div>
          )}

          {/* Medication search */}
          <div className="space-y-1.5">
            <label htmlFor="modal-medication" className="block text-sm font-medium text-slate-700">
              Medication
            </label>
            <SearchableSelect
              options={drugOptions}
              value={mDrugKey}
              onChange={handleDrugSelect}
              placeholder="Search medication..."
              hasError={!!mErrors.medication}
            />
            {mErrors.medication && <p className="text-xs text-red-500">{mErrors.medication}</p>}
          </div>

          {/* Formulation */}
          {drugs[mDrugKey]?.formulations?.length > 0 && (
            <div className="space-y-1.5">
              <label htmlFor="modal-formulation" className="block text-sm font-medium text-slate-700">
                Formulation
              </label>
              <FormulationSelect
                drugKey={mDrugKey}
                value={mFormulation}
                onChange={(v) => { setMFormulation(v); setMResult(null); }}
                hasError={!!mErrors.formulation}
                id="modal-formulation"
              />
              {mErrors.formulation && <p className="text-xs text-red-500">{mErrors.formulation}</p>}
            </div>
          )}

          {/* Duration */}
          <div className="space-y-1.5">
            <label htmlFor="modal-duration" className="block text-sm font-medium text-slate-700">
              Duration (days) — Optional
            </label>
            <input
              id="modal-duration"
              type="number"
              value={mDuration}
              onChange={(e) => { setMDuration(e.target.value); setMResult(null); }}
              placeholder="e.g. 7"
              className={`w-full px-4 py-2.5 bg-white border ${mErrors.duration
                ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                : "border-slate-300 focus:ring-blue-500/20 focus:border-blue-500"
                } rounded-lg text-slate-900 focus:ring-2 outline-none transition-all placeholder:text-slate-400`}
            />
            {mErrors.duration && <p className="text-xs text-red-500">{mErrors.duration}</p>}
          </div>

          {/* Calculate button */}
          <button
            type="button"
            onClick={handleCalculate}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Calculate Dose
          </button>

          {/* Result preview */}
          {mResult && (
            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 space-y-3">
              <div className="border-b border-blue-100 pb-2">
                <p className="font-semibold text-slate-800 text-sm">{mResult.drugName}</p>
                <p className="text-xs text-slate-500 mt-0.5">{mResult.formulationLabel}</p>
              </div>

              {mResult.ageWarning && (
                <div className="bg-red-50 text-red-700 text-xs rounded-lg px-3 py-2 border border-red-200">
                  ⚠ {mResult.ageWarning}
                </div>
              )}

              {mResult.singleDose ? (
                <div className="flex flex-col items-center bg-white rounded-lg border border-blue-100 py-3">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                    Dose per administration
                  </span>
                  <span className="text-xl font-bold text-blue-700 mt-1">{mResult.singleDose}</span>
                </div>
              ) : (
                <p className="text-xs text-red-600">Dose information not available for this selection.</p>
              )}

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white rounded-lg border border-slate-100 px-3 py-2 flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Route</span>
                  <span className="font-semibold text-slate-700 mt-0.5">{mResult.route}</span>
                </div>
                <div className="bg-white rounded-lg border border-slate-100 px-3 py-2 flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Frequency</span>
                  <span className="font-semibold text-slate-700 mt-0.5">{mResult.frequencyPerDay}× daily</span>
                </div>
                {mResult.totalDailyDose !== null && (
                  <div className="bg-white rounded-lg border border-slate-100 px-3 py-2 flex flex-col col-span-2">
                    <span className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Total Daily</span>
                    <span className="font-semibold text-slate-700 mt-0.5">{mResult.totalDailyDose} mg</span>
                  </div>
                )}
              </div>

              {mResult.maxDoseApplied && (
                <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  Max daily dose cap applied.
                </p>
              )}

              {mResult.durationDays && (
                <div className="text-xs text-slate-600 space-y-1 bg-white border border-slate-100 rounded-lg px-3 py-2">
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span className="font-semibold">{mResult.durationDays} days</span>
                  </div>
                  {mResult.totalAdministrations && (
                    <div className="flex justify-between">
                      <span>Administrations</span>
                      <span className="font-semibold">{mResult.totalAdministrations}</span>
                    </div>
                  )}
                  {mResult.totalQuantity && (
                    <div className="flex justify-between border-t border-slate-100 pt-1 mt-1">
                      <span className="font-medium">Total needed</span>
                      <span className="font-bold text-blue-700">{mResult.totalQuantity}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Add to Prescription button */}
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {initialItem ? "Save Changes" : "Add to Prescription"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  // ── Main calculator state ─────────────────────────────────────────────────
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [medication, setMedication] = useState<string>("amoxicillin-clavulanate");
  const [duration, setDuration] = useState<string>("");

  const defaultDrug = drugs["amoxicillin-clavulanate"];
  const initialFormulation = defaultDrug?.formulations[0]?.label || "";
  const [formulation, setFormulation] = useState<string>(initialFormulation);
  const [result, setResult] = useState<DoseResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{
    age?: string; weight?: string; duration?: string;
    topLevel?: string; medication?: string; formulation?: string;
  }>({});

  // ── Mode toggle ───────────────────────────────────────────────────────────
  const [mode, setMode] = useState<"calculator" | "builder">("calculator");

  // ── Prescription state ────────────────────────────────────────────────────
  const [prescription, setPrescription] = useState<PrescriptionItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PrescriptionItem | undefined>(undefined);
  const [copiedRx, setCopiedRx] = useState(false);

  // ── Builder patient inputs ─────────────────────────────────────────────────
  const [bAge, setBAge] = useState<string>("");
  const [bWeight, setBWeight] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");

  // Add-medication search state (placeholder — no logic yet)
  const [addDrugKey, setAddDrugKey] = useState<string>("");
  const [addFormulation, setAddFormulation] = useState<string>("");

  const drugOptions = Object.entries(drugs).map(([key, drug]) => ({
    value: key,
    label: drug.name,
  }));

  const diagnosisOptions = Object.entries(diagnoses).map(([key, d]) => ({
    value: key,
    label: d.name,
  }));

  // ── Main calculator handlers ──────────────────────────────────────────────
  const handleDrugSelect = (key: string) => {
    setMedication(key);
    const drugData = drugs[key];
    if (drugData?.formulations?.length) {
      const preferred =
        drugData.formulations.find((f) => f.route === "oral") ||
        drugData.formulations[0];
      setFormulation(preferred.label);
    } else {
      setFormulation("");
    }
    setResult(null);
  };

  const handleCalculate = () => {
    setErrors({});
    const newErrors: typeof errors = {};
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const durationNum = duration ? parseFloat(duration) : null;

    if (isNaN(ageNum) || ageNum <= 0) { newErrors.age = "Age must be > 0"; }
    if (isNaN(weightNum) || weightNum < 1 || weightNum > 200) { newErrors.weight = "Weight must be between 1 and 200 kg"; }
    if (durationNum !== null && durationNum < 1) { newErrors.duration = "Duration must be ≥ 1"; }
    if (!medication) { newErrors.medication = "Drug must be selected"; }
    if (!formulation) { newErrors.formulation = "Formulation must be selected"; }
    if (!isNaN(ageNum) && !isNaN(weightNum)) {
      if (ageNum < 1 / 12 || weightNum < 3) {
        newErrors.topLevel = "Neonatal dosing requires specialist calculation.";
      }
    }

    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    const dosingResult = calculateDose(ageNum, weightNum, medication, formulation, durationNum);
    setResult(dosingResult);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!result) return;
    const str = `${result.drugName} ${result.formulationLabel}\nDose: ${result.singleDose} ${result.route}\nFrequency: ${result.frequencyPerDay}x daily${result.durationDays ? `\nDuration: ${result.durationDays} days` : ""}${result.totalQuantity ? `\nTotal: ${result.totalQuantity}` : ""}`;
    navigator.clipboard.writeText(str);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Prescription handlers ─────────────────────────────────────────────────
  const openEditModal = (item: PrescriptionItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleModalSave = (saved: Omit<PrescriptionItem, "id">) => {
    if (editingItem) {
      setPrescription((prev) =>
        prev.map((p) => (p.id === editingItem.id ? { ...saved, id: editingItem.id } : p))
      );
    } else {
      const newItem: PrescriptionItem = {
        ...saved,
        id: `rx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      };
      setPrescription((prev) => [...prev, newItem]);
    }
    setModalOpen(false);
    setEditingItem(undefined);
  };

  const removeItem = (id: string) =>
    setPrescription((prev) => prev.filter((p) => p.id !== id));

  const copyPrescription = useCallback(() => {
    const text = prescription
      .map((p) => {
        const r = p.result;
        const durationStr = r.durationDays ? ` for ${r.durationDays} days` : "";
        return `${r.drugName} ${r.formulationLabel}\n${r.singleDose ?? "N/A"} ${r.route} ${r.frequencyPerDay}x daily${durationStr}`;
      })
      .join("\n\n");

    navigator.clipboard.writeText(text);
    setCopiedRx(true);
    setTimeout(() => setCopiedRx(false), 2000);
  }, [prescription]);

  const selectedDrug = drugs[medication];

  const interactionWarnings = useMemo(() => {
    if (prescription.length < 2) return [] as string[];
    const warnings: string[] = [];
    for (let i = 0; i < prescription.length; i++) {
      for (let j = i + 1; j < prescription.length; j++) {
        const a = prescription[i].drugKey;
        const b = prescription[j].drugKey;
        const msg = KNOWN_INTERACTIONS[a]?.[b] ?? KNOWN_INTERACTIONS[b]?.[a] ?? null;
        if (msg) {
          const aName = drugs[a]?.name ?? a;
          const bName = drugs[b]?.name ?? b;
          warnings.push(`${aName} + ${bName}: ${msg}`);
        }
      }
    }
    return warnings;
  }, [prescription]);

  const addManualMedication = () => {
    const ageNum = parseFloat(bAge);
    const weightNum = parseFloat(bWeight);
    if (isNaN(ageNum) || ageNum <= 0) return;
    if (isNaN(weightNum) || weightNum < 1 || weightNum > 200) return;
    if (ageNum < 1 / 12 || weightNum < 3) return;
    if (!addDrugKey || !addFormulation) return;

    const res = calculateDose(ageNum, weightNum, addDrugKey, addFormulation, null);
    if (!res) return;

    const newItem: PrescriptionItem = {
      id: `rx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      result: res,
      drugKey: addDrugKey,
      formulationLabel: addFormulation,
      durationDays: null,
    };
    setPrescription((prev) => [...prev, newItem]);
    
    // Reset form
    setAddDrugKey("");
    setAddFormulation("");
  };

  const addRecommendationToPrescription = useCallback(
    (drugKey: string, formulationLabel: string) => {
      const ageNum = parseFloat(bAge);
      const weightNum = parseFloat(bWeight);
      if (isNaN(ageNum) || ageNum <= 0) return;
      if (isNaN(weightNum) || weightNum < 1 || weightNum > 200) return;
      if (ageNum < 1 / 12 || weightNum < 3) return;

      const res = calculateDose(ageNum, weightNum, drugKey, formulationLabel, null);
      if (!res) return;

      const newItem: PrescriptionItem = {
        id: `rx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        result: res,
        drugKey,
        formulationLabel,
        durationDays: null,
      };
      setPrescription((prev) => [...prev, newItem]);
    },
    [bAge, bWeight]
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* ── Modal ─────────────────────────────────────────────────── */}
      {modalOpen && (
        <MedicationModal
          initialItem={editingItem}
          patientAge={age}
          patientWeight={weight}
          onClose={() => { setModalOpen(false); setEditingItem(undefined); }}
          onSave={handleModalSave}
        />
      )}

      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          {/* ── Shared header with toggle ──────────────────────────── */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-slate-100">
            <h1 className="text-2xl font-semibold text-slate-800">Medical Dose Calculator</h1>
            <p className="text-slate-500 text-sm mt-1">Dosing guide for pediatric &amp; adult patients</p>

            {/* Segmented control */}
            <div className="mt-5 inline-flex items-center bg-slate-100 rounded-lg p-1 gap-1" role="tablist" aria-label="Mode toggle">
              <button
                id="mode-calculator"
                role="tab"
                aria-selected={mode === "calculator"}
                onClick={() => setMode("calculator")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "calculator"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                Dose Calculator
              </button>
              <button
                id="mode-builder"
                role="tab"
                aria-selected={mode === "builder"}
                onClick={() => setMode("builder")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "builder"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                Prescription Builder
                {prescription.length > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                    {prescription.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ── Calculator panel ──────────────────────────────────── */}
          {mode === "calculator" && (
            <div className="p-8 pt-6">
              <div className="mb-6" />

              {errors.topLevel && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3.L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm font-medium text-red-800">{errors.topLevel}</p>
                </div>
              )}

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="age" className="block text-sm font-medium text-slate-700">Age (years)</label>
                    <input
                      id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 5"
                      className={`w-full px-4 py-2.5 bg-white border ${errors.age ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : "border-slate-300 focus:ring-blue-500/20 focus:border-blue-500"} rounded-lg text-slate-900 focus:ring-2 outline-none transition-all placeholder:text-slate-400`}
                    />
                    {errors.age && <p className="text-xs text-red-500">{errors.age}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="weight" className="block text-sm font-medium text-slate-700">Weight (kg)</label>
                    <input
                      id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 20"
                      className={`w-full px-4 py-2.5 bg-white border ${errors.weight ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : "border-slate-300 focus:ring-blue-500/20 focus:border-blue-500"} rounded-lg text-slate-900 focus:ring-2 outline-none transition-all placeholder:text-slate-400`}
                    />
                    {errors.weight && <p className="text-xs text-red-500">{errors.weight}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="duration" className="block text-sm font-medium text-slate-700">Duration (days) — Optional</label>
                  <input
                    id="duration" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 5"
                    className={`w-full px-4 py-2.5 bg-white border ${errors.duration ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : "border-slate-300 focus:ring-blue-500/20 focus:border-blue-500"} rounded-lg text-slate-900 focus:ring-2 outline-none transition-all placeholder:text-slate-400`}
                  />
                  {errors.duration && <p className="text-xs text-red-500">{errors.duration}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="medication-search" className="block text-sm font-medium text-slate-700">Medication</label>
                  <SearchableSelect
                    options={drugOptions} value={medication} onChange={handleDrugSelect}
                    placeholder="Search medication..." hasError={!!errors.medication}
                  />
                  {errors.medication && <p className="text-xs text-red-500">{errors.medication}</p>}
                </div>

                {selectedDrug?.formulations?.length > 0 && (
                  <div className="space-y-1.5">
                    <label htmlFor="formulation" className="block text-sm font-medium text-slate-700">Formulation</label>
                    <FormulationSelect
                      drugKey={medication} value={formulation}
                      onChange={setFormulation} hasError={!!errors.formulation}
                    />
                    {errors.formulation && <p className="text-xs text-red-500">{errors.formulation}</p>}
                  </div>
                )}

                <button
                  type="button" onClick={handleCalculate}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-colors shadow-sm shadow-blue-200 mt-2"
                >
                  Calculate Dose
                </button>
              </form>

              <footer className="mt-8 space-y-4">
                <div className={`p-5 rounded-xl border transition-all ${result ? "bg-blue-50/50 border-blue-100 shadow-sm" : "bg-slate-50 border-slate-100 flex items-center justify-center min-h-[5rem] text-slate-500 italic text-sm"}`}>
                  {!result ? (
                    "Results will appear here"
                  ) : (
                    <div className="space-y-4">
                      <div className="border-b border-blue-100 pb-3">
                        <h2 className="text-lg font-bold text-slate-800 leading-tight border-l-4 border-blue-500 pl-2">{result.drugName}</h2>
                        <p className="text-sm text-slate-600 mt-1 pl-3">{result.formulationLabel}</p>
                      </div>

                      {result.ageWarning && (
                        <div className="bg-red-50 rounded-lg p-3 border border-red-200 flex items-start space-x-2">
                          <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3.L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <p className="text-sm font-semibold text-red-800 leading-tight">{result.ageWarning}</p>
                        </div>
                      )}

                      <div className="space-y-3">
                        {result.singleDose ? (
                          <div className="bg-white p-4 rounded-lg border border-blue-100/50 shadow-sm flex flex-col items-center justify-center text-center">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Dose per administration</span>
                            <span className="text-2xl font-bold text-blue-700">{result.singleDose}</span>
                          </div>
                        ) : (
                          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">Dose information missing or unspecified for this selection.</div>
                        )}

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-white p-2.5 rounded-lg border border-slate-100 flex flex-col">
                            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Route</span>
                            <span className="font-semibold text-slate-700">{result.route}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-slate-100 flex flex-col">
                            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Frequency</span>
                            <span className="font-semibold text-slate-700">{result.frequencyPerDay}x Daily</span>
                          </div>
                          {result.totalDailyDose !== null && (
                            <div className="bg-white p-2.5 rounded-lg border border-slate-100 flex flex-col col-span-2">
                              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Daily Dose</span>
                              <span className="font-semibold text-slate-700">{result.totalDailyDose} mg</span>
                            </div>
                          )}
                        </div>

                        {result.maxDoseApplied && (
                          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 flex items-start space-x-2">
                            <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs font-medium text-amber-800 leading-snug">Maximum daily dose limit has been applied to this calculation to prevent overdose.</p>
                          </div>
                        )}

                        {result.durationDays && (
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2 mt-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-500">Duration</span>
                              <span className="font-semibold text-slate-700">{result.durationDays} days</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Total administrations</span>
                              <span className="font-semibold text-slate-700">{result.totalAdministrations}</span>
                            </div>
                            {result.totalQuantity && (
                              <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                                <span className="text-slate-500 font-medium">Total quantity needed</span>
                                <span className="font-bold text-blue-700">{result.totalQuantity}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {result.considerations?.length > 0 && (
                        <div className="pt-3 border-t border-blue-100/50">
                          <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Considerations</h3>
                          <ul className="text-xs text-slate-600 space-y-1.5 pl-4 list-disc">
                            {result.considerations.map((note, idx) => (
                              <li key={idx} className="leading-snug pl-1">{note}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {result && (
                  <div className="bg-white p-5 rounded-xl border border-slate-200 mt-4 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-semibold text-slate-800">Prescription Format</h3>
                      <button
                        onClick={handleCopy}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center space-x-1.5 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded bg-opacity-70"
                      >
                        {copied ? (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy Prescription</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg font-mono text-xs text-slate-700 border border-slate-100 whitespace-pre-wrap leading-relaxed">
                      {`${result.drugName} ${result.formulationLabel}\nDose: ${result.singleDose} ${result.route}\nFrequency: ${result.frequencyPerDay}x daily${result.durationDays ? `\nDuration: ${result.durationDays} days` : ""}${result.totalQuantity ? `\nTotal: ${result.totalQuantity}` : ""}`}
                    </div>
                  </div>
                )}

                <p className="text-[10px] text-center text-slate-400 leading-relaxed uppercase tracking-wider mt-4">
                  For educational purposes only.<br />Always verify dosing with official guidelines.
                </p>
              </footer>
            </div>
          )}

          {/* ── Prescription Builder panel ─────────────────────────── */}
          {mode === "builder" && (
            <div className="divide-y divide-slate-100">

              {/* ─── Patient inputs ─────────────────────────────────────────── */}
              <div className="px-6 py-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {/* Age */}
                  <div className="space-y-1.5">
                    <label htmlFor="b-age" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Age (years)
                    </label>
                    <input
                      id="b-age"
                      type="number"
                      value={bAge}
                      onChange={(e) => setBAge(e.target.value)}
                      placeholder="e.g. 5"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Weight */}
                  <div className="space-y-1.5">
                    <label htmlFor="b-weight" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Weight (kg)
                    </label>
                    <input
                      id="b-weight"
                      type="number"
                      value={bWeight}
                      onChange={(e) => setBWeight(e.target.value)}
                      placeholder="e.g. 20"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Diagnosis / Chief Complaint */}
                <div className="space-y-1.5">
                  <label htmlFor="b-diagnosis" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Diagnosis / Chief Complaint
                  </label>
                  <SearchableSelect
                    options={diagnosisOptions}
                    value={diagnosis}
                    onChange={setDiagnosis}
                    placeholder="Search diagnosis (e.g. Otitis Media)..."
                  />
                </div>
              </div>

              {/* ─── Section 1: Recommended Medications ────────────────────── */}
              <div className="px-6 py-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="text-sm font-semibold text-slate-700">Recommended Medications</h3>
                  </div>
                  {diagnosis && diagnoses[diagnosis] && (
                    <span className="text-[11px] text-slate-400 italic truncate max-w-[140px]">{diagnoses[diagnosis].name}</span>
                  )}
                </div>

                {diagnosis && diagnoses[diagnosis] ? (
                  <div className="space-y-4">
                    {[
                      { label: "First Line", items: diagnoses[diagnosis].firstLine, color: "text-emerald-600", bg: "bg-emerald-50" },
                      { label: "Second Line", items: diagnoses[diagnosis].secondLine, color: "text-blue-600", bg: "bg-blue-50" },
                      { label: "Alternatives", items: diagnoses[diagnosis].alternatives, color: "text-slate-600", bg: "bg-slate-50" },
                    ].map((section, idx) => (
                      section.items.length > 0 && (
                        <div key={idx} className="space-y-1.5">
                          <p className={`text-[10px] uppercase font-bold tracking-wider ${section.color}`}>{section.label}</p>
                          <div className="space-y-2">
                            {section.items.flatMap((drugKey) => {
                              const d = drugs[drugKey];
                              const ageNum = parseFloat(bAge);
                              const weightNum = parseFloat(bWeight);
                              const canCalc =
                                !isNaN(ageNum) &&
                                ageNum > 0 &&
                                !isNaN(weightNum) &&
                                weightNum >= 1 &&
                                weightNum <= 200 &&
                                !(ageNum < 1 / 12 || weightNum < 3);
                              const formulations = d?.formulations?.length
                                ? [d.formulations.find((f) => f.route === "PO") ?? d.formulations[0]]
                                : [];

                              return formulations.map((f) => {
                                const res =
                                  canCalc && f?.label
                                    ? calculateDose(ageNum, weightNum, drugKey, f.label, null)
                                    : null;
                                const doseStr = res?.singleDose ?? "—";
                                const freqStr = res ? `${res.frequencyPerDay}× daily` : "—";

                                return (
                                  <div
                                    key={`${drugKey}::${f.label}`}
                                    className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm"
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 leading-tight truncate">
                                          {d?.name || drugKey}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5 truncate">{f.label}</p>
                                      </div>
                                      <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${section.color.replace("text", "bg")}`} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                      <div className="bg-slate-50 rounded-lg px-3 py-2 flex flex-col">
                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Dose</span>
                                        <span className="text-xs font-bold text-blue-700 mt-0.5 leading-snug">
                                          {doseStr}
                                        </span>
                                      </div>
                                      <div className="bg-slate-50 rounded-lg px-3 py-2 flex flex-col">
                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Freq.</span>
                                        <span className="text-xs font-semibold text-slate-700 mt-0.5">{freqStr}</span>
                                      </div>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => addRecommendationToPrescription(drugKey, f.label)}
                                      disabled={!canCalc}
                                      className="mt-2 w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-xs"
                                    >
                                      Add to Prescription
                                    </button>
                                  </div>
                                );
                              });
                            })}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl px-4 py-8 text-center">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-400">
                      Select a diagnosis above to see recommendations
                    </p>
                  </div>
                )}
              </div>

              {/* ─── Section 2: Prescription (selected medications) ─────────── */}
              <div className="px-6 py-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-sm font-semibold text-slate-700">Prescription</h3>
                    {prescription.length > 0 && (
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-700">
                        {prescription.length}
                      </span>
                    )}
                  </div>
                  {prescription.length > 0 && (
                    <button
                      onClick={copyPrescription}
                      className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                    >
                      {copiedRx ? (
                        <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copied!</>
                      ) : (
                        <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy all</>
                      )}
                    </button>
                  )}
                </div>

                {interactionWarnings.length > 0 && (
                  <div className="mb-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold">Potential drug interactions detected</p>
                        <ul className="mt-1 text-xs space-y-1">
                          {interactionWarnings.map((w, idx) => (
                            <li key={idx} className="leading-snug">{w}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {prescription.length === 0 ? (
                  <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl px-4 py-6 text-center">
                    <p className="text-sm text-slate-400">No medications added yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {prescription.map((item) => (
                      <PrescriptionCard
                        key={item.id}
                        item={item}
                        onEdit={() => openEditModal(item)}
                        onRemove={() => removeItem(item.id)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* ─── Section 3: Add Medication (manual search) ────────────── */}
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <h3 className="text-sm font-semibold text-slate-700">Add Medication</h3>
                </div>

                <div className="space-y-3">
                  {/* Drug search */}
                  <div className="space-y-1.5">
                    <label htmlFor="add-medication-search" className="block text-xs font-medium text-slate-500">
                      Search medication
                    </label>
                    <SearchableSelect
                      options={drugOptions}
                      value={addDrugKey}
                      onChange={(key) => {
                        setAddDrugKey(key);
                        const d = drugs[key];
                        setAddFormulation(d?.formulations[0]?.label ?? "");
                      }}
                      placeholder="Search medication..."
                    />
                  </div>

                  {/* Formulation */}
                  {addDrugKey && drugs[addDrugKey]?.formulations?.length > 0 && (
                    <div className="space-y-1.5">
                      <label htmlFor="add-formulation" className="block text-xs font-medium text-slate-500">
                        Formulation
                      </label>
                      <FormulationSelect
                        drugKey={addDrugKey}
                        value={addFormulation}
                        onChange={setAddFormulation}
                        id="add-formulation"
                      />
                    </div>
                  )}

                  {/* Add button — calculate and append directly */}
                  <button
                    id="add-medication-btn"
                    onClick={addManualMedication}
                    disabled={!addDrugKey || !addFormulation || !bAge || !bWeight}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center gap-2 shadow-sm shadow-blue-200"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add to Prescription
                  </button>
                </div>
              </div>

              {/* Footer note */}
              <div className="px-6 py-4">
                <p className="text-[10px] text-center text-slate-400 leading-relaxed uppercase tracking-wider">
                  For educational purposes only.<br />Always verify dosing with official guidelines.
                </p>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
