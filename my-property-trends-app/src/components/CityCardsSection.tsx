// src/components/CityCardsSection.tsx
"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

// --- TYPE DEFINITIONS ---
type City = {
  city: string;
  image: string;
  price: string;
  growth: string;
};

type CityCardsSectionProps = {
  cities: City[];
  selectedCity: string | null;
  onCitySelect: (city: string) => void;
  isLoading: boolean; // New prop
};

export const CityCardsSection: React.FC<CityCardsSectionProps> = ({
  cities,
  selectedCity,
  onCitySelect,
  isLoading,
}) => {
  const [showAll, setShowAll] = useState(false);
  
  const popularCitiesList = useMemo(() => cities.slice(0, 10), [cities]);
  const filteredCities = useMemo(() => showAll ? cities : popularCitiesList, [showAll, cities, popularCitiesList]);

  return (
    <div className="mb-16">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="mb-4 sm:mb-0 sm:mr-4">
          <label className="font-semibold mr-2 text-gray-800 dark:text-gray-200">
            Select a city:
          </label>
          <select
            className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-[#535699] dark:focus:ring-offset-gray-900"
            value={selectedCity || ""}
            onChange={(e) => onCitySelect(e.target.value)}
            disabled={isLoading}
          >
            <option value="">-- Choose City --</option>
            {cities.map((city) => (
              <option key={city.city} value={city.city}>{city.city}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredCities.map((city) => {
          const isSelected = selectedCity === city.city;
          const isGrowthPositive = city.growth.startsWith("+");
          return (
            <Card
              key={city.city}
              className={`overflow-hidden rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border relative group bg-card text-card-foreground ${
                isSelected
                  ? "border-[#535699] ring-2 ring-offset-2 ring-[#535699] dark:ring-offset-gray-900"
                  : "border-gray-200 dark:border-gray-800"
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => onCitySelect(city.city)}
            >
              <div className="overflow-hidden h-36 w-36 mx-auto mt-4 rounded-full relative">
                <img
                  src={city.image}
                  alt={city.city}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-1">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {city.city}
                  </h3>
                  {isGrowthPositive ? (
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400 ml-2" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400 ml-2" />
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  <span className="font-semibold text-base text-gray-900 dark:text-gray-100">
                    {city.price}
                  </span>{" "}
                  per sq. ft.
                </p>
                <p className={`text-sm font-medium ${isGrowthPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {city.growth}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button onClick={() => setShowAll(!showAll)} className="rounded-full bg-[#535699] hover:bg-[#43457a] text-white px-6 py-2" disabled={isLoading}>
          {showAll ? "Show Less" : "Show All Cities"}
        </Button>
      </div>
    </div>
  );
};