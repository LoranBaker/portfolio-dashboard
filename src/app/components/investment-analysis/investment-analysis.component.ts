// investment-analysis.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentAnalysisData } from '../../interfaces/porfolio.interfaces';

// Dummy data
export const DUMMY_INVESTMENT_ANALYSIS: InvestmentAnalysisData = {
  investment: {
    capexCosts: 5000, 
    funding: 1100
    // ownShare is calculated: capexCosts - funding = 3.900 tsd €
  },
  energyBilance: {
    consumption: {
      current: 60500,
      projected: 12300,
      unit: "kWh"
    },
    costs: {
      current: 11900,
      projected: 4900,
      unit: "€"
    },
    emissions: {
      current: 13.6,
      projected: 21.1,
      unit: "t CO₂"
    }
  }
};

// API Service interface
export interface InvestmentAnalysisApiService {
  getInvestmentAnalysis(portfolioId?: string): Promise<InvestmentAnalysisData>;
  updateInvestmentAnalysis(data: InvestmentAnalysisData): Promise<InvestmentAnalysisData>;
}

@Component({
  selector: 'app-investment-analysis',
  template: `
    <div [class]="'backdrop-blur-3xl bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 ' + (mounted ? 'animate-fade-in-up' : 'opacity-0')"
          style="animation-delay: 1900ms;">
      <div class="p-8">
        <!-- Combined Header with two sections -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          
          <!-- Left Section: Investment & Förderung -->
          <div class="space-y-4">
            <div class="flex items-center h-12">
              <span class="text-2xl mr-4">💼</span>
              <div>
                <h3 class="text-xl font-bold text-white leading-tight">Investition & Förderung</h3>
              </div>
            </div>
            
            <div class="grid grid-cols-1 gap-3">
              <div class="p-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl border border-blue-300/30 hover:border-blue-300/50 transition-all duration-300 h-16 flex items-center">
                <div class="flex justify-between items-center w-full">
                  <span class="text-white/90 font-medium text-sm whitespace-nowrap">CAPEX-Kosten</span>
                  <span class="font-bold text-blue-300 text-lg whitespace-nowrap">{{ formatNumber(data.investment.capexCosts) }}<span class="text-sm ml-1 text-blue-200">tsd</span></span>
                </div>
              </div>
              
              <div class="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-300/30 hover:border-green-300/50 transition-all duration-300 h-16 flex items-center">
                <div class="flex justify-between items-center w-full min-w-0">
                  <span class="text-white/90 font-medium text-sm flex-shrink-0">Förderungen ({{ getFundingPercentage() }}%)</span>
                  <span class="font-bold text-green-300 text-lg whitespace-nowrap ml-2">{{ formatNumber(data.investment.funding) }}<span class="text-sm ml-1 text-green-200">tsd</span></span>
                </div>
              </div>
              
              <div class="p-4 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-2xl border border-purple-300/30 hover:border-purple-300/50 transition-all duration-300 h-16 flex items-center">
                <div class="flex justify-between items-center w-full">
                  <span class="text-white/90 font-medium text-sm whitespace-nowrap">Eigenanteil</span>
                  <span class="font-bold text-purple-300 text-lg whitespace-nowrap">{{ formatNumber(data.investment.capexCosts - data.investment.funding) }}<span class="text-sm ml-1 text-purple-200">tsd</span></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Section: Energiekosten & -bilanz -->
          <div class="space-y-4">
            <div class="flex items-start h-12">
              <span class="text-2xl mr-4 mt-1">⚡</span>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-white leading-tight">Energiekosten & -bilanz und Emissionen</h3>
              </div>
            </div>
            
            <div class="grid grid-cols-1 gap-3">
              <!-- Energy Row -->
              <div class="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-300/30 hover:border-cyan-300/50 transition-all duration-300 h-16 flex items-center">
                <div class="flex justify-between items-center w-full">
                  <span class="text-white/90 font-medium text-sm whitespace-nowrap">{{ formatNumber(data.energyBilance.consumption.current) }}<span class="text-sm ml-1 text-cyan-200">{{ data.energyBilance.consumption.unit }}</span></span>
                  <div class="flex items-center gap-2 whitespace-nowrap">
                    <span class="text-green-400 text-lg">→</span>
                    <span class="font-bold text-green-300 text-lg">{{ formatNumber(data.energyBilance.consumption.projected) }}<span class="text-sm ml-1 text-green-200">{{ data.energyBilance.consumption.unit }}</span></span>
                  </div>
                </div>
              </div>
              
              <!-- Cost Row -->
              <div class="p-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl border border-orange-300/30 hover:border-orange-300/50 transition-all duration-300 h-16 flex items-center">
                <div class="flex justify-between items-center w-full">
                  <span class="text-white/90 font-medium text-sm whitespace-nowrap">{{ formatNumber(data.energyBilance.costs.current) }}<span class="text-sm ml-1 text-orange-200">{{ data.energyBilance.costs.unit }}</span></span>
                  <div class="flex items-center gap-2 whitespace-nowrap">
                    <span class="text-green-400 text-lg">→</span>
                    <span class="font-bold text-green-300 text-lg">{{ formatNumber(data.energyBilance.costs.projected) }}<span class="text-sm ml-1 text-green-200">{{ data.energyBilance.costs.unit }}</span></span>
                  </div>
                </div>
              </div>
              
              <!-- CO2 Row -->
              <div class="p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl border border-emerald-300/30 hover:border-emerald-300/50 transition-all duration-300 h-16 flex items-center">
                <div class="flex justify-between items-center w-full">
                  <span class="text-white/90 font-medium text-sm whitespace-nowrap">{{ data.energyBilance.emissions.current }}<span class="text-sm ml-1 text-emerald-200">{{ data.energyBilance.emissions.unit }}</span></span>
                  <div class="flex items-center gap-2 whitespace-nowrap">
                    <span class="text-green-400 text-lg">→</span>
                    <span class="font-bold text-green-300 text-lg">{{ data.energyBilance.emissions.projected }}<span class="text-sm ml-1 text-green-200">{{ data.energyBilance.emissions.unit }}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./investment-analysis.component.css'],
  imports: [CommonModule]
})
export class InvestmentAnalysisComponent implements OnInit {
  @Input() mounted = false;
  @Input() investmentData?: InvestmentAnalysisData;

  data: InvestmentAnalysisData = DUMMY_INVESTMENT_ANALYSIS;

  ngOnInit(): void {
    // Use provided data or fallback to dummy data
    if (this.investmentData) {
      this.data = this.investmentData;
    }
  }

  // Helper method to format numbers with thousand separators
  formatNumber(value: number): string {
    return value.toLocaleString('de-DE');
  }

  // Calculate funding percentage of total CAPEX costs
  getFundingPercentage(): number {
    return Math.round((this.data.investment.funding / this.data.investment.capexCosts) * 100);
  }

  // Helper methods for calculations
  get totalInvestment(): number {
    return this.data.investment.capexCosts;
  }

  get netInvestment(): number {
    return this.data.investment.capexCosts - this.data.investment.funding;
  }

  get energySavings(): number {
    return this.data.energyBilance.consumption.current - this.data.energyBilance.consumption.projected;
  }

  get costSavings(): number {
    return this.data.energyBilance.costs.current - this.data.energyBilance.costs.projected;
  }

  get co2Reduction(): number {
    return this.data.energyBilance.emissions.current - this.data.energyBilance.emissions.projected;
  }

  get energySavingsPercentage(): number {
    return Math.round((this.energySavings / this.data.energyBilance.consumption.current) * 100);
  }

  get costSavingsPercentage(): number {
    return Math.round((this.costSavings / this.data.energyBilance.costs.current) * 100);
  }
}