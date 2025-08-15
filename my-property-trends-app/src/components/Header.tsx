"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

// A static list of cities for the autocomplete feature
const allCities = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata",
  "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane",
  "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad",
  "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Varanasi",
  "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Jabalpur", "Allahabad",
];

type HeaderProps = {
  activeLink: string;
  onNavClick: (link: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  compareCount: number;
};

type NavLinkProps = {
  name: string;
  activeLink: string;
  onClick: (name: string) => void;
  isMobile?: boolean;
};

const navLinks = ["Buy", "Sell", "Rent", "Price Trends"];

const NavLink: React.FC<NavLinkProps> = ({
  name,
  activeLink,
  onClick,
  isMobile = false,
}) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick(name);
    }}
    className={`transition-colors duration-200 ${
      isMobile
        ? "text-lg text-gray-800 dark:text-gray-100 font-medium block py-2 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        : "pb-1 border-b-2 border-transparent"
    } ${
      activeLink === name
        ? "font-bold text-[#535699] border-[#535699]"
        : "text-gray-600 dark:text-gray-300 hover:text-[#535699]"
    }`}
  >
    {name}
  </a>
);

export const Header: React.FC<HeaderProps> = ({
  activeLink,
  onNavClick,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  compareCount,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen, showSuggestions]);

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
    onSearchSubmit(city);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearchSubmit(searchQuery);
      setShowSuggestions(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex justify-between items-center px-4 sm:px-8 py-3 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors duration-300">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/gharpadharo-logo.png" alt="GharPadharo Logo" className="h-10 w-auto" />
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 hidden sm:inline">
            GharPadharo
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link}
              name={link}
              activeLink={activeLink}
              onClick={onNavClick}
            />
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Search (Desktop) */}
          <div ref={searchWrapperRef} className="relative hidden md:block">
            <Input
              className="rounded-full pl-10 pr-4 py-2 h-10 w-40 lg:w-56 
                         bg-slate-100 dark:bg-gray-800 
                         text-gray-900 dark:text-gray-100
                         border-transparent focus:w-64 transition-all 
                         focus:ring-2 focus:ring-[#535699]"
              placeholder="Search City..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => { if (searchQuery.length > 0) setShowSuggestions(true); }}
              onKeyDown={handleKeyDown}
            />
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-300 absolute left-3 top-1/2 -translate-y-1/2" />
            {showSuggestions && filteredCities.length > 0 && (
              <ul className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fadeInDown">
                {filteredCities.map((city) => (
                  <li
                    key={city}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Compare */}
          <Button 
            variant="outline" 
            className="rounded-full relative hidden sm:inline-flex border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
          >
            Compare
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {compareCount}
              </span>
            )}
          </Button>

          {/* Theme Toggle (Desktop) */}
          <ThemeToggle />

          {/* Contact */}
          <Button className="rounded-full bg-[#535699] hover:bg-[#43457a] hidden sm:inline-flex text-white">
            Contact Us
          </Button>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <Button
              onClick={() => setIsMenuOpen(true)}
              variant="ghost"
              size="icon"
              aria-label="Open menu"
            >
              <Menu className="text-gray-800 dark:text-gray-100" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          
          {/* Background Overlay */}
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Drawer */}
          <div
            ref={menuRef}
            className="w-72 max-w-full bg-white dark:bg-gray-900 h-full shadow-lg flex flex-col p-6 animate-slideIn transition-colors duration-300"
          >
            {/* Header Row */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">Menu</span>
              <Button
                onClick={() => setIsMenuOpen(false)}
                variant="ghost"
                size="icon"
                aria-label="Close menu"
              >
                <X className="text-gray-800 dark:text-gray-100" />
              </Button>
            </div>

            {/* Search for Mobile */}
            <div ref={searchWrapperRef} className="relative mb-6">
              <Input
                className="rounded-full pl-10 pr-4 py-2 h-10 
                           bg-slate-100 dark:bg-gray-800 
                           text-gray-900 dark:text-gray-100
                           border-transparent focus:ring-2 focus:ring-[#535699]"
                placeholder="Search City..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => { if (searchQuery.length > 0) setShowSuggestions(true); }}
                onKeyDown={handleKeyDown}
              />
              <Search className="w-5 h-5 text-gray-400 dark:text-gray-300 absolute left-3 top-1/2 -translate-y-1/2" />
              {showSuggestions && filteredCities.length > 0 && (
                <ul className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fadeInDown">
                  {filteredCities.map((city) => (
                    <li
                      key={city}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                      onClick={() => handleCitySelect(city)}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={link}
                  name={link}
                  activeLink={activeLink}
                  onClick={(name) => {
                    onNavClick(name);
                    setIsMenuOpen(false);
                  }}
                  isMobile
                />
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-6 space-y-3">
              <Button 
                variant="outline" 
                className="rounded-full w-full relative border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              >
                Compare
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {compareCount}
                  </span>
                )}
              </Button>

              {/* Theme Toggle (Mobile) */}
              <div className="w-full flex justify-center">
                <ThemeToggle />
              </div>

              <Button className="rounded-full bg-[#535699] hover:bg-[#43457a] w-full text-white">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
