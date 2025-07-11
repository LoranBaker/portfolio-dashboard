// portfolio-header.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetricCardComponent } from "../metric-card/metric-card.component";

interface MetricData {
  title: string;
  value: string;
  gradient: string;
  icon: string;
  delay: number;
}

interface EditableMetricData extends MetricData {
  numericValue: number | string;
}

interface EnergyMetricData {
  title: string;
  value: string;
  gradient: string;
  trend: string;
  delay: number;
}

@Component({
  selector: 'app-portfolio-header',
  template: `
    <div [class]="'backdrop-blur-3xl bg-white/10 rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden ' + (mounted ? 'animate-slide-down' : 'opacity-0')">
      <!-- Premium gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>
      
      <div class="relative p-8 md:p-12">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
          <div class="space-y-4">
            <div class="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span class="text-white/80 text-sm font-medium">Live Portfolio Data</span>
            </div>
            <h1 class="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              PORTFOLIO
              <br />
              ÜBERSICHT
            </h1>
            <p class="text-xl text-white/70 font-light max-w-md">
              European Real Estate Investment Intelligence Dashboard
            </p>
          </div>
          
          <div class="mt-8 lg:mt-0 flex flex-col space-y-4">
            <!-- Edit Button -->
            <button 
              (click)="toggleEditMode()"
              class="self-end bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/30 text-white font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 shadow-lg">
              <span class="flex items-center space-x-2">
                <span>{{ isEditMode ? '💾 Save' : '✏️ Add Metrics' }}</span>
              </span>
            </button>
            
            <!-- Total Portfolio Value Card -->
            <div class="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 shadow-2xl">
              <div class="text-center space-y-3">
                <div class="text-white/60 text-sm font-medium uppercase tracking-wider">Total Portfolio Value</div>
                <div class="text-4xl font-black text-white">€{{ totalBudget }}M</div>
                <div class="flex items-center justify-center space-x-2">
                  <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span class="text-green-400 text-sm font-semibold">+12.5% YoY</span>
                </div>
                <div class="text-xs text-white/50 font-medium">{{ portfolioName }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Form Modal -->
        <div *ngIf="isEditMode" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-3xl font-bold text-white">Add Portfolio Metrics</h2>
              <button 
                (click)="cancelEdit()" 
                class="text-white/60 hover:text-white text-2xl font-bold">
                ✕
              </button>
            </div>
            
            <!-- Scrollable Content Container -->
            <div class="max-h-[calc(80vh-120px)] overflow-y-auto custom-scrollbar pr-2">
              <!-- Portfolio Header Fields -->
              <div class="mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 class="text-xl font-semibold text-white mb-6">Portfolio Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-3">
                    <label class="flex items-center space-x-2 text-white/80 font-medium">
                      <span>🏛️</span>
                      <span>Portfolio Name</span>
                    </label>
                    <input 
                      [(ngModel)]="portfolioName"
                      type="text"
                      placeholder="Enter portfolio name"
                      class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 hover:bg-white/15">
                  </div>
                  <div class="space-y-3">
                    <label class="flex items-center space-x-2 text-white/80 font-medium">
                      <span>💼</span>
                      <span>Total Budget</span>
                    </label>
                    <div class="relative">
                      <input 
                        [(ngModel)]="totalBudget"
                        type="number"
                        placeholder="750"
                        class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 pr-20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 hover:bg-white/15">
                      <span class="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/60 font-medium">M€</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Metrics Fields -->
              <div class="mb-6">
                <h3 class="text-xl font-semibold text-white mb-6">Portfolio Metrics</h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div *ngFor="let metric of editableMetrics; let i = index" class="space-y-3">
                  <label class="flex items-center space-x-2 text-white/80 font-medium">
                    <span>{{ metric.icon }}</span>
                    <span>{{ metric.title }}</span>
                  </label>
                  <div class="relative">
                    <input 
                      [(ngModel)]="metric.numericValue"
                      [type]="getInputType(metric.title)"
                      [placeholder]="getPlaceholder(metric.title)"
                      class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      [class.pr-16]="getUnit(metric.title)"
                      [class.pr-20]="getUnit(metric.title) === 'M€' || getUnit(metric.title) === 'm²'">
                    <span *ngIf="getUnit(metric.title)" class="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/60 font-medium">{{ getUnit(metric.title) }}</span>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end space-x-4 mt-8">
                <button 
                  (click)="cancelEdit()"
                  class="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-medium hover:bg-white/20 transition-all duration-300">
                  Cancel
                </button>
                <button 
                  (click)="saveMetrics()"
                  class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Premium Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
          <app-metric-card 
            *ngFor="let metric of metrics; let i = index"
            [title]="metric.title" 
            [value]="metric.value" 
            [gradient]="metric.gradient" 
            [icon]="metric.icon"
            [mounted]="mounted"
            [delay]="metric.delay">
          </app-metric-card>
        </div>

        <!-- Energy Performance Grid -->
        <div class="mt-12">
          <h2 class="text-3xl font-bold text-white mb-8 flex items-center">
            <span class="mr-4">⚡</span>
            Energetischer IST-Zustand
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            <app-metric-card 
              *ngFor="let energyMetric of energyPerformanceData"
              [title]="energyMetric.title" 
              [value]="energyMetric.value" 
              [gradient]="energyMetric.gradient" 
              [trend]="energyMetric.trend"
              [mounted]="mounted"
              [delay]="energyMetric.delay">
            </app-metric-card>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
    }
    
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      background: transparent;
      -webkit-appearance: none;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 10px;
      -webkit-appearance: none;
      margin: 20px 0; /* Make scrollbar shorter by adding margins */
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.25);
      border-radius: 10px;
      transition: all 0.2s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
      -webkit-appearance: none;
      min-height: 20px;
      /* Removed backdrop-filter to prevent blur issues */
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.45);
      transform: scaleY(1.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:active {
      background: rgba(255, 255, 255, 0.6);
      transform: scaleY(1.1);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
    }
    
    /* Remove ALL scroll buttons/arrows */
    .custom-scrollbar::-webkit-scrollbar-button,
    .custom-scrollbar::-webkit-scrollbar-button:single-button,
    .custom-scrollbar::-webkit-scrollbar-button:double-button,
    .custom-scrollbar::-webkit-scrollbar-button:start,
    .custom-scrollbar::-webkit-scrollbar-button:end,
    .custom-scrollbar::-webkit-scrollbar-button:vertical,
    .custom-scrollbar::-webkit-scrollbar-button:horizontal {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
      background: none !important;
      border: none !important;
      -webkit-appearance: none !important;
    }
    
    .custom-scrollbar::-webkit-scrollbar-corner {
      background: transparent !important;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track-piece {
      background: transparent !important;
    }
    
    /* Simplified glow effect without backdrop blur */
    .custom-scrollbar:hover::-webkit-scrollbar-thumb {
      animation: pump-glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes pump-glow {
      0% {
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
      }
      100% {
        box-shadow: 0 0 25px rgba(168, 85, 247, 0.4), 0 0 35px rgba(59, 130, 246, 0.3);
      }
    }
    
    /* Optimized smooth scrolling */
    .custom-scrollbar {
      scroll-behavior: smooth;
      overflow-x: hidden;
      /* Improve rendering performance */
      transform: translateZ(0);
      will-change: scroll-position;
    }
    
    /* Enhanced focus states without backdrop blur */
    .custom-scrollbar:focus-within::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
    }
  `],
  styleUrls: ['./portfolio-header.component.css'],
  imports: [MetricCardComponent, CommonModule, FormsModule]
})
export class PortfolioHeaderComponent {
  @Input() mounted = false;
  @Input() energyPerformanceData: EnergyMetricData[] = [];
  
