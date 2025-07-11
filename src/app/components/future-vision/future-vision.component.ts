import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioTarget, GriPerformanceItem } from '../../interfaces/porfolio.interfaces';

@Component({
  selector: 'app-future-vision',
  template: `
    <div [class]="'mt-8 backdrop-blur-3xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-[2rem] border border-slate-300/30 shadow-2xl hover:shadow-3xl transition-all duration-700 ' + (mounted ? 'animate-fade-in-up' : 'opacity-0')"
          style="animation-delay: 2200ms;">
      <div class="p-8">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center border border-purple-400/30 backdrop-blur-sm mr-4">
              <span class="text-2xl">🎯</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">Portfolio-targets</h3>
              <p class="text-white/60 text-sm">Strategic goals & performance metrics</p>
            </div>
          </div>
          
          <!-- Dynamic Year Selector -->
          <div class="flex items-center space-x-4">
            <div class="bg-gradient-to-r from-slate-600/80 to-slate-700/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-slate-400/40 shadow-lg">
              <div class="flex items-center space-x-3">
                <label class="text-white/80 text-sm font-medium">Target Year:</label>
                <select 
                  [(ngModel)]="selectedTargetYear"
                  (ngModelChange)="onYearChange($event)"
                  class="bg-slate-800/80 border border-slate-500/50 rounded-xl px-3 py-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all">
                  <option *ngFor="let year of availableYears" [value]="year">{{ year }}</option>
                </select>
              </div>
            </div>
            <div class="bg-gradient-to-r from-purple-600/80 to-indigo-600/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-purple-400/40 shadow-lg">
              <div class="text-center">
                <div class="text-purple-200 text-xs font-medium uppercase tracking-wide">Selected Year</div>
                <span class="text-white text-xl font-bold">{{ selectedTargetYear }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Year Progress Indicator -->
        <div class="mb-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-4 border border-indigo-400/20">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <span class="text-indigo-400 text-lg">⏱️</span>
              <div>
                <div class="text-white/90 font-medium">Timeline: {{ getYearsFromNow() }} years from now</div>
                <div class="text-white/60 text-sm">{{ getTimelineDescription() }}</div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-24 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" 
                     [style.width.%]="getProgressPercentage()"></div>
              </div>
              <span class="text-indigo-400 text-sm font-medium">{{ getProgressPercentage() }}%</span>
            </div>
          </div>
        </div>
        
        <!-- Enhanced Table Structure -->
        <div class="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-lg rounded-3xl border border-slate-500/30 overflow-hidden shadow-xl">
          <!-- Table Header -->
          <div class="bg-gradient-to-r from-slate-600/60 to-slate-700/60 backdrop-blur-sm border-b border-slate-500/30">
            <div class="grid grid-cols-4 items-center p-6">
              <div class="text-white/90 font-bold text-sm uppercase tracking-wider">Metric</div>
              <div class="text-center text-white/90 font-bold text-sm uppercase tracking-wider">Current</div>
              <div class="text-center text-white/90 font-bold text-sm uppercase tracking-wider">Target {{ selectedTargetYear }}</div>
              <div class="text-center text-white/90 font-bold text-sm uppercase tracking-wider">Change</div>
            </div>
          </div>
          
          <!-- Table Rows -->
          <div class="divide-y divide-slate-600/30">
            <div *ngFor="let target of calculatedPortfolioTargets; let isLast = last" 
                 [class]="'group hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-indigo-500/10 transition-all duration-300' + (isLast ? ' rounded-b-3xl' : '')">
              <div class="grid grid-cols-4 items-center p-6">
                <!-- Metric Name with Icon -->
                <div class="flex items-center space-x-3">
                  <div [class]="'w-8 h-8 bg-gradient-to-br ' + getIconGradient(target.metric) + ' rounded-xl flex items-center justify-center border ' + getIconBorder(target.metric)">
                    <span [class]="getIconClass(target.metric) + ' text-xs'">{{ target.icon }}</span>
                  </div>
                  <span class="text-white font-medium">{{ target.metric }}</span>
                </div>
                
                <!-- Current Value -->
                <div class="text-center">
                  <div class="space-y-1" *ngIf="!target.isRating">
                    <div class="font-bold text-white text-lg">{{ formatValue(target.currentValue, target.unit) }}</div>
                    <div class="text-white/50 text-xs">Current {{ getValueDescription(target.metric) }}</div>
                  </div>
                  <div *ngIf="target.isRating" class="space-y-1">
                    <div *ngIf="target.currentValue === '-'" class="font-bold text-white text-lg">-</div>
                    <div *ngIf="target.currentValue !== '-'" class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl border border-orange-400/30">
                      <span class="font-bold text-orange-400 text-lg">{{ target.currentValue }}</span>
                    </div>
                    <div class="text-white/50 text-xs">{{ target.currentValue === '-' ? 'No current rating' : 'Current rating' }}</div>
                  </div>
                </div>
                
                <!-- Dynamic Target Value -->
                <div class="text-center">
                  <div class="space-y-1" *ngIf="!target.isRating">
                    <div class="font-bold text-green-400 text-lg">{{ formatValue(target.dynamicTargetValue, target.unit) }}</div>
                    <div class="text-green-400/70 text-xs">Target {{ getValueDescription(target.metric) }}</div>
                  </div>
                  <div *ngIf="target.isRating" class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-400/30">
                    <span class="font-bold text-green-400 text-lg">{{ target.dynamicTargetValue }}</span>
                  </div>
                </div>
                
                <!-- Calculated Change -->
                <div class="text-center">
                  <div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl px-4 py-2 inline-flex items-center border border-green-400/30 backdrop-blur-sm">
                    <span class="text-green-400 text-sm font-bold">{{ calculatePercentageChange(target.currentValue, target.dynamicTargetValue, target.isRating) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary Footer -->
        <div class="mt-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-indigo-400/30">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center border border-indigo-400/40">
                <span class="text-indigo-300 text-lg">📊</span>
              </div>
              <div>
                <div class="text-white font-semibold">Sustainability Impact</div>
                <div class="text-white/60 text-sm">Expected environmental improvements by {{ selectedTargetYear }}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-green-400 font-bold text-xl">{{ calculateAverageEnvironmentalReduction() }}</div>
              <div class="text-green-400/70 text-sm">Avg. reduction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./future-vision.component.css'],
  imports: [CommonModule, FormsModule],
})
export class FutureVisionComponent {
  @Input() mounted = false;
  @Input() targetYear: number = 2040;
  @Input() portfolioTargets: PortfolioTarget[] = [];
  @Input() griPerformanceData: GriPerformanceItem[] = [];

  selectedTargetYear: number = 2040;
  availableYears: number[] = [];
  currentYear: number = new Date().getFullYear();

  ngOnInit() {
    // Generate available years from 2025 to 2040
    this.availableYears = Array.from({length: 16}, (_, i) => 2025 + i);
    this.selectedTargetYear = this.targetYear;
  }

  // Get updated portfolio targets with current values from GRI data and EERL -> EEKL change
  get updatedPortfolioTargets(): PortfolioTarget[] {
    return this.portfolioTargets.map(target => {
      // Change EERL to EEKL
      let updatedTarget = { ...target };
      if (target.metric === 'EERL') {
        updatedTarget.metric = 'EEKL';
      }

      if (updatedTarget.metric === 'Mietrendite') {
        // Find Mietrendite value from GRI data
        const griMietrendite = this.griPerformanceData.find(item => item.label === 'Mietrendite');
        if (griMietrendite) {
          return {
            ...updatedTarget,
            currentValue: parseFloat(griMietrendite.value.replace('%', ''))
          };
        }
      }
      return updatedTarget;
    });
  }

  // Calculate dynamic targets based on selected year
  get calculatedPortfolioTargets(): any[] {
    return this.updatedPortfolioTargets.map(target => {
      const baseTargetYear = this.targetYear; // Original target year (2040)
      const yearsDifference = this.selectedTargetYear - baseTargetYear;
      
      let dynamicTargetValue = target.targetValue;
      
      // Only calculate dynamic values for non-rating metrics
      if (!target.isRating && typeof target.currentValue === 'number' && typeof target.targetValue === 'number') {
        const totalChange = target.targetValue - target.currentValue;
        const yearsToBaseTarget = baseTargetYear - this.currentYear;
        const annualChangeRate = totalChange / yearsToBaseTarget;
        
        // Calculate target for selected year
        const yearsToSelectedTarget = this.selectedTargetYear - this.currentYear;
        dynamicTargetValue = target.currentValue + (annualChangeRate * yearsToSelectedTarget);
        
        // Apply realistic bounds
        if (target.metric === 'kWh /m²' || target.metric === 'CO₂ kg /m²') {
          dynamicTargetValue = Math.max(dynamicTargetValue, 0); // Can't go below 0
        }
        if (target.metric === 'Mietrendite' && typeof dynamicTargetValue === 'number') {
          dynamicTargetValue = Math.min(dynamicTargetValue, 15); // Realistic upper bound for rental yield
        }
        
        // Round to appropriate decimal places
        dynamicTargetValue = Math.round(dynamicTargetValue * 100) / 100;
      }
      
      return {
        ...target,
        dynamicTargetValue
      };
    });
  }

  onYearChange(year: number) {
    this.selectedTargetYear = year;
  }

  getYearsFromNow(): number {
    return this.selectedTargetYear - this.currentYear;
  }

  getTimelineDescription(): string {
    const years = this.getYearsFromNow();
    if (years <= 3) return 'Short-term goals with immediate impact';
    if (years <= 7) return 'Medium-term strategic objectives';
    if (years <= 12) return 'Long-term transformation targets';
    return 'Visionary sustainability goals';
  }

  getProgressPercentage(): number {
    const totalYears = 2040 - 2025; // 15 years total range
    const selectedYears = this.selectedTargetYear - 2025;
    return Math.round((selectedYears / totalYears) * 100);
  }

  // Calculate percentage change between current and target values
  calculatePercentageChange(current: string | number, target: string | number, isRating: boolean = false): string {
    if (isRating) {
      // For ratings, show improvement or handle special cases like "-" to "A"
      if (current === '-') {
        return '+ New Rating';
      }
      return '+ Improved';
    }

    const currentNum = typeof current === 'string' ? parseFloat(current) : current;
    const targetNum = typeof target === 'string' ? parseFloat(target) : target;
    
    if (isNaN(currentNum) || isNaN(targetNum) || currentNum === 0) {
      return 'N/A';
    }

    const percentageChange = ((targetNum - currentNum) / currentNum) * 100;
    const sign = percentageChange >= 0 ? '+' : '';
    
    return `${sign} ${percentageChange.toFixed(1)} %`;
  }

  // Format values with appropriate units
  formatValue(value: string | number, unit?: string): string {
    if (typeof value === 'string') {
      return unit ? `${value} ${unit}` : value;
    }
    
    return unit ? `${value} ${unit}` : value.toString();
  }

  // Get icon gradient based on metric type (matching portfolio dashboard colors)
  getIconGradient(metric: string): string {
    const gradients: { [key: string]: string } = {
      'EEKL': 'from-emerald-500/20 to-green-500/20',   // Matches CRREM-Konform
      'EERL': 'from-emerald-500/20 to-green-500/20',   // Fallback
      'Wert': 'from-cyan-500/20 to-blue-500/20',       // Matches Energieverbrauch  
      'Miete': 'from-violet-500/20 to-purple-500/20',  // Matches kg CO₂/m2a
      'Mietrendite': 'from-orange-500/20 to-red-500/20', // Matches CO2-Steuer
      'kWh /m²': 'from-sky-500/20 to-cyan-500/20',     // Matches kWh/m2a
      'CO₂ kg /m²': 'from-green-500/20 to-emerald-500/20' // Matches CO2-Emissionen
    };
    return gradients[metric] || 'from-gray-500/20 to-slate-500/20';
  }

  // Get icon border based on metric type (matching portfolio dashboard colors)
  getIconBorder(metric: string): string {
    const borders: { [key: string]: string } = {
      'EEKL': 'border-emerald-400/30',
      'EERL': 'border-emerald-400/30', // Fallback
      'Wert': 'border-cyan-400/30',
      'Miete': 'border-violet-400/30',
      'Mietrendite': 'border-orange-400/30',
      'kWh /m²': 'border-sky-400/30',
      'CO₂ kg /m²': 'border-green-400/30'
    };
    return borders[metric] || 'border-gray-400/30';
  }

  // Get icon color class based on metric type (matching portfolio dashboard colors)
  getIconClass(metric: string): string {
    const colors: { [key: string]: string } = {
      'EEKL': 'text-emerald-400 font-bold',
      'EERL': 'text-emerald-400 font-bold', // Fallback
      'Wert': 'text-cyan-400',
      'Miete': 'text-violet-400',
      'Mietrendite': 'text-orange-400',
      'kWh /m²': 'text-sky-400',
      'CO₂ kg /m²': 'text-green-400'
    };
    return colors[metric] || 'text-gray-400';
  }

  // Get value description for subtitles
  getValueDescription(metric: string): string {
    const descriptions: { [key: string]: string } = {
      'Wert': 'valuation',
      'Miete': 'income',
      'Mietrendite': 'yield',
      'kWh /m²': 'consumption',
      'CO₂ kg /m²': 'emissions'
    };
    return descriptions[metric] || 'value';
  }

  // Calculate average environmental reduction (for kWh and CO₂ metrics)
  calculateAverageEnvironmentalReduction(): string {
    const environmentalMetrics = this.calculatedPortfolioTargets.filter(target => 
      target.metric === 'kWh /m²' || target.metric === 'CO₂ kg /m²'
    );

    if (environmentalMetrics.length === 0) return 'N/A';

    let totalReduction = 0;
    let validMetrics = 0;

    environmentalMetrics.forEach(metric => {
      const currentNum = typeof metric.currentValue === 'number' ? metric.currentValue : parseFloat(metric.currentValue.toString());
      const targetNum = typeof metric.dynamicTargetValue === 'number' ? metric.dynamicTargetValue : parseFloat(metric.dynamicTargetValue.toString());
      
      if (!isNaN(currentNum) && !isNaN(targetNum) && currentNum > 0) {
        const reduction = ((currentNum - targetNum) / currentNum) * 100;
        totalReduction += reduction;
        validMetrics++;
      }
    });

    if (validMetrics === 0) return 'N/A';
    
    const averageReduction = totalReduction / validMetrics;
    return `-${averageReduction.toFixed(1)}%`;
  }
}