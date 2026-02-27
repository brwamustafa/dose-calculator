"use client";

import { useState } from "react";
import { drugs } from "@/lib/drugs";
import { calculateDose, DoseResult } from "@/lib/calculateDose";

export default function Home() {
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [medication, setMedication] = useState<string>("amoxicillin-clavulanate");
  const [formulation, setFormulation] = useState<string>("Suspension 400mg/57mg per 5mL");
  const [result, setResult] = useState<DoseResult | null>(null);

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
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);

    if (isNaN(ageNum) || isNaN(weightNum)) {
      alert("Please enter valid age and weight.");
      return;
    }

    const dosingResult = calculateDose(ageNum, weightNum, medication, formulation);
    setResult(dosingResult);
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

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
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
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
              />
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
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="medication" className="block text-sm font-medium text-slate-700">
                Medication
              </label>
              <select
                id="medication"
                value={medication}
                onChange={handleMedicationChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
              >
                {Object.keys(drugs).map((key) => (
                  <option key={key} value={key}>
                    {drugs[key].name}
                  </option>
                ))}
              </select>
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
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                >
                  {selectedDrug.formulations.map((f, idx) => (
                    <option key={idx} value={f.label}>
                      {f.label}
                    </option>
                  ))}
                </select>
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
            <div className={`p-5 rounded-xl border transition-all ${result ? 'bg-blue-50/50 border-blue-100' : 'bg-slate-50 border-slate-100 flex items-center justify-center min-h-[5rem] text-slate-500 italic text-sm'}`}>
              {!result ? (
                "Results will appear here"
              ) : (
                <div className="space-y-4">
                  <div className="border-b border-blue-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-800 leading-tight border-l-4 border-blue-500 pl-2">
                      {result.drugName}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1 pl-3">{result.formulation}</p>
                  </div>

                  <div className="space-y-2.5">
                    {result.singleDose ? (
                      <div className="bg-white p-3 rounded-lg border border-blue-100/50 shadow-sm flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Dose</span>
                        <span className="text-2xl font-bold text-blue-700">{result.singleDose}</span>
                      </div>
                    ) : (
                      <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                        Dose information missing or unspecified for this selection.
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-white p-2.5 rounded-lg border border-slate-100 flex flex-col">
                        <span className="text-[11px] font-medium text-slate-400 uppercase">Route</span>
                        <span className="font-semibold text-slate-700">{result.route}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-100 flex flex-col">
                        <span className="text-[11px] font-medium text-slate-400 uppercase">Frequency</span>
                        <span className="font-semibold text-slate-700">{result.frequencyPerDay}x Daily</span>
                      </div>
                    </div>

                    {result.maxDoseApplied && (
                      <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-200 flex items-start space-x-2">
                        <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3.L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-xs font-medium text-amber-800 leading-tight">
                          Maximum daily dose limit applied to calculation.
                        </p>
                      </div>
                    )}
                  </div>

                  {result.considerations && result.considerations.length > 0 && (
                    <div className="pt-2">
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Considerations</h3>
                      <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                        {result.considerations.map((note, idx) => (
                          <li key={idx} className="leading-snug pl-1">{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              )}
            </div>

            <p className="text-[10px] text-center text-slate-400 leading-relaxed uppercase tracking-wider">
              For educational purposes only.<br />Always verify dosing with official guidelines.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
