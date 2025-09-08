// portfolio-dashboard.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { FutureVisionComponent } from "../future-vision/future-vision.component";
import { RoiEconomicsComponent } from "../roi-economics/roi-economics.component";
import { CarbonTaxTimelineComponent } from "../carbon-tax-timeline/carbon-tax-timeline.component";
import { InvestmentAnalysisComponent } from "../investment-analysis/investment-analysis.component";
import { StrategyVisualizationComponent } from "../strategy-visualization/strategy-visualization.component";
import { EmissionsBreakdownComponent, PortfolioConfig } from "../emissions-breakdown/emissions-breakdown.component";
import { GriPerformanceComponent } from "../gri-performance/gri-performance.component";
import { RoadToParisChartComponent } from "../road-to-paris-chart/road-to-paris-chart.component";
import { PortfolioHeaderComponent } from "../portfolio-header/portfolio-header.component";
import { PortfolioTarget, RoiEconomicsData } from '../../interfaces/porfolio.interfaces';

@Component({
  selector: 'app-portfolio-dashboard',
  templateUrl: './portfolio-dashboard.component.html',
  styleUrls: ['./portfolio-dashboard.component.css'],
  imports: [FutureVisionComponent, RoiEconomicsComponent, CarbonTaxTimelineComponent, InvestmentAnalysisComponent, StrategyVisualizationComponent, EmissionsBreakdownComponent, GriPerformanceComponent, RoadToParisChartComponent, PortfolioHeaderComponent]
})
export class PortfolioDashboardComponent implements OnInit {
  @ViewChild(PortfolioHeaderComponent) portfolioHeader!: PortfolioHeaderComponent;
  
  mounted = false;

  // Portfolio-specific configuration
  portfolioEmissionsConfig: PortfolioConfig = {
    countries: ['Baden-Württemberg', 'Niedersachsen', 'Hessen', 'Sachsen', 'Nordrhein-Westfalen', 'Hamburg'],
    sectors: [
      { name: 'Residential', color: '#E74C3C', enabled: true },
      { name: 'Commercial', color: '#3498DB', enabled: true },
      { name: 'Office', color: '#2ECC71', enabled: true },
      { name: 'Mixed', color: '#9B59B6', enabled: true },
      { name: 'Other', color: '#F39C12', enabled: true },
      { name: 'Individual', color: '#F1C40F', enabled: true }
    ]
  };

  // ROI Calculation Base Values (in thousands €) - these will come from API
  private modernisierungsumlageTsd = 3.9; // 3.9 tsd €
  private stromverkaufTsd = 200; // 200 tsd €
  private co2EinsparungTsd = 3100; // 3.1 M. € = 3100 tsd €
  private eigenanteilTsd = 15000; // Eigenanteil - adjust this value based on your actual data

  roadToParisData = [
    { year: '2025', value: 184.37, target: 180 },
    { year: '2029', value: 179.13, target: 175 },
    { year: '2035', value: 177.83, target: 170 },
    { year: '2040', value: 175.0, target: 165 },
    { year: '2045', value: 174.5, target: 160 }
  ];

  pieData = [
    { name: 'Paris Proof', value: 44, color: '#dc2626' },           
    { name: 'On CRREM Target', value: 26, color: '#0891b2' },       
    { name: 'Not on CRREM Target', value: 30, color: '#64748b' }   
  ];

  // Portfolio metrics (same structure as in PortfolioHeaderComponent)
  metrics = [
    { title: "Assets", value: "50.000", gradient: "from-blue-500/20 to-cyan-500/20", icon: "🏢", delay: 100 },
    { title: "Asset Type", value: "Mix", gradient: "from-purple-500/20 to-pink-500/20", icon: "📊", delay: 200 },
    { title: "Vermietete Fläche", value: "350.000 m²", gradient: "from-emerald-500/20 to-teal-500/20", icon: "📐", delay: 300 },
    { title: "Gewerbefläche", value: "300.000 m²", gradient: "from-amber-500/20 to-orange-500/20", icon: "🏪", delay: 400 },
    { title: "Wohnfläche", value: "50.000 m²", gradient: "from-rose-500/20 to-pink-500/20", icon: "🏠", delay: 500 },
    { title: "Leerstand", value: "2,3%", gradient: "from-red-500/20 to-rose-500/20", icon: "📉", delay: 600 },
    { title: "Miete p.a.", value: "3.050.000 €", gradient: "from-indigo-500/20 to-purple-500/20", icon: "💰", delay: 700 }
  ];

