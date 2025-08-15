"use client";
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, RefreshCw, Plus, Minus, ArrowDownUp, Map, SearchX } from "lucide-react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { useTheme } from "next-themes";
import { geoCentroid } from "d3-geo";
import type { FeatureCollection } from 'geojson';
import type { Locality } from "@/data/propertyData";

// --- TYPE DEFINITIONS ---
type InternalLocality = Omit<Locality, 'growth' | 'avgPrice'> & {
    city: string;
    growth: number;
    avgPrice: number;
};
type StateData = { avgPrice: number; growth: number; };
type RegionalMarketDashboardProps = {
    allLocalities: InternalLocality[];
    stateData: Record<string, StateData>;
    geoData: FeatureCollection | null; 
    selectedCity: string | null;
};
type SortConfig = { key: keyof InternalLocality; direction: 'ascending' | 'descending'; };

// --- HOOK for Sorting Data ---
const useSortableData = (items: InternalLocality[], config: SortConfig | null = null) => {
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(config);

    const sortedItems = useMemo(() => {
        if (!items) return [];
        let sortableItems = [...items];
        if (sortConfig) {
            sortableItems.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];
                if (typeof valA === 'number' && typeof valB === 'number') {
                    return sortConfig.direction === 'ascending' ? valA - valB : valB - valA;
                }
                if (String(valA) < String(valB)) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (String(valA) > String(valB)) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key: keyof InternalLocality) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    return { items: sortedItems, requestSort, sortConfig };
};

// --- MAIN COMPONENT ---
export const RegionalMarketDashboard: React.FC<RegionalMarketDashboardProps> = ({
    allLocalities,
    stateData,
    geoData,
    selectedCity,
}) => {
    const { resolvedTheme } = useTheme();
    const [position, setPosition] = useState({ coordinates: [82.8, 23.5] as [number, number], zoom: 1.2 });
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [tooltipContent, setTooltipContent] = useState<string>("");
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const activeState = useMemo(() => {
        if (!selectedCity || !allLocalities || allLocalities.length === 0) return null;
        const cityLocality = allLocalities.find(loc => loc.city === selectedCity);
        return cityLocality ? cityLocality.state : null;
    }, [selectedCity, allLocalities]);

    useEffect(() => {
        if (activeState && geoData?.features) {
            const stateGeometry = geoData.features.find(
                (feature) => {
                    const stateName = feature?.properties?.st_nm;
                    return typeof stateName === 'string' && (stateName.includes(activeState) || activeState.includes(stateName));
                }
            );
            if (stateGeometry) {
                const centroid = geoCentroid(stateGeometry);
                setPosition({ coordinates: centroid, zoom: 5 });
            }
        } else {
            setPosition({ coordinates: [82.8, 23.5], zoom: 1.2 });
        }
    }, [activeState, geoData]);
    
    const { filteredAppreciating, filteredDepreciating } = useMemo(() => {
        if (!activeState) return { filteredAppreciating: [], filteredDepreciating: [] };
        const appreciating = allLocalities.filter(l => l.state === activeState && l.growth > 0);
        const depreciating = allLocalities.filter(l => l.state === activeState && l.growth <= 0);
        return { filteredAppreciating: appreciating, filteredDepreciating: depreciating };
    }, [allLocalities, activeState]);

    const { items: sortedAppreciating, requestSort: requestSortApp, sortConfig: sortConfigApp } = useSortableData(filteredAppreciating);
    const { items: sortedDepreciating, requestSort: requestSortDep, sortConfig: sortConfigDep } = useSortableData(filteredDepreciating);

    const colorScale = useMemo(() => {
        if (!stateData || Object.keys(stateData).length === 0) return () => "hsl(var(--border))";
        const growthRates = Object.values(stateData).map(d => d.growth);
        const domain = [Math.min(...growthRates), Math.max(...growthRates)];
        const positiveColors = resolvedTheme === 'dark' ? ["#064e3b", "#16a34a", "#4ade80"] : ["#dcfce7", "#4ade80", "#16a34a"];
        const negativeColors = resolvedTheme === 'dark' ? ["#7f1d1d", "#ef4444", "#f87171"] : ["#fee2e2", "#f87171", "#b91c1c"];
        return scaleQuantile<string>().domain(domain).range(domain[0] >= 0 ? positiveColors : domain[1] <= 0 ? negativeColors.reverse() : [...negativeColors.reverse(), ...positiveColors]);
    }, [stateData, resolvedTheme]);

    const getSortIcon = (key: keyof InternalLocality, config: SortConfig | null) => {
        if (!config || config.key !== key) return <ArrowDownUp className="h-3 w-3 ml-2 text-muted-foreground/50" />;
        return config.direction === 'ascending' ? <ArrowUpRight className="h-3 w-3 ml-2" /> : <ArrowDownRight className="h-3 w-3 ml-2" />;
    };

    useEffect(() => {
        const node = mapContainerRef.current;
        if (node) {
            const handleWheel = (e: WheelEvent) => e.preventDefault();
            node.addEventListener('wheel', handleWheel, { passive: false });
            return () => node.removeEventListener('wheel', handleWheel);
        }
    }, []);

    // Tooltip position tracking for individual geographies
    const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
        const { clientX, clientY } = e;
        const containerRect = mapContainerRef.current?.getBoundingClientRect();
        if (containerRect) {
            setTooltipPosition({ x: clientX - containerRect.left, y: clientY - containerRect.top });
        }
    };

    if (!selectedCity) {
        return (
            <Card className="shadow-lg w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">Regional Market Overview</CardTitle>
                    <CardDescription>Select a city to view micro-market performance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center bg-secondary/30 rounded-lg border-2 border-dashed">
                        <Map className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold">No City Selected</h3>
                        <p className="text-muted-foreground">Insights will appear here once you choose a city.</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-lg w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Regional Market Overview</CardTitle>
                <CardDescription>
                    Micro-market performance in {activeState ? `${activeState}, highlighting trends around ${selectedCity}.` : "India."}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                <Tabs defaultValue="appreciating" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="appreciating">Appreciating</TabsTrigger>
                        <TabsTrigger value="depreciating">Depreciating</TabsTrigger>
                    </TabsList>
                    <TabsContent value="appreciating" className="mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead onClick={() => requestSortApp('name')} className="cursor-pointer">Locality {getSortIcon('name', sortConfigApp)}</TableHead>
                                    <TableHead onClick={() => requestSortApp('avgPrice')} className="cursor-pointer">Avg. Price {getSortIcon('avgPrice', sortConfigApp)}</TableHead>
                                    <TableHead onClick={() => requestSortApp('growth')} className="cursor-pointer text-right">Growth {getSortIcon('growth', sortConfigApp)}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedAppreciating.length > 0 ? (
                                    sortedAppreciating.map((item) => (
                                        <TableRow key={item.name}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>₹{item.avgPrice.toLocaleString("en-IN")}</TableCell>
                                            <TableCell className="text-right text-green-500 font-medium">{item.growth > 0 ? '+' : ''}{item.growth}%</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                            <div className="flex items-center justify-center">
                                                <SearchX className="h-5 w-5 mr-2"/> No appreciating localities found in {activeState}.
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="depreciating" className="mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead onClick={() => requestSortDep('name')} className="cursor-pointer">Locality {getSortIcon('name', sortConfigDep)}</TableHead>
                                    <TableHead onClick={() => requestSortDep('avgPrice')} className="cursor-pointer">Avg. Price {getSortIcon('avgPrice', sortConfigDep)}</TableHead>
                                    <TableHead onClick={() => requestSortDep('growth')} className="cursor-pointer text-right">Growth {getSortIcon('growth', sortConfigDep)}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedDepreciating.length > 0 ? (
                                    sortedDepreciating.map((item) => (
                                        <TableRow key={item.name}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>₹{item.avgPrice.toLocaleString("en-IN")}</TableCell>
                                            <TableCell className="text-right text-red-500 font-medium">{item.growth}%</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                            <div className="flex items-center justify-center">
                                                <SearchX className="h-5 w-5 mr-2"/> No depreciating localities found in {activeState}.
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
                
                <div ref={mapContainerRef} className="relative min-h-[400px] lg:min-h-full bg-secondary/30 rounded-lg border overflow-hidden">
                    {tooltipContent && (
                        <div 
                            className="absolute z-10 p-2 text-xs bg-background border rounded-md shadow-lg pointer-events-none -translate-x-1/2 -translate-y-[calc(100%+10px)]"
                            style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
                            dangerouslySetInnerHTML={{ __html: tooltipContent }}
                        />
                    )}
                    {geoData ? (
                        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 800, center: [82.8, 23.5] }}>
                            <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={setPosition}>
                                <Geographies geography={geoData}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            const stateName = geo.properties.st_nm;
                                            const isSelected = stateName === activeState;
                                            const data = stateData[stateName as keyof typeof stateData];
                                            const fillColor = isSelected ? "hsl(var(--primary))" : (data ? colorScale(data.growth) : "hsl(var(--border))");
                                            
                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    fill={fillColor}
                                                    stroke={isSelected ? "hsl(var(--primary-foreground))" : resolvedTheme === 'dark' ? "#111827" : "#FFFFFF"}
                                                    strokeWidth={isSelected ? 1.5 : 0.5}
                                                    style={{
                                                        default: { outline: "none", transition: "fill 0.2s ease-in-out" },
                                                        hover: { outline: "none", fill: "hsl(var(--primary) / 0.8)" },
                                                        pressed: { outline: "none" },
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        const growth = data ? `<span class="${data.growth >= 0 ? 'text-green-500' : 'text-red-500'}">${data.growth}%</span>` : 'N/A';
                                                        setTooltipContent(`<strong>${stateName}</strong><br/>Growth: ${growth}`);
                                                        handleMouseMove(e);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setTooltipContent("");
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Geographies>
                            </ZoomableGroup>
                        </ComposableMap>
                    ) : <p className="text-center text-muted-foreground p-4">Map data is loading or could not be loaded.</p>}
                    <div className="absolute bottom-4 right-4 flex flex-col bg-card border rounded-md shadow-lg overflow-hidden">
                        <Button onClick={() => setPosition(p => ({ ...p, zoom: p.zoom * 1.5 }))} variant="ghost" size="icon" className="w-8 h-8 rounded-none border-b"><Plus size={16} /></Button>
                        <Button onClick={() => setPosition(p => ({ ...p, zoom: p.zoom / 1.5 }))} variant="ghost" size="icon" className="w-8 h-8 rounded-none border-b"><Minus size={16} /></Button>
                        <Button onClick={() => setPosition({ coordinates: [82.8, 23.5], zoom: 1.2 })} variant="ghost" size="icon" className="w-8 h-8 rounded-none"><RefreshCw size={14} /></Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};