"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Dot } from "recharts";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowUpRight, ArrowDownRight, LineChart as LineChartIcon } from "lucide-react";

// --- TYPE DEFINITIONS ---
type TrendDataPoint = {
  name: string;
  price: number;
};

type PriceTrendChartProps = {
  data: TrendDataPoint[];
  activeTrend: string;
  onTrendChange: (trend: string) => void;
  cityName: string;
  isLoading?: boolean; // NEW: Loading state prop
};

// --- HELPER: FORMATTER FOR LARGE NUMBERS ---
const formatPrice = (price: number) => `₹${Math.round(price).toLocaleString("en-IN")}`;

// --- HOOK: ANIMATED COUNTER ---
const useAnimatedCounter = (targetValue: number) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const spring = useSpring(targetValue, { damping: 25, stiffness: 120, mass: 1 });

  useEffect(() => {
    spring.set(targetValue);
  }, [targetValue, spring]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => setDisplayValue(latest));
    return unsubscribe;
  }, [spring]);

  return displayValue;
};

// --- COMPONENT: CUSTOM TOOLTIP ---
const CustomTooltip = ({ active, payload, label, onHover }: any) => {
  useEffect(() => {
    onHover(active && payload?.length ? payload[0].payload : null);
  }, [active, payload, onHover]);

  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-background/80 backdrop-blur-sm border rounded-lg shadow-xl">
        <p className="text-sm font-bold text-foreground">{formatPrice(payload[0].value)}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    );
  }
  return null;
};

// --- NEW: SKELETON LOADER COMPONENT ---
const ChartSkeleton = () => (
  <Card className="shadow-lg h-full w-full overflow-hidden">
    <CardHeader className="flex flex-col lg:flex-row justify-between lg:items-start p-6">
      <div>
        <Skeleton className="h-5 w-48 mb-2" />
        <Skeleton className="h-10 w-36 mb-3" />
        <Skeleton className="h-6 w-44" />
      </div>
      <Skeleton className="h-10 w-24 mt-4 lg:mt-0" />
    </CardHeader>
    <CardContent className="p-0">
      <div className="w-full h-[350px] p-6">
        <Skeleton className="h-full w-full" />
      </div>
    </CardContent>
  </Card>
);

export const PriceTrendChart: React.FC<PriceTrendChartProps> = ({ data, activeTrend, onTrendChange, cityName, isLoading = false }) => {
  const { resolvedTheme } = useTheme();
  const trendOptions = ["1Y", "3Y", "5Y"];
  const [activeData, setActiveData] = useState<TrendDataPoint | null>(null);

  const { endPrice, priceChange, growthPercentage, yAxisDomain, minDataPoint, maxDataPoint } = useMemo(() => {
    if (!data || data.length < 2) {
      const singlePrice = data?.[0]?.price || 0;
      return { endPrice: singlePrice, priceChange: 0, growthPercentage: "0.00", yAxisDomain: [singlePrice * 0.8, singlePrice * 1.2], minDataPoint: data?.[0], maxDataPoint: data?.[0] };
    }
    const start = data[0].price;
    const end = data[data.length - 1].price;
    const change = end - start;
    const percentage = start !== 0 ? ((change / start) * 100).toFixed(2) : "0.00";
    
    let minDp = data[0];
    let maxDp = data[0];
    for (const point of data) {
      if (point.price < minDp.price) minDp = point;
      if (point.price > maxDp.price) maxDp = point;
    }
    
    const padding = (maxDp.price - minDp.price) * 0.25;

    return {
      endPrice: end,
      priceChange: change,
      growthPercentage: percentage,
      yAxisDomain: [minDp.price - padding, maxDp.price + padding],
      minDataPoint: minDp,
      maxDataPoint: maxDp,
    };
  }, [data]);

  const animatedPrice = useAnimatedCounter(activeData ? activeData.price : endPrice);
  const isPositiveTrend = priceChange >= 0;

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isMin = payload.name === minDataPoint?.name && payload.price === minDataPoint?.price;
    const isMax = payload.name === maxDataPoint?.name && payload.price === maxDataPoint?.price;

    if (isMin || isMax) {
      const color = isMax ? (resolvedTheme === 'dark' ? '#4ade80' : '#16a34a') : (resolvedTheme === 'dark' ? '#f87171' : '#dc2626');
      const yPos = isMin ? cy + 15 : cy - 10;
      return (
        <g>
          <Dot {...props} r={5} fill={color} stroke="hsl(var(--background))" strokeWidth={2} />
          <text x={cx} y={yPos} textAnchor="middle" fill={color} fontSize="12px" fontWeight="bold">
            {isMax ? "High" : "Low"}
          </text>
        </g>
      );
    }
    return null;
  };

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <Card className="shadow-lg h-full flex flex-col items-center justify-center min-h-[450px] bg-secondary/50 p-6 text-center">
        <LineChartIcon className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-xl font-bold text-foreground">No Price Data Available</h3>
        <p className="text-muted-foreground">We couldn't find any trend data for {cityName}.</p>
      </Card>
    );
  }

  return (
    <motion.div key={activeTrend} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="shadow-lg h-full w-full overflow-hidden">
        <CardHeader className="flex flex-col md:flex-row justify-between md:items-start p-6">
          <div>
            <CardDescription>
              Price Trend for <span className="font-bold text-lg text-foreground">{cityName}</span> ({activeTrend})
            </CardDescription>
            <div className="text-3xl lg:text-4xl font-bold transition-colors duration-200 mt-1">
              {formatPrice(animatedPrice)}
            </div>
            <Badge variant={isPositiveTrend ? "default" : "destructive"} className="mt-2">
              {isPositiveTrend ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              {formatPrice(priceChange)} ({growthPercentage}%)
            </Badge>
          </div>
          <div className="flex space-x-1 bg-secondary p-1 rounded-lg mt-4 md:mt-0 shrink-0">
            {trendOptions.map((range) => (
              <Button key={range} onClick={() => onTrendChange(range)} variant="ghost" className={`rounded-md px-3 py-1 text-xs sm:text-sm font-semibold transition-all h-auto ${activeTrend === range ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:bg-background/50"}`}>
                {range}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 20 }} onMouseLeave={() => setActiveData(null)}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  {isPositiveTrend ? (
                    <>
                      <stop offset="5%" stopColor={resolvedTheme === 'dark' ? "#22c55e" : "#16a34a"} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={resolvedTheme === 'dark' ? "#22c55e" : "#16a34a"} stopOpacity={0}/>
                    </>
                  ) : (
                    <>
                      <stop offset="5%" stopColor={resolvedTheme === 'dark' ? "#ef4444" : "#dc2626"} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={resolvedTheme === 'dark' ? "#ef4444" : "#dc2626"} stopOpacity={0}/>
                    </>
                  )}
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="hsl(var(--border))" tickLine={false} axisLine={false} dy={10} interval="preserveStartEnd" />
              <YAxis hide={true} domain={yAxisDomain} />
              <Tooltip
                cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "3 3" }}
                content={<CustomTooltip onHover={setActiveData} />}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositiveTrend ? (resolvedTheme === 'dark' ? "#4ade80" : "#16a34a") : (resolvedTheme === 'dark' ? "#f87171" : "#dc2626")}
                strokeWidth={2.5}
                fill="url(#chartGradient)"
                dot={<CustomDot />}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", fill: "hsl(var(--background))", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};