  isEditMode = false;
  portfolioName = 'Portfolio Europe Fund 2';
  totalBudget = 750;
  
  metrics: MetricData[] = [
    { title: "Assets", value: "50.000", gradient: "from-blue-500/20 to-cyan-500/20", icon: "🏢", delay: 100 },
    { title: "Asset Type", value: "Mix", gradient: "from-purple-500/20 to-pink-500/20", icon: "📊", delay: 200 },
    { title: "Vermietete Fläche", value: "350.000 m²", gradient: "from-emerald-500/20 to-teal-500/20", icon: "📐", delay: 300 },
    { title: "Gewerbefläche", value: "300.000 m²", gradient: "from-amber-500/20 to-orange-500/20", icon: "🏪", delay: 400 },
    { title: "Wohnfläche", value: "50.000 m²", gradient: "from-rose-500/20 to-pink-500/20", icon: "🏠", delay: 500 },
    { title: "Leerstand", value: "2,3%", gradient: "from-red-500/20 to-rose-500/20", icon: "📉", delay: 600 },
    { title: "Miete p.a.", value: "3.050.000 €", gradient: "from-indigo-500/20 to-purple-500/20", icon: "💰", delay: 700 }
  ];
  
  editableMetrics: EditableMetricData[] = [];
  
  getInputType(title: string): string {
    if (title === 'Asset Type') return 'text';
    return 'number';
  }
  
  getPlaceholder(title: string): string {
    switch (title) {
      case 'Assets': return '50000';
      case 'Asset Type': return 'Mix';
      case 'Vermietete Fläche': return '350000';
      case 'Gewerbefläche': return '300000';
      case 'Wohnfläche': return '50000';
      case 'Leerstand': return '2.3';
      case 'Miete p.a.': return '3050000';
      default: return '';
    }
  }
  
  getUnit(title: string): string {
    switch (title) {
      case 'Vermietete Fläche':
      case 'Gewerbefläche':
      case 'Wohnfläche':
        return 'm²';
      case 'Leerstand':
        return '%';
      case 'Miete p.a.':
        return '€';
      default:
        return '';
    }
  }
  
  extractNumericValue(value: string): number | string {
    if (value === 'Mix') return 'Mix';
    
    // Remove common units and separators, but keep decimal points
    const numericString = value.replace(/[€%m²\s]/g, '').replace(/\./g, '').replace(',', '.');
    const numeric = parseFloat(numericString);
    return isNaN(numeric) ? value : numeric;
  }
  
  formatValueWithUnit(numericValue: number | string, title: string): string {
    if (title === 'Asset Type') return String(numericValue);
    
    const unit = this.getUnit(title);
    if (typeof numericValue === 'string') return numericValue;
    
    // Format large numbers with dots as thousand separators (German format)
    let formatted: string;
    if (title === 'Leerstand') {
      // For percentage, use comma as decimal separator
      formatted = numericValue.toString().replace('.', ',');
    } else {
      // For other numbers, format with thousand separators
      formatted = numericValue.toLocaleString('de-DE');
    }
    
    return unit ? `${formatted} ${unit}` : formatted;
  }
  
  toggleEditMode() {
    if (this.isEditMode) {
      this.saveMetrics();
    } else {
      this.isEditMode = true;
      // Create a deep copy of the first 7 metrics for editing
      this.editableMetrics = this.metrics.slice(0, 7).map(metric => ({
        ...metric,
        numericValue: this.extractNumericValue(metric.value)
      }));
    }
  }
  
  saveMetrics() {
    // Update the original metrics with edited values
    this.editableMetrics.forEach((editedMetric, index) => {
      if (index < this.metrics.length) {
        this.metrics[index].value = this.formatValueWithUnit(editedMetric.numericValue, editedMetric.title);
      }
    });
    
    this.isEditMode = false;
    console.log('Portfolio updated:', {
      name: this.portfolioName,
      budget: this.totalBudget,
      metrics: this.metrics
    });
  }
  
  cancelEdit() {
    this.isEditMode = false;
    this.editableMetrics = [];
    // Reset to original values
    this.portfolioName = 'Portfolio Europe Fund 2';
    this.totalBudget = 750;
  }
}