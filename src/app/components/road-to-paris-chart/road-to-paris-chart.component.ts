// road-to-paris-chart.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RoadToParisData {
  year: string;
  value: number;
  target: number;
}

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
              <p class="text-white/60 text-sm">Carbon emission reduction timeline</p>
            </div>
          </div>
          
          <!-- Toggle Switch -->
          <div class="flex items-center space-x-3">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-1 border border-white/20">
              <div class="flex items-center">
                <button 
                  (click)="toggleView('co2')"
                  [class]="'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ' + 
                          (activeView === 'co2' ? 'bg-red-500/80 text-white shadow-lg' : 'text-white/60 hover:text-white')"
                >
                  CO₂
                </button>
                <button 
                  (click)="toggleView('energy')"
                  [class]="'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ' + 
                          (activeView === 'energy' ? 'bg-green-500/80 text-white shadow-lg' : 'text-white/60 hover:text-white')"
                >
                  Energy
                </button>
              </div>
            </div>
          </div>
        </div>
                
        <!-- Interactive Bar Chart -->
        <div class="h-80 mb-6 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden">
          <!-- Background decoration -->
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
          
          <!-- Chart Navigation -->
          <div class="absolute top-4 right-4 z-20 flex space-x-2">
            <button 
              (click)="previousSlide()" 
              [disabled]="currentSlide === 0"
              class="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              ‹
            </button>
            <button 
              (click)="nextSlide()" 
              [disabled]="currentSlide >= maxSlides - 1"
              class="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              ›
            </button>
          </div>

          <!-- Chart Container -->
          <div class="p-6 h-full relative z-10">
            <!-- Y-axis and Chart Area -->
            <div class="flex h-full">
              <!-- Y-axis labels -->
              <div class="w-12 flex flex-col justify-between text-white/40 text-xs py-4">
                <span>{{ getMaxValue() }}</span>
                <span>{{ getQuarterValue(3) }}</span>
                <span>{{ getQuarterValue(2) }}</span>
                <span>{{ getQuarterValue(1) }}</span>
                <span>0</span>
              </div>

              <!-- Chart area -->
              <div class="flex-1 relative ml-4">
                <!-- Grid lines -->
                <div class="absolute inset-0 flex flex-col justify-between py-4">
                  <div class="h-px bg-white/10"></div>
                  <div class="h-px bg-white/10"></div>
                  <div class="h-px bg-white/10"></div>
                  <div class="h-px bg-white/10"></div>
                  <div class="h-px bg-white/10"></div>
                </div>

                <!-- Bars -->
                <div class="h-full py-4 pb-8 relative">
                  <div class="h-full flex items-end justify-between space-x-2">
                    <div *ngFor="let yearData of getCurrentSlideData(); let i = index" 
                         class="flex-1 relative group min-w-0">
                      
                      <!-- Target bar (background) -->
                      <div class="w-full bg-white/15 rounded-t-xl transition-all duration-500 shadow-lg"
                           [style.height.px]="getBarHeight(yearData.target)">
                      </div>
                      
                      <!-- Actual value bar -->
                      <div class="absolute bottom-0 left-0 w-full rounded-t-xl transition-all duration-700 ease-out shadow-xl"
                           [style.height.px]="getBarHeight(yearData.value)"
                           [style.animation-delay]="i * 100 + 'ms'"
                           [ngClass]="activeView === 'co2' ? 'bg-gradient-to-t from-red-600 via-red-500 to-pink-400' : 'bg-gradient-to-t from-green-600 via-green-500 to-emerald-400'">
                        
                        <!-- Shimmer effect -->
                        <div class="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent rounded-t-xl"></div>
                      </div>
                      
                      <!-- Hover tooltip -->
                      <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl border border-white/20">
                        <div class="font-medium">{{ yearData.value }}{{ activeView === 'co2' ? ' kg' : ' kWh' }}</div>
                        <div class="text-white/60 text-xs">Target: {{ yearData.target }}{{ activeView === 'co2' ? ' kg' : ' kWh' }}</div>
                      </div>
                      
                      <!-- Year label -->
                      <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-xs font-semibold">
                        {{ yearData.year }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Legend -->
            <div class="flex justify-center items-center space-x-6 mt-2">
              <div class="flex items-center space-x-2">
                <div [ngClass]="activeView === 'co2' ? 'bg-gradient-to-r from-red-500 to-pink-400' : 'bg-gradient-to-r from-green-500 to-emerald-400'" 
                     class="w-3 h-3 rounded"></div>
                <span class="text-white/60 text-xs">{{ activeView === 'co2' ? 'CO₂ Emissions' : 'Energy Consumption' }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-white/20 rounded"></div>
                <span class="text-white/60 text-xs">Target</span>
              </div>
            </div>
          </div>
        </div>
                
        <!-- Action Buttons -->
        <div class="flex justify-between items-center">
          <div class="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-300/30 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 cursor-pointer">
            🎯 2025 Target
          </div>
          <div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-300/30 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 cursor-pointer">
            🌱 2040 Carbon Neutral
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [CommonModule],
  styleUrls: ['./road-to-paris-chart.component.css']
})
export class RoadToParisChartComponent {
  @Input() data: RoadToParisData[] = [];
  @Input() mounted = false;
  
