"use client";
import React, { useState } from "react";
// FIX: The 'react-icons/fa' import was causing a build error.
// We're replacing them with icons from lucide-react, which is already available.
import { DollarSign, Percent, Calendar, Calculator, Landmark } from "lucide-react";

export const EmiCalculatorTool = () => {
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [interestRate, setInterestRate] = useState<number | null>(null);
  const [tenure, setTenure] = useState<number | null>(null);
  const [emi, setEmi] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateEmi = () => {
    // Basic validation
    if (loanAmount === null || loanAmount <= 0 || interestRate === null || interestRate < 0 || tenure === null || tenure <= 0) {
      setError("Please enter valid positive values for all fields.");
      setEmi(null);
      return;
    }

    setError(null);
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;

    if (monthlyRate === 0) {
      setEmi(principal / months);
      return;
    }

    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    setEmi(parseFloat(emiValue.toFixed(2)));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">EMI Calculator 💰</h2>
      <div className="grid grid-cols-1 gap-6">
        {/* Loan Amount Input */}
        <div className="relative">
          <label htmlFor="loan-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Loan Amount</label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none mt-6">
            <Landmark className="text-gray-400 dark:text-gray-500 w-5 h-5" />
          </div>
          <input
            id="loan-amount"
            type="number"
            placeholder="e.g., 500000"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
            value={loanAmount || ''}
            onChange={(e) => setLoanAmount(e.target.value === '' ? null : Number(e.target.value))}
            min="0"
          />
        </div>

        {/* Interest Rate Input */}
        <div className="relative">
          <label htmlFor="interest-rate" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Annual Interest Rate (%)</label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none mt-6">
            <Percent className="text-gray-400 dark:text-gray-500 w-5 h-5" />
          </div>
          <input
            id="interest-rate"
            type="number"
            placeholder="e.g., 8.5"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
            value={interestRate || ''}
            onChange={(e) => setInterestRate(e.target.value === '' ? null : Number(e.target.value))}
            min="0"
          />
        </div>

        {/* Tenure Input */}
        <div className="relative">
          <label htmlFor="tenure" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Loan Tenure (Years)</label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none mt-6">
            <Calendar className="text-gray-400 dark:text-gray-500 w-5 h-5" />
          </div>
          <input
            id="tenure"
            type="number"
            placeholder="e.g., 5"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
            value={tenure || ''}
            onChange={(e) => setTenure(e.target.value === '' ? null : Number(e.target.value))}
            min="0"
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateEmi}
          className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Calculator className="text-lg" />
          <span>Calculate EMI</span>
        </button>
      </div>

      {/* Results and Error Display */}
      <div className="mt-6 text-center">
        {error && (
          <p className="text-red-500 dark:text-red-400 font-medium">{error}</p>
        )}
        {emi !== null && !error && (
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-lg font-semibold text-green-700 dark:text-green-400">
              Your Estimated EMI is:
            </p>
            <p className="text-3xl font-bold text-green-800 dark:text-green-300 mt-2">
              ₹{emi.toLocaleString("en-IN")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmiCalculatorTool;
