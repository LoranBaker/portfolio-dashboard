// interfaces/portfolio.interfaces.ts
export interface RoadToParisData {
  year: string;
  value: number;
  target: number;
}

export interface PieData {
  name: string;
  value: number;
  color: string;
}

export interface SectorData {
  name: string;
  percentage: number;
  color: string;
}

export interface EmissionData {
  country: string;
  value: number;
  trend: string;
  sectors: SectorData[];
}

export interface GriPerformanceItem {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
}

export interface CarbonTaxItem {
  year: string;
  rate: string;
  amount: string;
  color: string;
}

export interface RoiEconomicsData {
  netRoi: string;
  modernizationCreditCosts: string;
  modernizationSurcharge: string;
  electricityRevenue: string;
  co2TaxSavings: string;
}

export interface InvestmentData {
  capexCosts: number; // in thousands €
  funding: number; // in thousands €
}

export interface EnergyConsumption {
  current: number; // kWh
  projected: number; // kWh after investment
  unit: string; // "kWh"
}

export interface EnergyCosts {
  current: number; // €
  projected: number; // €
  unit: string; // "€"
}

export interface CO2Emissions {
  current: number; // t CO₂
  projected: number; // t CO₂
  unit: string; // "t CO₂"
}

export interface EnergyBilanceData {
  consumption: EnergyConsumption;
  costs: EnergyCosts;
  emissions: CO2Emissions;
}

export interface InvestmentAnalysisData {
  investment: InvestmentData;
  energyBilance: EnergyBilanceData;
}

export interface PortfolioTarget {
  metric: string;
  icon: string;
  currentValue: string | number;
  targetValue: string | number;
  unit?: string;
  isRating?: boolean;
}