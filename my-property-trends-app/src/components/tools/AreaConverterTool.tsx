"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, RotateCcw } from "lucide-react";

// --- TYPE DEFINITIONS ---
type Unit = 'sqft' | 'sqm' | 'acre';

type UnitInfo = {
  value: Unit;
  label: string;
  symbol: string;
};

// --- CONSTANTS ---
const UNITS: UnitInfo[] = [
  { value: 'sqft', label: 'Square Feet', symbol: 'sq.ft.' },
  { value: 'sqm', label: 'Square Meters', symbol: 'sq.m.' },
  { value: 'acre', label: 'Acres', symbol: 'ac' },
];

const CONVERSION_FACTORS: Record<Unit, number> = {
  sqft: 1,
  sqm: 10.7639,
  acre: 43560,
};

// --- MAIN COMPONENT ---
export const AreaConverterTool: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("1000");
  const [fromUnit, setFromUnit] = useState<Unit>('sqft');
  const [toUnit, setToUnit] = useState<Unit>('sqm');
  const [outputValue, setOutputValue] = useState<string>("");

  // Perform conversion whenever the inputs change
  useEffect(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value === 0) {
      setOutputValue("");
      return;
    }

    const valueInSqft = value * CONVERSION_FACTORS[fromUnit];
    const convertedValue = valueInSqft / CONVERSION_FACTORS[toUnit];

    // Format the output to a reasonable number of decimal places
    setOutputValue(
      convertedValue < 0.001 
        ? convertedValue.toExponential(4) 
        : convertedValue.toLocaleString(undefined, { maximumFractionDigits: 4 })
    );
  }, [inputValue, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleReset = () => {
    setInputValue("1000");
    setFromUnit('sqft');
    setToUnit('sqm');
  };

  const fromUnitLabel = useMemo(() => UNITS.find(u => u.value === fromUnit)?.label, [fromUnit]);
  const toUnitLabel = useMemo(() => UNITS.find(u => u.value === toUnit)?.label, [toUnit]);

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">Area Converter 📐</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        {/* From Section */}
        <div className="space-y-2">
          <Label htmlFor="from-value" className="text-gray-700 dark:text-gray-200">From</Label>
          <div className="flex gap-2">
            <Input
              id="from-value"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="text-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            />
            <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as Unit)}>
              <SelectTrigger className="w-[120px] bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                {UNITS.map(unit => (
                  <SelectItem key={unit.value} value={unit.value}>{unit.symbol}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* To Section */}
        <div className="space-y-2">
          <Label htmlFor="to-value" className="text-gray-700 dark:text-gray-200">To</Label>
          <div className="flex gap-2">
            <div className="flex-grow h-10 flex items-center justify-start px-3 text-lg font-semibold bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md border border-gray-300 dark:border-gray-700">
              {outputValue || "..."}
            </div>
            <Select value={toUnit} onValueChange={(value) => setToUnit(value as Unit)}>
              <SelectTrigger className="w-[120px] bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                {UNITS.map(unit => (
                  <SelectItem key={unit.value} value={unit.value}>{unit.symbol}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center my-4">
        <Button onClick={handleSwap} variant="ghost" size="icon" aria-label="Swap units">
          <ArrowLeftRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Button>
      </div>
      
      {/* Result Display */}
      <Card className="bg-gray-100 dark:bg-gray-800 text-center border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <p className="text-gray-600 dark:text-gray-400">Result</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {inputValue || 0} {fromUnitLabel} = {outputValue || 0} {toUnitLabel}
          </p>
        </CardContent>
      </Card>

      {/* Examples Section */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 text-center">Common Conversions</h3>
        <div className="text-xs text-center text-gray-500 dark:text-gray-400 space-y-1">
            <p>1 Acre ≈ 43,560 sq.ft. (Standard Plot)</p>
            <p>100 sq.m. ≈ 1,076 sq.ft. (Small Apartment)</p>
            <p>260 sq.m. ≈ 2,798 sq.ft. (Tennis Court)</p>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button onClick={handleReset} variant="outline" size="sm" className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            <RotateCcw className="h-4 w-4 mr-2"/>
            Reset
        </Button>
      </div>
    </div>
  );
};

export default AreaConverterTool;
