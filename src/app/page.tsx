"use client";

import { useState } from "react";
import { drugs } from "@/lib/drugs";
import { calculateDose, DoseResult } from "@/lib/calculateDose";
import SearchableSelect from "@/components/SearchableSelect";

export default function Home() {
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [medication, setMedication] = useState<string>("amoxicillin-clavulanate");
  const [duration, setDuration] = useState<string>("");

  // Set initial default appropriately
  const defaultDrug = drugs["amoxicillin-clavulanate"];
  const initialFormulation = defaultDrug?.formulations[0]?.label || "";
  const [formulation, setFormulation] = useState<string>(initialFormulation);
  const [result, setResult] = useState<DoseResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ age?: string; weight?: string; duration?: string; topLevel?: string; medication?: string; formulation?: string }>({});

  const drugOptions = Object.entries(drugs).map(([key, drug]) => ({
    value: key,
    label: drug.name,
  }));

  const handleDrugSelect = (key: string) => {
    setMedication(key);
    const drugData = drugs[key];
    if (drugData && drugData.formulations && drugData.formulations.length > 0) {
      setFormulation(drugData.formulations[0].label);
    } else {
      setFormulation("");
    }
    setResult(null);
  };

  const handleMedicationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMedication = e.target.value;
    setMedication(newMedication);

    // Reset formulation when drug changes, default to first available
    const drugData = drugs[newMedication];
    if (drugData && drugData.formulations && drugData.formulations.length > 0) {
      setFormulation(drugData.formulations[0].label);
    } else {
      setFormulation("");
    }

    setResult(null);
  };

  const handleCalculate = () => {
    setErrors({});
    let isValid = true;
    const newErrors: { age?: string; weight?: string; duration?: string; topLevel?: string; medication?: string; formulation?: string } = {};

    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const durationNum = duration ? parseFloat(duration) : null;

    if (isNaN(ageNum) || ageNum <= 0) {
      newErrors.age = "Age must be > 0";
      isValid = false;
    }

    if (isNaN(weightNum) || weightNum < 1 || weightNum > 200) {
      newErrors.weight = "Weight must be between 1 and 200 kg";
      isValid = false;
    }

    if (durationNum !== null && durationNum < 1) {
      newErrors.duration = "Duration must be ≥ 1";
      isValid = false;
    }

    if (!medication) {
      newErrors.medication = "Drug must be selected";
      isValid = false;
    }

    if (!formulation) {
      newErrors.formulation = "Formulation must be selected";
      isValid = false;
    }

    if (!isNaN(ageNum) && !isNaN(weightNum)) {
      if (ageNum < (1 / 12) || weightNum < 3) {
        newErrors.topLevel = "Neonatal dosing requires specialist calculation.";
        isValid = false;
      }
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

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

  const selectedDrug = drugs[medication];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8">
          <header className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-slate-800">Medical Dose Calculator</h1>
            <p className="text-slate-500 text-sm mt-1">Dosing guide for pediatric & adult patients</p>
          </header>

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
                <label htmlFor="age" className="block text-sm font-medium text-slate-700">
                  Age (years)
                </label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 5"
                  className={`w-full px-4 py-2.5 bg-white border ${errors.age ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'} rounded-lg text-slate-900 focus:ring-2 outline-none transition-all placeholder:text-slate-400`}
                />
                {errors.age && <p className="text-xs text-red-500">{errors.age}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="weight" className="block text-sm font-medium text-slate-700">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 20"
                  className={`w-full px-4 py-2.5 bg-white border ${errors.weight ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'} rounded-lg text-slate-900 focus:ring-2 outline-none transition-all placeholder:text-slate-400`}
                />
                {errors.weight && <p className="text-xs text-red-500">{errors.weight}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="duration" className="block text-sm font-medium text-slate-700">
                Duration (days) - Optional
              </label>
              <input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 5"
                className={`w-full px-4 py-2.5 bg-white border ${errors.duration ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'} rounded-lg text-slate-900 focus:ring-2 outline-none transition-all placeholder:text-slate-400`}
              />
              {errors.duration && <p className="text-xs text-red-500">{errors.duration}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="medication-search" className="block text-sm font-medium text-slate-700">
                Medication
              </label>
              <SearchableSelect
                options={drugOptions}
                value={medication}
                onChange={handleDrugSelect}
                placeholder="Search medication..."
                hasError={!!errors.medication}
              />
              {errors.medication && <p className="text-xs text-red-500">{errors.medication}</p>}
            </div>

            {selectedDrug && selectedDrug.formulations && selectedDrug.formulations.length > 0 && (
              <div className="space-y-1.5">
                <label htmlFor="formulation" className="block text-sm font-medium text-slate-700">
                  Formulation
                </label>
                <select
                  id="formulation"
                  value={formulation}
                  onChange={(e) => setFormulation(e.target.value)}
                  className={`w-full px-4 py-2.5 bg-white border ${errors.formulation ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'} rounded-lg text-slate-900 focus:ring-2 outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat`}
                >
                  {selectedDrug.formulations.map((f, idx) => (
                    <option key={idx} value={f.label}>
                      {f.label}
                    </option>
                  ))}
                </select>
                {errors.formulation && <p className="text-xs text-red-500">{errors.formulation}</p>}
              </div>
            )}

            <button
              type="button"
              onClick={handleCalculate}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-colors shadow-sm shadow-blue-200 mt-2"
            >
              Calculate Dose
            </button>
          </form>

          <footer className="mt-8 space-y-4">
            <div className={`p-5 rounded-xl border transition-all ${result ? 'bg-blue-50/50 border-blue-100 shadow-sm' : 'bg-slate-50 border-slate-100 flex items-center justify-center min-h-[5rem] text-slate-500 italic text-sm'}`}>
              {!result ? (
                "Results will appear here"
              ) : (
                <div className="space-y-4">
                  {/* Header */}
                  <div className="border-b border-blue-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-800 leading-tight border-l-4 border-blue-500 pl-2">
                      {result.drugName}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1 pl-3">{result.formulationLabel}</p>
                  </div>

                  {/* Warning for Age */}
                  {result.ageWarning && (
                    <div className="bg-red-50 rounded-lg p-3 border border-red-200 flex items-start space-x-2">
                      <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3.L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-sm font-semibold text-red-800 leading-tight">
                        {result.ageWarning}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {/* Primary Dose Box */}
                    {result.singleDose ? (
                      <div className="bg-white p-4 rounded-lg border border-blue-100/50 shadow-sm flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Dose per administration</span>
                        <span className="text-2xl font-bold text-blue-700">{result.singleDose}</span>
                      </div>
                    ) : (
                      <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                        Dose information missing or unspecified for this selection.
                      </div>
                    )}

                    {/* Info Grid */}
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

                    {/* Max Dose Warning */}
                    {result.maxDoseApplied && (
                      <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 flex items-start space-x-2">
                        <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs font-medium text-amber-800 leading-snug">
                          Maximum daily dose limit has been applied to this calculation to prevent overdose.
                        </p>
                      </div>
                    )}

                    {/* Duration Totals */}
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

                  {/* Considerations */}
                  {result.considerations && result.considerations.length > 0 && (
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
      </div>
    </div>
  );
}
