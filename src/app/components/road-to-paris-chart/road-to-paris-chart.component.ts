import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID, Input } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { EmissionDataService, PropertyTypeConfig, ChartDataset } from '../../services/emission-data.service';

type ChartType = 'emissions' | 'energy';
type PropertyType = 'single' | 'multi';

@Component({
  selector: 'app-road-to-paris-chart',
  template: `
    <div [class]="'backdrop-blur-3xl bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 group ' + (mounted ? 'animate-fade-in-left' : 'opacity-0')"
          style="animation-delay: 1500ms;">
      <div class="p-8">
        <!-- Header with Switch -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center space-x-4">
            <div>
              <h3 class="text-2xl font-bold text-white mb-2">🛣️ Road to Paris</h3>
              <p class="text-white/60 text-sm">{{ propertyDisplayName }} Carbon emission reduction timeline</p>
            </div>
          </div>
          
          <!-- Toggle Switch -->
          <div class="flex items-center space-x-3">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-1 border border-white/20">
              <div class="flex items-center">
                <button 
                  (click)="toggleView('emissions')"
                  [class]="'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ' + 
                          (selectedChartType === 'emissions' ? 'bg-red-500/80 text-white shadow-lg' : 'text-white/60 hover:text-white')"
                >
                  Decarbonisation path
                </button>
                <button 
                  (click)="toggleView('energy')"
                  [class]="'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ' + 
                          (selectedChartType === 'energy' ? 'bg-green-500/80 text-white shadow-lg' : 'text-white/60 hover:text-white')"
                >
                  Energy reduction path
                </button>
              </div>
            </div>
          </div>
        </div>
                
        <!-- Simple SVG Chart -->
        <div class="h-80 mb-6 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden">
          <!-- Background decoration -->
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
          
          <!-- Loading State -->
          <div *ngIf="isLoadingData" class="absolute inset-0 flex items-center justify-center z-20">
            <div class="text-white/60 text-sm">Loading chart data...</div>
          </div>
          
          <!-- Error State -->
          <div *ngIf="dataLoadError" class="absolute inset-0 flex items-center justify-center z-20">
            <div class="text-red-400 text-sm">Error loading data. Using fallback data.</div>
          </div>

          <!-- SVG Chart -->
          <div class="p-6 h-full relative z-10" *ngIf="!isLoadingData">
            <svg class="w-full h-full" [attr.viewBox]="'0 0 ' + svgWidth + ' 300'" *ngIf="chartPoints.length > 0">
              <!-- Grid lines -->
              <defs>
                <pattern id="grid" width="80" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              <!-- Y-axis labels -->
              <g class="y-axis">
                <text x="10" y="30" fill="rgba(255,255,255,0.6)" font-size="12" text-anchor="end">{{ maxValue }}</text>
                <text x="10" y="95" fill="rgba(255,255,255,0.6)" font-size="12" text-anchor="end">{{ maxValue * 0.75 }}</text>
                <text x="10" y="155" fill="rgba(255,255,255,0.6)" font-size="12" text-anchor="end">{{ maxValue * 0.5 }}</text>
                <text x="10" y="215" fill="rgba(255,255,255,0.6)" font-size="12" text-anchor="end">{{ maxValue * 0.25 }}</text>
                <text x="10" y="280" fill="rgba(255,255,255,0.6)" font-size="12" text-anchor="end">0</text>
              </g>
              
              <!-- Chart line -->
              <path 
                [attr.d]="linePathData" 
                fill="none" 
                [attr.stroke]="selectedChartType === 'emissions' ? '#ef4444' : '#22c55e'"
                stroke-width="3" 
                opacity="0.8"
                class="transition-all duration-500"
              />
              
              <!-- Chart area fill -->
              <path 
                [attr.d]="areaPathData" 
                [attr.fill]="selectedChartType === 'emissions' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)'"
                class="transition-all duration-500"
              />
              
              <!-- 2025 Bar (single bar) -->
              <g class="bar-2025" *ngIf="barData2025">
                <rect
                  [attr.x]="barData2025.x - 15"
                  [attr.y]="barData2025.y"
                  width="30"
                  [attr.height]="280 - barData2025.y"
                  [attr.fill]="barData2025.color"
                  opacity="0.8"
                  rx="4"
                  class="transition-all duration-500"
                />
              </g>

              <!-- Data points (moved after bar so always on top) -->
              <g class="data-points">
                <circle 
                  *ngFor="let point of chartPoints; let i = index"
                  [attr.cx]="point.x" 
                  [attr.cy]="point.y"
                  r="4"
                  [attr.fill]="selectedChartType === 'emissions' ? '#ef4444' : '#22c55e'"
                  stroke="white"
                  stroke-width="2"
                  class="cursor-pointer transition-all duration-300 hover:r-6"
                  (mouseenter)="showTooltip(i, $event)"
                  (mouseleave)="hideTooltip()"
                />
              </g>
              
              <!-- X-axis labels -->
              <g class="x-axis">
                <text 
                  *ngFor="let point of chartPoints; let i = index"
                  [attr.x]="point.x" 
                  y="295"
                  fill="rgba(255,255,255,0.6)"
                  font-size="10"
                  text-anchor="middle"
                >
                  {{ point.year }}
                </text>
              </g>
            </svg>
            
            <!-- Tooltip -->
            <div 
              *ngIf="tooltipData"
              class="absolute bg-black/90 text-white text-xs px-3 py-2 rounded-lg pointer-events-none z-30 border border-white/20"
              [style.left.px]="tooltipData.x"
              [style.top.px]="tooltipData.y"
            >
              <div class="font-medium">{{ tooltipData.value }}{{ selectedChartType === 'emissions' ? ' kg CO₂/m²' : ' kWh/m²a' }}</div>
              <div class="text-white/60">{{ tooltipData.year }}</div>
            </div>
          </div>
        </div>
                
        <!-- Action Buttons -->
        <div class="flex justify-between items-center">
          <div class="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-300/30 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 cursor-pointer">
            🎯 2025 Stranded Asset
          </div>
          <div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-300/30 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 cursor-pointer">
            🌱 2040 Carbon Neutral
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [CommonModule],
  styleUrls: ['./road-to-paris-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoadToParisChartComponent implements OnInit {
  // Input properties for parent component binding
  @Input() data: any[] = [];
  @Input() mounted = false;

  private isBrowser: boolean;
  
  // Chart type selection
  selectedChartType: ChartType = 'emissions';

  // Property type configuration from API
  propertyTypeConfig: PropertyTypeConfig | null = null;
  currentPropertyType: PropertyType = 'single';
  propertyDisplayName: string = '';
  
  // Combined chart data from API
  chartDataset: ChartDataset | null = null;
  
  // Loading state
  isLoadingData = true;
  dataLoadError = false;

  // Chart display data
  chartPoints: Array<{x: number, y: number, year: string, value: number}> = [];
  barData2025: {x: number, y: number, color: string} | null = null;
  linePathData: string = '';
  areaPathData: string = '';
  maxValue: number = 60;
  svgWidth: number = 0;
  tooltipData: {x: number, y: number, year: string, value: number} | null = null;

  // Fallback data
  fallbackData = [
    { year: '2025', emissions: 48, energy: 170 },
    { year: '2026', emissions: 46, energy: 165 },
    { year: '2027', emissions: 44, energy: 160 },
    { year: '2028', emissions: 42, energy: 155 },
    { year: '2029', emissions: 40, energy: 150 },
    { year: '2030', emissions: 38, energy: 145 },
    { year: '2032', emissions: 34, energy: 135 },
    { year: '2034', emissions: 30, energy: 125 },
    { year: '2035', emissions: 28, energy: 120 },
    { year: '2037', emissions: 24, energy: 110 },
    { year: '2038', emissions: 22, energy: 105 },
    { year: '2040', emissions: 18, energy: 100 }
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private emissionDataService: EmissionDataService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Load property type configuration first, then data
    this.loadPropertyTypeConfig();
  }

  /**
   * Load property type configuration from API
   */
  private loadPropertyTypeConfig(): void {
    if (!this.isBrowser) {
      this.isLoadingData = false;
      this.updateChart();
      return;
    }

    this.isLoadingData = true;
    this.dataLoadError = false;

    this.emissionDataService.getPropertyTypeConfig().subscribe({
      next: (config) => {
        this.propertyTypeConfig = config;
        this.currentPropertyType = config.propertyType;
        this.propertyDisplayName = config.displayName;
        this.loadChartData();
      },
      error: (error) => {
        console.error('Error loading property type config:', error);
        this.currentPropertyType = 'single';
        this.propertyDisplayName = 'Single Family';
        this.loadChartData();
      }
    });
  }

  /**
   * Load combined chart data based on current property type
   */
  private loadChartData(): void {
    this.emissionDataService.loadRoadToParisDataset(this.currentPropertyType).subscribe({
      next: (data) => {
        this.chartDataset = data;
        this.isLoadingData = false;
        this.updateChart();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading chart data:', error);
        this.dataLoadError = true;
        this.isLoadingData = false;
        this.updateChart();
        this.cdr.detectChanges();
      }
    });
  }

  toggleView(chartType: ChartType): void {
    this.selectedChartType = chartType;
    this.updateChart();
  }

  private updateChart(): void {
    let data: Array<{year: string, value: number}> = [];
    
    if (this.chartDataset) {
      // Use real data
      data = this.chartDataset.lineData.map(d => ({
        year: d.year,
        value: this.selectedChartType === 'emissions' ? d.emissions : d.energy
      }));
    } else {
      // Use fallback data
      data = this.fallbackData.map(d => ({
        year: d.year,
        value: this.selectedChartType === 'emissions' ? d.emissions : d.energy
      }));
    }

    this.maxValue = this.selectedChartType === 'emissions' ? 60 : 200;

    // Responsive SVG width: get parent container width if possible, fallback to 800
    let container = (typeof window !== 'undefined') ? document.querySelector('.p-6.h-full.relative.z-10') as HTMLElement : null;
    this.svgWidth = container ? container.offsetWidth || 800 : 800;
    if (!this.svgWidth || this.svgWidth < 400) this.svgWidth = 800;

    const yAxisPadding = 40; // More space for y-axis
    const chartWidth = this.svgWidth - yAxisPadding - 20; // 20px right padding
    const chartHeight = 250; // SVG height minus padding
    const startX = yAxisPadding;
    const startY = 30;

    this.chartPoints = data.map((item, index) => {
      const x = startX + (index / (data.length - 1)) * chartWidth;
      const y = startY + chartHeight - ((item.value / this.maxValue) * chartHeight);
      return {
        x: Math.round(x),
        y: Math.round(y),
        year: item.year,
        value: item.value
      };
    });

    // Create line path
    if (this.chartPoints.length > 0) {
      let pathData = `M ${this.chartPoints[0].x} ${this.chartPoints[0].y}`;
      for (let i = 1; i < this.chartPoints.length; i++) {
        pathData += ` L ${this.chartPoints[i].x} ${this.chartPoints[i].y}`;
      }
      this.linePathData = pathData;

      // Create area path (for fill under line)
      let areaData = pathData + ` L ${this.chartPoints[this.chartPoints.length - 1].x} ${startY + chartHeight} L ${this.chartPoints[0].x} ${startY + chartHeight} Z`;
      this.areaPathData = areaData;
    }

    // Create 2025 bar data
    const point2025 = this.chartPoints.find(p => p.year === '2025');
    if (point2025) {
      let barValue = point2025.value;
      
      // Get target value for color comparison (use line value as target)
      const targetValue = point2025.value;
      
      // If we have actual bar data from API, use that
      if (this.chartDataset && this.chartDataset.barData.length > 0) {
        const barDataItem = this.chartDataset.barData[0];
        barValue = this.selectedChartType === 'emissions' ? barDataItem.emissions : barDataItem.energy;
      }
      
      const barY = startY + chartHeight - ((barValue / this.maxValue) * chartHeight);
      const barColor = barValue <= targetValue ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)';
      
      this.barData2025 = {
        x: point2025.x,
        y: Math.round(barY),
        color: barColor
      };
    }

    this.cdr.detectChanges();
  }

  showTooltip(index: number, event: MouseEvent): void {
    const point = this.chartPoints[index];
    if (point) {
      // Center tooltip horizontally above the point, move it further up, clamp to chart bounds
      const tooltipWidth = 60; // px, adjust if needed
      const tooltipHeight = 36; // px, adjust if needed
      let x = point.x - tooltipWidth / 2;
      if (x < 0) x = 0;
      if (x + tooltipWidth > this.svgWidth) x = this.svgWidth - tooltipWidth;
      this.tooltipData = {
        x: x,
        y: point.y - tooltipHeight - 16, // 16px gap above the point
        year: point.year,
        value: point.value
      };
      this.cdr.detectChanges();
    }
  }

  hideTooltip(): void {
    this.tooltipData = null;
    this.cdr.detectChanges();
  }
}