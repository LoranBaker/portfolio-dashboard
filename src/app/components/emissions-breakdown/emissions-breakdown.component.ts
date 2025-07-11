// emissions-breakdown.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EmissionData, SectorData } from '../../interfaces/porfolio.interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Configuration interfaces
export interface PortfolioConfig {
  countries: string[];
  sectors: SectorConfig[];
}

export interface SectorConfig {
  name: string;
  color: string;
  enabled: boolean;
}

// Default configuration
export const DEFAULT_SECTORS: SectorConfig[] = [
  { name: 'Residential', color: '#E74C3C', enabled: true },
  { name: 'Commercial', color: '#3498DB', enabled: true },
  { name: 'Office', color: '#2ECC71', enabled: true },
  { name: 'Mixed', color: '#9B59B6', enabled: true },
  { name: 'Other', color: '#F39C12', enabled: true },
  { name: 'Individual', color: '#F1C40F', enabled: true },
  { name: 'Industrial', color: '#E67E22', enabled: false },
  { name: 'Retail', color: '#1ABC9C', enabled: false },
  { name: 'Healthcare', color: '#8E44AD', enabled: false },
  { name: 'Education', color: '#34495E', enabled: false }
];

export const DEFAULT_COUNTRIES = [
  'Germany', 'Spain', 'Netherlands', 'France', 'Portugal', 'Poland',
  'Italy', 'Austria', 'Belgium', 'Switzerland', 'UK', 'Ireland'
];

@Component({
  selector: 'app-emissions-breakdown',
  template: `
    <div [class]="'backdrop-blur-3xl bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 ' + (mounted ? 'animate-fade-in-up' : 'opacity-0')"
          style="animation-delay: 1700ms;">
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center">
            <span class="text-2xl mr-4">🌍</span>
            <div>
              <h3 class="text-2xl font-bold text-white">CO₂-Emissionen nach Länder und Sektoren</h3>
              <p class="text-white/60 text-sm">Emissions by country and sector</p>
            </div>
          </div>
          
          <!-- Configuration Button -->
          <button 
            (click)="toggleConfigPanel()"
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>Configure</span>
          </button>
        </div>

        <!-- Configuration Panel -->
        <div *ngIf="showConfigPanel" class="mb-8 p-6 bg-white/5 rounded-xl border border-white/10 space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <!-- Countries Configuration -->
            <div>
              <h4 class="text-lg font-semibold text-white mb-4">Portfolio Countries</h4>
              <div class="space-y-3">
                <div *ngFor="let country of availableCountries" 
                     class="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer border border-white/10 hover:border-white/20"
                     (click)="toggleCountry(country)">
                  <div class="relative flex items-center">
                    <input 
                      type="checkbox" 
                      [id]="'country-' + country"
                      [checked]="portfolioConfig.countries.includes(country)"
                      (click)="$event.stopPropagation()"
                      class="sr-only">
                    <div [class]="'w-5 h-5 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ' + 
                                 (portfolioConfig.countries.includes(country) ? 
                                 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/25' : 
                                 'bg-white/10 border-white/30 hover:border-white/50')">
                      <svg *ngIf="portfolioConfig.countries.includes(country)" 
                           class="w-3 h-3 text-white" 
                           fill="none" 
                           stroke="currentColor" 
                           viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <span class="text-white/90 font-medium text-sm flex-1 cursor-pointer select-none">{{ country }}</span>
                </div>
              </div>
            </div>

            <!-- Sectors Configuration -->
            <div>
              <h4 class="text-lg font-semibold text-white mb-4">Property Sectors</h4>
              <div class="space-y-3">
                <div *ngFor="let sector of availableSectors" 
                     class="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer border border-white/10 hover:border-white/20"
                     (click)="toggleSector(sector)">
                  <div class="relative flex items-center">
                    <input 
                      type="checkbox" 
                      [id]="'sector-' + sector.name"
                      [checked]="sector.enabled"
                      (click)="$event.stopPropagation()"
                      class="sr-only">
                    <div [class]="'w-5 h-5 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ' + 
                                 (sector.enabled ? 
                                 'border-2 shadow-lg' : 
                                 'bg-white/10 border-white/30 hover:border-white/50')"
                         [style.background-color]="sector.enabled ? sector.color : ''"
                         [style.border-color]="sector.enabled ? sector.color : ''">
                      <svg *ngIf="sector.enabled" 
                           class="w-3 h-3 text-white" 
                           fill="none" 
                           stroke="currentColor" 
                           viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="w-4 h-4 rounded-lg shadow-sm" [style.background-color]="sector.color"></div>
                  <span class="text-white/90 font-medium text-sm flex-1 cursor-pointer select-none">{{ sector.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3">
            <button 
              (click)="resetToDefaults()"
              class="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-all duration-200">
              Reset to Defaults
            </button>
            <button 
              (click)="applyConfiguration()"
              class="px-4 py-2 bg-blue-600 border border-blue-500 rounded-lg text-white text-sm hover:bg-blue-700 transition-all duration-200">
              Apply Changes
            </button>
          </div>
        </div>
        
        <!-- Legend (Dynamic based on enabled sectors) -->
        <div class="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div *ngFor="let sector of enabledSectors" class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-sm" [style.background-color]="sector.color"></div>
              <span class="text-white/80">{{ sector.name }}</span>
            </div>
          </div>
        </div>
                
        <div class="space-y-6">
          <div *ngFor="let item of filteredData" class="group">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-4">
                <span class="text-white/90 font-medium">{{ item.country }}</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-white font-bold text-lg">{{ item.value }}%</span>
                <span [class]="'text-xs font-bold px-2 py-1 rounded-full ' + (item.trend.startsWith('+') ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300')">
                  {{ item.trend }}
                </span>
              </div>
            </div>
            
            <!-- Stacked Bar -->
            <div class="relative h-4 bg-white/10 rounded-full overflow-hidden">
              <div class="flex h-full">
                <div *ngFor="let sector of item.sectors; let i = index" 
                     class="transition-all duration-1000 ease-out hover:opacity-80 cursor-pointer"
                     [style.width.%]="sector.percentage"
                     [style.background-color]="sector.color"
                     [title]="sector.name + ': ' + sector.percentage + '%'">
                </div>
              </div>
            </div>
            
            <!-- Sector breakdown - Only show on hover with proper spacing -->
            <div class="overflow-hidden transition-all duration-300 group-hover:max-h-20 max-h-0">
              <div class="mt-2 pt-2">
                <div class="flex flex-wrap gap-2 text-xs">
                  <span *ngFor="let sector of item.sectors" 
                        class="bg-white/10 px-2 py-1 rounded-md text-white/70 flex items-center space-x-1">
                    <div class="w-2 h-2 rounded-full" [style.background-color]="sector.color"></div>
                    <span>{{ sector.name }}: {{ sector.percentage }}%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="filteredData.length === 0" class="text-center py-12">
          <div class="text-white/40 text-lg mb-2">🏢</div>
          <p class="text-white/60">No countries selected for your portfolio</p>
          <p class="text-white/40 text-sm">Configure your portfolio countries above</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./emissions-breakdown.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EmissionsBreakdownComponent implements OnInit {
  @Input() data: EmissionData[] = [];
  @Input() mounted = false;
  @Input() initialConfig?: PortfolioConfig;
  @Output() configurationChanged = new EventEmitter<PortfolioConfig>();

  showConfigPanel = false;
  portfolioConfig: PortfolioConfig = {
    countries: ['Germany', 'Spain', 'Netherlands', 'France', 'Portugal', 'Poland'],
    sectors: DEFAULT_SECTORS.filter(s => s.enabled)
  };

  availableCountries = DEFAULT_COUNTRIES;
  availableSectors = [...DEFAULT_SECTORS];

  get enabledSectors(): SectorConfig[] {
    return this.availableSectors.filter(s => s.enabled);
  }

  get filteredData(): EmissionData[] {
    return this.data.filter(item => 
      this.portfolioConfig.countries.includes(item.country)
    ).map(item => ({
      ...item,
      sectors: item.sectors.filter(sector => 
        this.enabledSectors.some(enabled => enabled.name === sector.name)
      )
    }));
  }

  ngOnInit(): void {
    if (this.initialConfig) {
      this.portfolioConfig = { ...this.initialConfig };
      this.updateAvailableSectors();
    }
  }

  toggleConfigPanel(): void {
    this.showConfigPanel = !this.showConfigPanel;
  }

  toggleCountry(country: string): void {
    const index = this.portfolioConfig.countries.indexOf(country);
    if (index > -1) {
      this.portfolioConfig.countries.splice(index, 1);
    } else {
      this.portfolioConfig.countries.push(country);
    }
  }

  toggleSector(sector: SectorConfig): void {
    const sectorIndex = this.availableSectors.findIndex(s => s.name === sector.name);
    if (sectorIndex > -1) {
      this.availableSectors[sectorIndex].enabled = !this.availableSectors[sectorIndex].enabled;
    }
  }

  resetToDefaults(): void {
    this.portfolioConfig.countries = ['Germany', 'Spain', 'Netherlands', 'France', 'Portugal', 'Poland'];
    this.availableSectors = DEFAULT_SECTORS.map(s => ({ ...s }));
  }

  applyConfiguration(): void {
    this.portfolioConfig.sectors = this.enabledSectors;
    this.showConfigPanel = false;
    
    // Emit configuration change event to parent component
    this.configurationChanged.emit(this.portfolioConfig);
    console.log('Applied configuration:', this.portfolioConfig);
  }

  private updateAvailableSectors(): void {
    this.availableSectors = DEFAULT_SECTORS.map(defaultSector => {
      const configSector = this.portfolioConfig.sectors.find(s => s.name === defaultSector.name);
      return configSector ? { ...configSector } : { ...defaultSector, enabled: false };
    });
  }
}