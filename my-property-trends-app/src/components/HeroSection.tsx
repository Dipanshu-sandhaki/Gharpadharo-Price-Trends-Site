"use client";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Loader2, TrendingUp } from "lucide-react";

type HeroSectionProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  searchType: string;
  setSearchType: (type: string) => void;
  activeFilter: string;
  onFilterClick: (filter: string) => void;
  isLoading: boolean;
  statusMessage: string | null;
};

const popularFilters = ["Top Metros", "New Projects", "Plots"];

const allCities = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata",
  "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane",
  "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad",
  "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Varanasi",
  "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Jabalpur", "Allahabad",
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  searchType,
  setSearchType,
  activeFilter,
  onFilterClick,
  isLoading,
  statusMessage,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = allCities.filter(city =>
        city.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city: string) => {
    setSearchQuery(city);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <div className="relative text-center p-6 sm:p-12 md:p-16 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e0e7ff] via-white to-[#f0f9ff] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] animate-gradientMove"></div>

      {/* Radial Glow Lights */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-400/30 dark:bg-purple-500/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/30 dark:bg-blue-500/20 rounded-full blur-[100px]"></div>

      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: "url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Professional Price Trends Logo */}
        <div className="flex items-center space-x-3 text-[#535699] dark:text-[#a0a3ff] mb-5 drop-shadow-md">
          <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 stroke-[2.5]" />
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Price Trends
          </h2>
        </div>

        {/* Headings */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 drop-shadow-sm">
          Discover Real Estate Insights
        </h1>
        <p className="text-md sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Get the latest data on property valuations, trends, and market
          analysis for cities across India.
        </p>

        {/* Search Section with Autocomplete */}
        <div
          ref={wrapperRef}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full max-w-3xl mx-auto p-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-md rounded-2xl shadow-xl space-y-2 sm:space-y-0 sm:space-x-2"
        >
          {/* Select Component */}
          <Select value={searchType} onValueChange={setSearchType} disabled={isLoading}>
            <SelectTrigger
              aria-label="Select property type"
              className="w-full sm:w-[150px] rounded-xl border-none focus:ring-0 bg-gray-100 dark:bg-gray-600 font-semibold text-gray-700 dark:text-gray-200"
            >
              <SelectValue placeholder="Purpose" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border dark:border-gray-700">
              <SelectItem value="Buy">Buy</SelectItem>
              <SelectItem value="Rent">Rent</SelectItem>
              <SelectItem value="Sell">Sell</SelectItem>
            </SelectContent>
          </Select>

          {/* Input with Autocomplete */}
          <div className="relative w-full">
            <Input
              aria-label="Search for city, locality, or project"
              className="w-full rounded-xl px-4 h-12 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-[#535699] dark:focus:border-[#a0a3ff] focus:ring-2 focus:ring-[#535699] dark:focus:ring-[#a0a3ff] bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
              placeholder="Enter city, locality, or project..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                if (searchQuery.length > 0) setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            {showSuggestions && filteredCities.length > 0 && (
              <ul className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fadeInDown">
                {filteredCities.map((city) => (
                  <li
                    key={city}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                    onClick={() => {
                      handleCitySelect(city);
                      onSearchSubmit(city);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search Button */}
          <Button
            aria-label="Search"
            className="w-full sm:w-auto h-12 rounded-xl bg-[#535699] hover:bg-[#43457a] dark:bg-[#a0a3ff] dark:hover:bg-[#8e90e0] text-base font-semibold text-white dark:text-gray-900 flex items-center justify-center transition-colors"
            onClick={() => onSearchSubmit(searchQuery)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                <span>Search</span>
              </>
            )}
          </Button>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <p className="mt-4 text-sm font-medium text-green-600 dark:text-green-400">
            {statusMessage}
          </p>
        )}

        {/* Popular Filters */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {popularFilters.map((filter) => (
            <Button
              key={filter}
              onClick={() => {
                onFilterClick(filter);
                onSearchSubmit(filter);
              }}
              variant="ghost"
              className={`rounded-full text-xs sm:text-sm px-4 py-2 font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-[#535699] text-white shadow-sm hover:bg-[#43457a] dark:bg-[#a0a3ff] dark:text-gray-900 dark:hover:bg-[#8e90e0]"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              disabled={isLoading}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
