"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Map, Calculator, Home, ArrowLeftRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { EmiCalculatorTool } from "@/components/tools/EmiCalculatorTool";
import { PropertyEvaluatorTool } from "@/components/tools/PropertyEvaluatorTool";
import { AreaConverterTool } from "@/components/tools/AreaConverterTool";

// --- TYPE DEFINITIONS ---
type ToolMeta = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  widthClass?: string;
};

const PopularTools: React.FC = () => {
  const [openToolId, setOpenToolId] = useState<string | null>(null);

  const tools: ToolMeta[] = [
    {
      id: "emi",
      name: "EMI Calculator",
      description: "Estimate monthly EMI for a loan",
      icon: <Calculator className="h-8 w-8 text-green-500 dark:text-green-400" />,
      component: <EmiCalculatorTool />,
    },
    {
      id: "evaluator",
      name: "Property Evaluator",
      description: "Get a quick price range estimate",
      icon: <Home className="h-8 w-8 text-orange-500 dark:text-orange-400" />,
      component: <PropertyEvaluatorTool />,
    },
    {
      id: "area",
      name: "Area Converter",
      description: "Convert between sq.ft, sq.m, acres",
      icon: <ArrowLeftRight className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />,
      component: <AreaConverterTool />,
    },
  ];

  return (
    <section>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Popular Tools</h2>
        <p className="text-muted-foreground dark:text-gray-400 mt-2">
          Useful calculators & insights to help you decide faster.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card
            key={tool.id}
            onClick={() => setOpenToolId(tool.id)}
            className="group cursor-pointer overflow-hidden text-left transition-all hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-neutral-950 border-gray-200 dark:border-gray-800"
            aria-haspopup="dialog"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-lg bg-secondary dark:bg-gray-800">{tool.icon}</div>
              <div>
                <CardTitle className="text-gray-900 dark:text-gray-100">{tool.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground dark:text-gray-400">{tool.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {tools.map((tool) => (
        <Modal
          key={tool.id}
          isOpen={openToolId === tool.id}
          onClose={() => setOpenToolId(null)}
          title={tool.name}
          maxWidth={tool.widthClass}
        >
          <div className="py-2">{tool.component}</div>
        </Modal>
      ))}
    </section>
  );
};

export default PopularTools;