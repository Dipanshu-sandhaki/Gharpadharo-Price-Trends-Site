"use client";
import React, { useState, useMemo, useEffect } from "react";

// --- Imports ---
import { allData, cityCardsData } from "@/data/propertyData";
import type { TrendOption, Locality } from "@/data/propertyData";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CityCardsSection } from "@/components/CityCardsSection";
import { PriceTrendChart } from "@/components/PriceTrendChart";
import { RegionalMarketDashboard } from "@/components/RegionalMarketDashboard";
import PopularTools from "@/components/PopularTools";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { LoadingIndicator, NotFoundMessage } from "@/components/ui/StatusIndicators";
import { LineChart, Loader2 } from "lucide-react";
import type { FeatureCollection } from 'geojson';

// --- Data for the dashboard ---
const stateData = {
  Maharashtra: { avgPrice: 9500, growth: 4.2 },
  Karnataka: { avgPrice: 8200, growth: 3.1 },
  Gujarat: { avgPrice: 7800, growth: -1.4 },
  "Uttar Pradesh": { avgPrice: 6200, growth: 2.3 },
  Delhi: { avgPrice: 11200, growth: 5.6 },
  Telangana: { avgPrice: 8900, growth: 4.8 },
  "Tamil Nadu": { avgPrice: 7600, growth: 2.9 },
  "West Bengal": { avgPrice: 6000, growth: 2.5 },
  Rajasthan: { avgPrice: 5700, growth: 3.1 },
  "Madhya Pradesh": { avgPrice: 4900, growth: 2.9 },
  Bihar: { avgPrice: 4500, growth: 2.4 },
  Punjab: { avgPrice: 5100, growth: 2.8 },
};

// --- Data Preparation ---
const allLocalities = Object.entries(allData).flatMap(([city, data]) => {
  const appreciating = data.appreciating.map(loc => ({
    ...loc,
    city,
    growth: parseFloat(loc.growth),
    avgPrice: parseFloat(loc.avgPrice.replace(/[^0-9.-]+/g, "")),
  }));
  const depreciating = data.depreciating.map(loc => ({
    ...loc,
    city,
    growth: parseFloat(loc.growth),
    avgPrice: parseFloat(loc.avgPrice.replace(/[^0-9.-]+/g, "")),
  }));
  return [...appreciating, ...depreciating];
});

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  // --- STATE MANAGEMENT ---
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null); // New state
  const [activeTrend, setActiveTrend] = useState<TrendOption>("1Y");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLink, setActiveLink] = useState("Price Trends");
  const [compareCount, setCompareCount] = useState(0);
  const [searchType, setSearchType] = useState("Buy");
  const [activeFilter, setActiveFilter] = useState("");
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    fetch("/india-states-geo.json")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(geoJsonData => {
        if (geoJsonData && geoJsonData.features) {
          setGeoData(geoJsonData as FeatureCollection);
        } else {
          console.error("Failed to load map data: The file is not a valid GeoJSON format or is missing the 'features' property.");
        }
      })
      .catch(error => console.error("Failed to load map data:", error));
  }, []);

  // --- HANDLER FUNCTIONS ---
  const handleSearch = (query: string) => {
    if (!query) {
      setSelectedCity(null);
      setSearchError(null);
      setStatusMessage(null); // Clear message
      return;
    }
    
    if (selectedCity && query.toLowerCase() === selectedCity.toLowerCase()) {
      setStatusMessage(`Displaying data for: "${query}"`);
      return;
    }

    const cityKey = Object.keys(allData).find(
      (k) => k.toLowerCase() === query.trim().toLowerCase()
    );

    if (cityKey) {
      setIsLoading(true);
      setSearchError(null);
      setStatusMessage(null);
      setTimeout(() => {
        setSelectedCity(cityKey);
        setIsLoading(false);
        setStatusMessage(`City selected: "${cityKey}"`);
      }, 1000); // Increased delay for better visibility
    } else {
      setSearchError(`Data not found for "${query}". Please try one of the displayed cities.`);
      setSelectedCity(null);
      setStatusMessage(null);
    }
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const currentCityData = useMemo(() => selectedCity ? allData[selectedCity] : null, [selectedCity]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        activeLink={activeLink}
        onNavClick={setActiveLink}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearch}
        compareCount={compareCount}
      />

      <main className="container mx-auto px-4 sm:px-6 py-12 space-y-16">
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={handleSearch}
          searchType={searchType}
          setSearchType={setSearchType}
          activeFilter={activeFilter}
          onFilterClick={handleFilterClick}
          isLoading={isLoading}
          statusMessage={statusMessage}
        />

        <CityCardsSection
          cities={cityCardsData}
          selectedCity={selectedCity}
          onCitySelect={handleSearch}
          isLoading={isLoading}
        />

        {/* Status Message Display */}
        {statusMessage && (
          <div className="my-4 p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-center text-green-700 dark:text-green-300 font-medium">
            {statusMessage}
          </div>
        )}

        {/* Error Message Display */}
        {searchError && (
          <NotFoundMessage
            message={searchError}
            onClear={() => {
              setSearchError(null);
              setSearchQuery("");
            }}
          />
        )}
        
        {/* --- Conditional Rendering for Insights --- */}
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Loader2 className="h-16 w-16 animate-spin text-[#535699] dark:text-[#a0a3ff]" />
          </div>
        ) : selectedCity && currentCityData ? (
          <>
            <PriceTrendChart
              data={currentCityData.priceTrend[activeTrend]}
              activeTrend={activeTrend}
              onTrendChange={(trend) => setActiveTrend(trend as TrendOption)}
              cityName={selectedCity}
            />
            <RegionalMarketDashboard
              allLocalities={allLocalities}
              stateData={stateData}
              geoData={geoData}
              selectedCity={selectedCity}
            />
          </>
        ) : (
          !searchError && (
            <div className="text-center py-16 px-6 border-2 border-dashed rounded-lg bg-secondary/30">
              <LineChart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold tracking-tight">View Detailed Market Insights</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Choose a city from the cards or the dropdown menu above to explore detailed price trends and regional micro-market performance.
              </p>
            </div>
          )
        )}
        
        <PopularTools />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}