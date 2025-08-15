// src/components/Footer.tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-200 dark:bg-gray-950 dark:text-gray-300 w-full shadow-lg mt-12 transition-colors duration-300">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Image
              src="/gharpadharo-logo.png"
              alt="GharPadharo Logo"
              width={36}
              height={36}
              className="rounded"
            />
            <h3 className="text-lg font-semibold text-white dark:text-gray-50">
              GharPadharo
            </h3>
          </div>
          <p className="text-sm">
            Price Trends, Insights, and Tools to help you make smarter property
            decisions. At GharPadharo, we empower home buyers, sellers, and
            investors with accurate market data, easy-to-use calculators, and
            expert guidance — so you can move forward with confidence whether
            you're buying your dream home or making a smart investment.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2 text-white dark:text-gray-50">
            Explore
          </h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                href="/about"
                className="hover:text-gray-50 dark:hover:text-gray-200 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/tools"
                className="hover:text-gray-50 dark:hover:text-gray-200 transition-colors"
              >
                Tools & Calculators
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-gray-50 dark:hover:text-gray-200 transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-gray-50 dark:hover:text-gray-200 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-2 text-white dark:text-gray-50">
            Resources
          </h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                href="/faq"
                className="hover:text-gray-50 dark:hover:text-gray-200 transition-colors"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-gray-50 dark:hover:text-gray-200 transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-gray-50 dark:hover:text-gray-200 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h4 className="font-semibold mb-2 text-white dark:text-gray-50">
            Stay Updated
          </h4>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-2 py-1 rounded bg-gray-700 text-gray-100 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-blue-600 py-1 rounded hover:bg-blue-500 transition text-white"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-3 mt-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            >
              <Facebook />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-white dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            >
              <Twitter />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            >
              <Instagram />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-white dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 dark:bg-black py-3 flex justify-center text-sm text-gray-300 dark:text-gray-500">
        © {year} GharPadharo. All rights reserved.
      </div>
    </footer>
  );
}