  // Enhanced emissions data with more comprehensive sector breakdowns
  emissionsByCountry = [
    { 
      country: 'Baden-Württemberg', 
      value: 27, 
      trend: '+2.1%',
      sectors: [
        { name: 'Residential', percentage: 35, color: '#E74C3C' },
        { name: 'Commercial', percentage: 25, color: '#3498DB' },
        { name: 'Office', percentage: 20, color: '#2ECC71' },
        { name: 'Mixed', percentage: 12, color: '#9B59B6' },
        { name: 'Other', percentage: 5, color: '#F39C12' },
        { name: 'Individual', percentage: 3, color: '#F1C40F' },
        { name: 'Industrial', percentage: 0, color: '#E67E22' },
        { name: 'Retail', percentage: 0, color: '#1ABC9C' }
      ]
    },
    { 
      country: 'Niedersachsen', 
      value: 18, 
      trend: '-1.3%',
      sectors: [
        { name: 'Residential', percentage: 30, color: '#E74C3C' },
        { name: 'Commercial', percentage: 28, color: '#3498DB' },
        { name: 'Office', percentage: 18, color: '#2ECC71' },
        { name: 'Mixed', percentage: 15, color: '#9B59B6' },
        { name: 'Other', percentage: 6, color: '#F39C12' },
        { name: 'Individual', percentage: 3, color: '#F1C40F' },
        { name: 'Industrial', percentage: 0, color: '#E67E22' },
        { name: 'Retail', percentage: 0, color: '#1ABC9C' }
      ]
    },
    { 
      country: 'Hessen', 
      value: 15, 
      trend: '+0.8%',
      sectors: [
        { name: 'Residential', percentage: 25, color: '#E74C3C' },
        { name: 'Commercial', percentage: 30, color: '#3498DB' },
        { name: 'Office', percentage: 25, color: '#2ECC71' },
        { name: 'Mixed', percentage: 12, color: '#9B59B6' },
        { name: 'Other', percentage: 5, color: '#F39C12' },
        { name: 'Individual', percentage: 3, color: '#F1C40F' },
        { name: 'Industrial', percentage: 0, color: '#E67E22' },
        { name: 'Retail', percentage: 0, color: '#1ABC9C' }
      ]
    },
    { 
      country: 'Sachsen', 
      value: 12, 
      trend: '-2.5%',
      sectors: [
        { name: 'Residential', percentage: 40, color: '#E74C3C' },
        { name: 'Commercial', percentage: 22, color: '#3498DB' },
        { name: 'Office', percentage: 20, color: '#2ECC71' },
        { name: 'Mixed', percentage: 10, color: '#9B59B6' },
        { name: 'Other', percentage: 5, color: '#F39C12' },
        { name: 'Individual', percentage: 3, color: '#F1C40F' },
        { name: 'Industrial', percentage: 0, color: '#E67E22' },
        { name: 'Retail', percentage: 0, color: '#1ABC9C' }
      ]
    },
    { 
      country: 'Nordrhein-Westfalen', 
      value: 8, 
      trend: '+1.2%',
      sectors: [
        { name: 'Residential', percentage: 45, color: '#E74C3C' },
        { name: 'Commercial', percentage: 20, color: '#3498DB' },
        { name: 'Office', percentage: 15, color: '#2ECC71' },
        { name: 'Mixed', percentage: 12, color: '#9B59B6' },
        { name: 'Other', percentage: 5, color: '#F39C12' },
        { name: 'Individual', percentage: 3, color: '#F1C40F' },
        { name: 'Industrial', percentage: 0, color: '#E67E22' },
        { name: 'Retail', percentage: 0, color: '#1ABC9C' }
      ]
    },
    { 
      country: 'Hamburg', 
      value: 6, 
      trend: '-0.9%',
      sectors: [
        { name: 'Residential', percentage: 38, color: '#E74C3C' },
        { name: 'Commercial', percentage: 22, color: '#3498DB' },
        { name: 'Office', percentage: 18, color: '#2ECC71' },
        { name: 'Mixed', percentage: 12, color: '#9B59B6' },
        { name: 'Other', percentage: 7, color: '#F39C12' },
        { name: 'Individual', percentage: 3, color: '#F1C40F' },
        { name: 'Industrial', percentage: 0, color: '#E67E22' },
        { name: 'Retail', percentage: 0, color: '#1ABC9C' }
      ]
    },
    // Additional countries available for configuration
    { 
      country: 'Berlin', 
      value: 10, 
      trend: '+1.5%',
      sectors: [
        { name: 'Residential', percentage: 42, color: '#E74C3C' },
        { name: 'Commercial', percentage: 25, color: '#3498DB' },
        { name: 'Office', percentage: 18, color: '#2ECC71' },
        { name: 'Mixed', percentage: 10, color: '#9B59B6' },
        { name: 'Other', percentage: 3, color: '#F39C12' },
        { name: 'Individual', percentage: 2, color: '#F1C40F' },
        { name: 'Industrial', percentage: 0, color: '#E67E22' },
        { name: 'Retail', percentage: 0, color: '#1ABC9C' }
      ]
    },
    { 
      country: 'Frankfurt', 
      value: 5, 
      trend: '-0.3%',
      sectors: [
        { name: 'Residential', percentage: 35, color: '#E74C3C' },
        { name: 'Commercial', percentage: 30, color: '#3498DB' },
        { name: 'Office', percentage: 20, color: '#2ECC71' },
        { name: 'Mixed', percentage: 10, color: '#9B59B6' },
        { name: 'Other', percentage: 3, color: '#F39C12' },
        { name: 'Individual', percentage: 2, color: '#F1C40F' },
        { name: 'Industrial', percentage: 0, color: '#E67E22' },
        { name: 'Retail', percentage: 0, color: '#1ABC9C' }
      ]
    },
    { 
      country: 'Bremen', 
      value: 7, 
      trend: '+0.8%',
      sectors: [
        { name: 'Residential', percentage: 32, color: '#E74C3C' },
        { name: 'Commercial', percentage: 28, color: '#3498DB' },
        { name: 'Office', percentage: 22, color: '#2ECC71' },
        { name: 'Mixed', percentage: 12, color: '#9B59B6' },
        { name: 'Other', percentage: 4, color: '#F39C12' },
        { name: 'Individual', percentage: 2, color: '#F1C40F' },
        { name: 'Industrial', percentage: 0, color: '#E67E22' },
        { name: 'Retail', percentage: 0, color: '#1ABC9C' }
      ]
    },
    { 
      country: 'München', 
      value: 4, 
      trend: '-1.2%',
      sectors: [
        { name: 'Residential', percentage: 38, color: '#E74C3C' },
        { name: 'Commercial', percentage: 25, color: '#3498DB' },
        { name: 'Office', percentage: 20, color: '#2ECC71' },
        { name: 'Mixed', percentage: 12, color: '#9B59B6' },
        { name: 'Other', percentage: 3, color: '#F39C12' },
        { name: 'Individual', percentage: 2, color: '#F1C40F' },
        { name: 'Industrial', percentage: 0, color: '#E67E22' },
        { name: 'Retail', percentage: 0, color: '#1ABC9C' }
      ]
    },
  ];

  griPerformanceData = [
    { label: "Energie", value: "3000tsd kWh", change: "-9.0%", positive: true, icon: "⚡" },
    { label: "CO₂ Emissions", value: "200 Tons", change: "-9.0%", positive: true, icon: "🌿" },
    { label: "CO2 - Steuer", value: "€1.3Mio", change: "-25%", positive: false, icon: "💸" },
    { label: "Energiekosten", value: "30.000 €", change: "-17%", positive: false, icon: "💶" },
    { label: "Leerstand", value: "2.0%", change: "-5.0%", positive: true, icon: "🏢" },
    { label: "Mietrendite", value: "4.5%", change: "+0.2%", positive: true, icon: "📈" }
  ];

  energieverbrauch = "411 tsd kWh";
  co2Emissionen = "230 ton";
  kwhPerM2a = "111 kWh";
  kgCo2PerM2a = "65.7 kg";
  crremKonform = "17%";
  strandedAssets = "83%";
  co2Steuer = "1,5 Mio. €";

  // ROI Economics Data - only calculate netRoi, other values come from API
  get roiEconomicsData(): RoiEconomicsData {
    const netRoi = this.calculateNetRoi();
    const co2TaxSavings = this.calculateCo2TaxSavings();

    return {
      netRoi: `${netRoi.toFixed(1)}%`,
      modernizationCreditCosts: "800 tsd €",
      modernizationSurcharge: "3.9 tsd €", 
      electricityRevenue: "200 tsd €",
      co2TaxSavings: co2TaxSavings
    };
  }

  // Extract total assets count from metrics
  get totalAssetsCount(): number {
    const assetsMetric = this.metrics.find(metric => metric.title === "Assets");
    if (assetsMetric) {
      // Convert "50.000" to 50000
      const cleanValue = assetsMetric.value.replace(/\./g, '').replace(/[^\d]/g, '');
      return parseInt(cleanValue) || 50000;
    }
    return 50000; // fallback
  }

  // Energy Performance Grid Data - Simple structure for app-metric-card
  energyPerformanceData = [
    {
      title: "Energieverbrauch",
      value: this.energieverbrauch,
      gradient: "from-cyan-500/20 to-blue-500/20",
      trend: "-5.2%",
      delay: 800
    },
    {
      title: "CO2-Emissionen", 
      value: this.co2Emissionen,
      gradient: "from-green-500/20 to-emerald-500/20",
      trend: "-8.1%",
      delay: 900
    },
    {
      title: "In kWh/m2a",
      value: this.kwhPerM2a,
      gradient: "from-sky-500/20 to-cyan-500/20",
      trend: "-3.4%",
      delay: 1000
    },
    {
      title: "In kg CO₂/m2a",
      value: this.kgCo2PerM2a, 
      gradient: "from-violet-500/20 to-purple-500/20",
      trend: "-6.8%",
      delay: 1100
    },
    {
      title: "CRREM-Konform",
      value: this.crremKonform,
      gradient: "from-emerald-500/20 to-green-500/20", 
      trend: "+3.2%",
      delay: 1200
    },
    {
      title: "Strandet A.",
      value: this.strandedAssets,
      gradient: "from-red-500/20 to-orange-500/20",
      trend: "-2.1%", 
      delay: 1300
    },
    {
      title: "CO2-Steuer",
      value: this.co2Steuer,
      gradient: "from-orange-500/20 to-red-500/20",
      trend: "+15.3%",
      delay: 1400
    }
  ];

  carbonTaxData = [
    {
      year: '2025',
      rate: '(55 €/tCO₂)',
      amount: this.co2Steuer,
      color: 'from-blue-500/30 to-cyan-500/30'
    },
    {
      year: '2026',
      rate: '(65 €/tCO₂)',
      amount: this.calculateCarbonTax(65),
      color: 'from-purple-500/30 to-blue-500/30'
    },
    {
      year: '2027',
      rate: '(75 €/tCO₂)*',
      amount: this.calculateCarbonTax(75),
      color: 'from-orange-500/30 to-red-500/30'
    },
    {
      year: '2030',
      rate: '(200 €/tCO₂)**',
      amount: this.calculateCarbonTax(200),
      color: 'from-red-500/30 to-pink-500/30'
    }
  ];

