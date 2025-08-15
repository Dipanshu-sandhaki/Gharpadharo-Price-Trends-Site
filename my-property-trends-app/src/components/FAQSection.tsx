// src/components/FAQSection.tsx
"use client"
import React, { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "How is price change calculated?",
    answer:
      "The price change is calculated quarterly. The price revision is influenced by several market forces like changes in construction and labour costs, and ready reckoner rate/circle rate, among others."
  },
  {
    question: "What is Rental Yield?",
    answer:
      "Rental yield is the annual rental income from a property expressed as a percentage of its purchase price or current market value."
  },
  {
    question:
      "Is the area mentioned carpet, Built up Area (BUA), Super Built up Area (SBUA)?",
    answer:
      "Yes, the property listing specifies the type of area measurement—Carpet Area, Built-up Area, or Super Built-up Area."
  },
  {
    question: "What are the most appreciated localities/societies?",
    answer:
      "Localities with good infrastructure, connectivity, safety, and future development plans tend to be the most appreciated."
  },
  {
    question: "How to decide your budget for buying a house?",
    answer:
      "Assess your income, savings, existing loans, and future expenses. Allocate a budget where EMI does not exceed 30-40% of your monthly income."
  },
  {
    question: "What sort of location should one invest in?",
    answer:
      "Look for locations with upcoming infrastructure projects, good transport links, schools, hospitals, and employment hubs."
  },
  {
    question: "How to negotiate a deal?",
    answer:
      "Research market prices, be confident in your offer, highlight comparable properties, and be willing to walk away if terms are not favorable."
  }
]

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-10 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Frequently Asked Questions</h2>
      <div className="bg-white dark:bg-neutral-950 rounded-lg shadow-lg divide-y divide-gray-200 dark:divide-gray-800 transition-colors duration-300">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4">
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-800 dark:text-gray-100">
                Q. {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="text-gray-500 dark:text-gray-400" />
              )}
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQSection