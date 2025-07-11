import { Component, Input, OnInit } from '@angular/core';
import { PieData } from '../../interfaces/porfolio.interfaces';
import { CommonModule } from '@angular/common';

interface ChartOption {
  id: string;
  title: string;
  subtitle: string;
  data: PieData[];
}

@Component({
  selector: 'app-strategy-visualization',
  template: `
    <div [class]="'backdrop-blur-3xl bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 ' + (mounted ? 'animate-fade-in-up' : 'opacity-0')"
         style="animation-delay: 1800ms;">
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center">
            <span class="text-2xl mr-4">🎯</span>
            <div>
              <h3 class="text-2xl font-bold text-white">CRREM-Strategie & Ausrichtung</h3>
              <p class="text-white/60 text-sm">Portfolio alignment status</p>
            </div>
          </div>
          
          <!-- Dropdown -->
          <div class="relative">
            <button 
              (click)="toggleDropdown()"
              class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
              <span>{{ selectedOption.title }}</span>
              <svg class="w-4 h-4 transition-transform duration-200" [class.rotate-180]="isDropdownOpen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div *ngIf="isDropdownOpen" class="absolute top-full right-0 mt-2 w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div 
                *ngFor="let option of chartOptions" 
                (click)="selectOption(option)"
                class="px-4 py-3 hover:bg-white/20 cursor-pointer transition-all duration-200 border-b border-white/10 last:border-b-0">
                <div class="text-white font-medium text-sm">{{ option.title }}</div>
                <div class="text-white/60 text-xs">{{ option.subtitle }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex items-center justify-center mb-8 relative">
          <div class="relative w-64 h-64">
            <!-- SVG Donut Chart -->
            <svg class="w-64 h-64 transform -rotate-90" viewBox="0 0 200 200">
              <!-- Background circle -->
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                stroke-width="20"
              />
              
              <!-- Dynamic segments -->
              <circle
                *ngFor="let item of currentData; let i = index"
                cx="100"
                cy="100"
                r="70"
                fill="none"
                [attr.stroke]="item.color"
                stroke-width="20"
                stroke-linecap="round"
                class="transition-all duration-1000 ease-out cursor-pointer hover:opacity-80"
                [style.animation-delay]="(300 * i) + 'ms'"
                [attr.stroke-dasharray]="mounted ? calculateStrokeDashArray(item.value) : '0 440.3'"
                [attr.stroke-dashoffset]="mounted ? getStrokeDashOffsetForIndex(i) : '0'"
                (mouseenter)="onSegmentHover(item)"
                (mouseleave)="onSegmentLeave()"
              />
            </svg>
            
            <!-- Center content -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="text-center bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20">
                <div class="text-3xl font-black text-white">{{currentData[0].value || 0}}%</div>
                <div class="text-xs text-white/70 font-medium">{{selectedOption.id === 'stranded' ? 'Stranded' : selectedOption.id === 'sanierung' ? 'Saniert' : 'EEK A'}}</div>
                <div class="text-xs text-white/70 font-medium">{{selectedOption.id === 'stranded' ? 'Assets' : selectedOption.id === 'sanierung' ? 'Status' : 'Potenzial'}}</div>
              </div>
            </div>
            
            <!-- Tooltip -->
            <div *ngIf="hoveredSegment" 
                 class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium pointer-events-none z-10 border border-white/20 whitespace-nowrap">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full" [style.background-color]="hoveredSegment.color"></div>
                <span>{{ hoveredSegment.name }}: {{ hoveredSegment.value }}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Legend -->
        <div class="space-y-3">
          <div 
            *ngFor="let item of currentData" 
            class="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
            (mouseenter)="onSegmentHover(item)"
            (mouseleave)="onSegmentLeave()">
            <div class="flex items-center space-x-3">
              <div class="w-4 h-4 rounded-full" [style.background-color]="item.color"></div>
              <span class="text-white/90 font-medium text-sm">{{item.name}}</span>
            </div>
            <div class="text-lg font-bold text-white">{{item.value}}%</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./strategy-visualization.component.css'],
  imports:[CommonModule]
})
export class StrategyVisualizationComponent implements OnInit {
  @Input() pieData: PieData[] = [];
  @Input() mounted = false;

  isDropdownOpen = false;
  selectedOption!: ChartOption;
  currentData: PieData[] = [];
  hoveredSegment: PieData | null = null;

  chartOptions: ChartOption[] = [
    {
      id: 'stranded',
      title: 'Stranded Asset',
      subtitle: 'Stranded Asset - CRREM Konform - Paris-Proof',
      data: [
        { name: 'Stranded Asset', value: 44, color: '#dc2626' },
        { name: 'CRREM Konform', value: 26, color: '#0891b2' },
        { name: 'Paris-Proof', value: 30, color: '#22c55e' }
      ]
    },
    {
      id: 'sanierung',
      title: 'Sanierungsstatus',
      subtitle: 'Saniert - Unsaniert - In Sanierung',
      data: [
        { name: 'Saniert', value: 52, color: '#22c55e' },
        { name: 'Unsaniert', value: 33, color: '#dc2626' },
        { name: 'In Sanierung', value: 15, color: '#f59e0b' }
      ]
    },
    {
      id: 'strategie',
      title: 'Strategiepotenzial',
      subtitle: 'EEK A, EEK B, EEK C, EEK D, EEK E, EEK F, EEK G, EEK H',
      data: [
        { name: 'EEK A', value: 28, color: '#22c55e' },
        { name: 'EEK B', value: 22, color: '#84cc16' },
        { name: 'EEK C', value: 18, color: '#eab308' },
        { name: 'EEK D', value: 14, color: '#f59e0b' },
        { name: 'EEK E', value: 10, color: '#f97316' },
        { name: 'EEK F', value: 5, color: '#ef4444' },
        { name: 'EEK G', value: 2, color: '#dc2626' },
        { name: 'EEK H', value: 1, color: '#991b1b' }
      ]
    }
  ];

  ngOnInit() {
    // Set default option
    this.selectedOption = this.chartOptions[0];
    this.currentData = this.selectedOption.data;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: ChartOption) {
    this.selectedOption = option;
    this.currentData = option.data;
    this.isDropdownOpen = false;
  }

  // Helper method to get stroke dash offset for a specific index
  getStrokeDashOffsetForIndex(index: number): number {
    const previousValues = this.currentData.slice(0, index).map(item => item.value);
    return this.calculateStrokeDashOffset(previousValues);
  }

  // Hover handlers for tooltips
  onSegmentHover(segment: PieData): void {
    this.hoveredSegment = segment;
  }

  onSegmentLeave(): void {
    this.hoveredSegment = null;
  }

  // Calculate stroke dash array for each segment
  calculateStrokeDashArray(percentage: number, radius: number = 70): string {
    const circumference = 2 * Math.PI * radius;
    const segmentLength = (percentage / 100) * circumference;
    const gapLength = circumference - segmentLength;
    return `${segmentLength} ${gapLength}`;
  }

  // Calculate stroke dash offset for positioning segments
  calculateStrokeDashOffset(previousPercentages: number[], radius: number = 70): number {
    const circumference = 2 * Math.PI * radius;
    const totalPreviousPercentage = previousPercentages.reduce((sum, val) => sum + val, 0);
    return -(totalPreviousPercentage / 100) * circumference;
  }
}