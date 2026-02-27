"use client";

import { useState } from "react";
import { calculateDose, DoseCalculationResult } from "@/lib/calculateDose";

export default function DoseForm() {
    const [age, setAge] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [medication, setMedication] = useState<string>("");
    const [result, setResult] = useState<DoseCalculationResult | null>(null);

    const handleCalculate = () => {
        const ageNum = parseFloat(age);
        const weightNum = parseFloat(weight);

        if (isNaN(ageNum) || isNaN(weightNum) || !medication) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const calculatedDose = calculateDose(ageNum, weightNum, medication);
        setResult(calculatedDose);
    };

    return (
        <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Medical Dose Calculator</h1>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Age (years)
                    </label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Enter age"
                        min="0"
                        step="0.1"
                    />
                </div>

                <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                        Weight (kg)
                    </label>
                    <input
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Enter weight in kg"
                        min="0"
                        step="0.1"
                    />
                </div>

                <div>
                    <label htmlFor="medication" className="block text-sm font-medium text-gray-700 mb-1">
                        Medication
                    </label>
                    <select
                        id="medication"
                        value={medication}
                        onChange={(e) => setMedication(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                    >
                        <option value="">Select medication</option>
                        <option value="amoxicillin-clavulanate">Amoxicillin-clavulanate</option>
                        <option value="amoxicillin">Amoxicillin</option>
                        <option value="azithromycin">Azithromycin</option>
                        <option value="paracetamol">Paracetamol</option>
                        <option value="ibuprofen">Ibuprofen</option>
                    </select>
                </div>

                <button
                    type="button"
                    onClick={handleCalculate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6"
                >
                    Calculate Dose
                </button>
            </form>

            <div className="mt-8 p-4 border rounded-lg bg-gray-50 min-h-[100px] flex flex-col items-center justify-center text-gray-800 text-sm">
                {result ? (
                    <div className="w-full space-y-2">
                        <h3 className="text-lg font-semibold text-blue-700">{result.drugName}</h3>
                        <p className="text-base font-medium bg-blue-100 text-blue-800 p-2 rounded">{result.doseInstruction}</p>
                        {result.totalDailyDose && <p><strong>Total Daily Dose:</strong> {result.totalDailyDose} mg</p>}
                        {result.perDose && <p><strong>Per Dose:</strong> {result.perDose} mg</p>}
                        <p><strong>Route:</strong> {result.route}</p>
                        <p><strong>Suggested Formulation:</strong> {result.exampleFormulation}</p>
                    </div>
                ) : (
                    <span className="text-gray-500">Results will appear here</span>
                )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500">
                    For educational purposes only. Always verify dosing with official guidelines.
                </p>
            </div>
        </div>
    );
}
