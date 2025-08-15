"use client";
import React, { useState } from "react";
// FIX: The 'react-icons/fa' import was causing a build error.
// Assuming the icons are not available, we will remove them for now
// and use text or inline SVGs if needed.
// For a proper fix in a real project, you would need to install the dependency.
import { Calculator, Home, ArrowLeftRight, MapPin, Tag } from "lucide-react"; // Using lucide-react as an alternative

export const PropertyEvaluatorTool: React.FC = () => {
  const [city, setCity] = useState("");
  const [areaSqft, setAreaSqft] = useState<number | null>(null);
  const [qualityMultiplier, setQualityMultiplier] = useState(1);
  const [estimated, setEstimated] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Demo base price per sqft by city (replace with a real API or comprehensive database in production)
  const basePriceMap: Record<string, number> = {
    "Mumbai": 18000,
    "Delhi": 12000,
    "Bengaluru": 10000,
    "Pune": 9000,
    "Hyderabad": 8500,
    "Chennai": 8000,
    "Kolkata": 7500,
  };

  const calculate = () => {
    // Basic validation
    if (!city || areaSqft === null || areaSqft <= 0) {
      setError("Please select a city and enter a valid area.");
      setEstimated(null);
      return;
    }

    setError(null);
    const normalizedCity = city.trim().toLowerCase();
    const base = basePriceMap[Object.keys(basePriceMap).find(key => key.toLowerCase() === normalizedCity) || ""] || 7000;
    
    const area = areaSqft;
    const value = Math.round(base * area * qualityMultiplier);
    setEstimated(value);
  };

  const handleReset = () => {
    setCity("");
    setAreaSqft(null);
    setQualityMultiplier(1);
    setEstimated(null);
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Property Value Estimator 🏠</h2>
      <div className="grid grid-cols-1 gap-6">

        {/* City Input */}
        <div className="relative">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">City</label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none mt-6">
            <MapPin className="text-gray-400 dark:text-gray-500 w-5 h-5" />
          </div>
          <input
            id="city"
            type="text"
            list="cities"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Bengaluru"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
          />
          <datalist id="cities">
            {Object.keys(basePriceMap).map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>

        {/* Area Input */}
        <div className="relative">
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Area (sq. ft.)</label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none mt-6">
            <ArrowLeftRight className="text-gray-400 dark:text-gray-500 w-5 h-5" />
          </div>
          <input
            id="area"
            type="number"
            value={areaSqft || ''}
            onChange={(e) => setAreaSqft(e.target.value === '' ? null : Number(e.target.value))}
            placeholder="e.g., 1200"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
            min="0"
          />
        </div>

        {/* Quality Select */}
        <div className="relative">
          <label htmlFor="quality" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Property Quality</label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none mt-6">
            <Tag className="text-gray-400 dark:text-gray-500 w-5 h-5" />
          </div>
          <select
            id="quality"
            value={qualityMultiplier}
            onChange={(e) => setQualityMultiplier(Number(e.target.value))}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 bg-white"
          >
            <option value={0.85}>Low (0.85x)</option>
            <option value={1}>Average (1.0x)</option>
            <option value={1.2}>Premium (1.2x)</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Calculator />
          <span>Estimate Value</span>
        </button>
        <button
          onClick={handleReset}
          className="flex-1 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-lg font-semibold shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          Reset
        </button>
      </div>

      {/* Results and Error Display */}
      <div className="mt-6 text-center">
        {error && (
          <p className="text-red-500 dark:text-red-400 font-medium">{error}</p>
        )}
        {estimated !== null && !error && (
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-lg font-semibold text-green-700 dark:text-green-400">
              Estimated Property Value:
            </p>
            <p className="text-3xl font-bold text-green-800 dark:text-green-300 mt-2">
              ₹{estimated.toLocaleString("en-IN")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyEvaluatorTool;
