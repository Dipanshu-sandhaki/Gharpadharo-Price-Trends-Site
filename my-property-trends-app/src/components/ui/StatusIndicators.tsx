// src/components/ui/StatusIndicators.tsx
"use client";

import { Button } from "./button";

export const LoadingIndicator = () => (
  <div className="flex justify-center items-center p-10 min-h-[300px]">
    <div className="flex items-center space-x-2 text-lg font-semibold text-muted-foreground">
      <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-primary"></div>
      <span>Loading Data...</span>
    </div>
  </div>
);

type NotFoundMessageProps = {
  message: string;
  onClear: () => void;
};

export const NotFoundMessage = ({ message, onClear }: NotFoundMessageProps) => (
  <div className="text-center p-10 bg-destructive/10 rounded-lg border border-destructive/20 min-h-[300px] flex flex-col justify-center items-center">
    <h3 className="text-xl font-bold text-destructive">
      Search Result Not Found
    </h3>
    <p className="text-md text-destructive/80 mt-2 mb-4 max-w-md mx-auto">{message}</p>
    <Button onClick={onClear} variant="ghost" className="text-primary hover:text-primary">
      Clear Search
    </Button>
  </div>
);