  // In your parent component (portfolio-dashboard.component.ts)
  visionMetrics: PortfolioTarget[] = [
    { metric: 'EERL', icon: 'E', currentValue: 'C', targetValue: 'A', isRating: true },
    { metric: 'Wert', icon: '💰', currentValue: 750, targetValue: 910, unit: 'M. €' },
    { metric: 'Miete', icon: '🏢', currentValue: 60, targetValue: 72, unit: 'M. €' },
    { metric: 'Mietrendite', icon: '📈', currentValue: 4.5, targetValue: 6.3, unit: '%' },
    { metric: 'kWh /m²', icon: '⚡', currentValue: 200, targetValue: 40 },
    { metric: 'CO₂ kg /m²', icon: '🌱', currentValue: 57, targetValue: 11 }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.mounted = true;
    }, 100);
  }

  /**
   * Calculate Net ROI using the formula:
   * Net ROI = (Modernisierungsumlage + Einnahmen Stromverkauf p.a. + Einsparung CO2 p.a.) / Eigenanteil in tsd €
   */
  private calculateNetRoi(): number {
    const numerator = this.modernisierungsumlageTsd + this.stromverkaufTsd + this.co2EinsparungTsd;
    const netRoi = (numerator / this.eigenanteilTsd) * 100; // Convert to percentage
    return netRoi;
  }

  private calculateCarbonTax(rate: number): string {
    const co2Tons = parseFloat(this.co2Emissionen);
    const amount = co2Tons * rate * 1000;
    return `${(amount / 1000000).toFixed(1)} Mio. €`;
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toLocaleDateString('de-DE') + ' • ' + 
           now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' CET';
  }

  // Handle emissions configuration changes
  onEmissionsConfigChanged(config: PortfolioConfig): void {
    this.portfolioEmissionsConfig = config;
    console.log('Portfolio emissions configuration updated:', config);
    
    // Here you could save the configuration to API
    // this.portfolioService.updateEmissionsConfig(config);
  }

  // Add this helper method to extract numeric values from CO2 tax strings
  private extractCo2TaxValue(taxString: string): number {
    
    // Handle different formats: "1,5 Mio. €", "€1.3Mio", "1.5 M. €"
    const cleanString = taxString.toLowerCase();
    
    // Look for number followed by million indicator
    const patterns = [
      /(\d+[,.]?\d*)\s*(mio|million|m\.)/,  // "1,5 Mio" or "1.3Mio" or "1.5 M."
      /€(\d+[,.]?\d*)(mio|million|m\.)/,    // "€1.3Mio"
    ];
    
    for (const pattern of patterns) {
      const match = cleanString.match(pattern);
      if (match) {
        // Replace comma with dot for proper parsing
        const numberStr = match[1].replace(',', '.');
        const value = parseFloat(numberStr);
              
        if (match[2]) { // Has million indicator
          return value * 1000000;
        }
      }
    }
    
    console.log('No match found, returning 0');
    return 0;
  }

  // Add this method to calculate CO2 tax savings
  private calculateCo2TaxSavings(): string {
    // Get CO2 tax from portfolio header (co2Steuer = "1,5 Mio. €")
    const headerCo2Tax = this.extractCo2TaxValue(this.co2Steuer);
    
    // Get CO2 tax from GRI performance (find CO2-Steuer item)
    const griCo2Item = this.griPerformanceData.find(item => item.label === "CO2 - Steuer");
    const griCo2Tax = griCo2Item ? this.extractCo2TaxValue(griCo2Item.value) : 0;
    
    // Calculate savings: header - gri
    const savings = headerCo2Tax - griCo2Tax;
    
    // Format result
    if (savings >= 1000000) {
      return `${(savings / 1000000).toFixed(1)} M. €`;
    } else if (savings >= 1000) {
      return `${(savings / 1000).toFixed(0)} tsd €`;
    } else {
      return `${savings.toFixed(0)} €`;
    }
  }
}