  activeView: 'co2' | 'energy' = 'co2';
  currentSlide = 0;
  
  // Sample data for 2025-2040 (16 years)
  co2Data = [
    { year: '2025', value: 184, target: 180 },
    { year: '2026', value: 182, target: 178 },
    { year: '2027', value: 180, target: 176 },
    { year: '2028', value: 179, target: 175 },
    { year: '2029', value: 179, target: 175 },
    { year: '2030', value: 178, target: 173 },
    { year: '2031', value: 177, target: 172 },
    { year: '2032', value: 176, target: 171 },
    { year: '2033', value: 176, target: 170 },
    { year: '2034', value: 175, target: 170 },
    { year: '2035', value: 178, target: 170 },
    { year: '2036', value: 176, target: 168 },
    { year: '2037', value: 175, target: 167 },
    { year: '2038', value: 174, target: 166 },
    { year: '2039', value: 174, target: 165 },
    { year: '2040', value: 175, target: 165 }
  ];

  energyData = [
    { year: '2025', value: 220, target: 210 },
    { year: '2026', value: 215, target: 205 },
    { year: '2027', value: 210, target: 200 },
    { year: '2028', value: 205, target: 195 },
    { year: '2029', value: 200, target: 190 },
    { year: '2030', value: 195, target: 185 },
    { year: '2031', value: 190, target: 180 },
    { year: '2032', value: 185, target: 175 },
    { year: '2033', value: 180, target: 170 },
    { year: '2034', value: 175, target: 165 },
    { year: '2035', value: 170, target: 160 },
    { year: '2036', value: 165, target: 155 },
    { year: '2037', value: 160, target: 150 },
    { year: '2038', value: 155, target: 145 },
    { year: '2039', value: 150, target: 140 },
    { year: '2040', value: 145, target: 135 }
  ];

  get currentData() {
    return this.activeView === 'co2' ? this.co2Data : this.energyData;
  }

  get chartSlides() {
    const data = this.currentData;
    const slides = [];
    const yearsPerSlide = 8;
    
    for (let i = 0; i < data.length; i += yearsPerSlide) {
      slides.push(data.slice(i, i + yearsPerSlide));
    }
    return slides;
  }

  get maxSlides() {
    return this.chartSlides.length;
  }

  getQuarterValue(quarter: number): number {
    return Math.round(this.getMaxValue() * (quarter * 0.25));
  }

  getCurrentSlideData() {
    return this.chartSlides[this.currentSlide] || [];
  }

  getBarHeight(value: number): number {
    const maxHeight = 200; // Fixed height in pixels
    return (value / this.getMaxValue()) * maxHeight;
  }

  getMaxValue(): number {
    const data = this.currentData;
    const maxValue = Math.max(...data.map(d => Math.max(d.value, d.target)));
    return Math.ceil(maxValue / 50) * 50; // Round up to nearest 50
  }

  toggleView(view: 'co2' | 'energy'): void {
    this.activeView = view;
    this.currentSlide = 0; // Reset to first slide when switching views
  }

  nextSlide(): void {
    if (this.currentSlide < this.maxSlides - 1) {
      this.currentSlide++;
    }
  }

  previousSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}
