// roi-economics.component.ts
import { Component, Input } from '@angular/core';
import { RoiEconomicsData } from '../../interfaces/porfolio.interfaces';

@Component({
  selector: 'app-roi-economics',
  template: `
    <div [class]="'backdrop-blur-3xl bg-gradient-to-br from-emerald-900/40 to-green-900/40 rounded-[2rem] border border-emerald-300/30 shadow-2xl hover:shadow-3xl transition-all duration-700 ' + (mounted ? 'animate-fade-in-up' : 'opacity-0')"
          style="animation-delay: 2100ms;">
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center">
            <span class="text-2xl mr-4">💎</span>
            <div>
              <h3 class="text-2xl font-bold text-white">Economics / KPIs</h3>
            </div>
          </div>
          <div class="bg-emerald-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-emerald-300/40">
            <span class="text-emerald-200 text-xs font-bold">PREMIUM</span>
          </div>
        </div>
                
        <div class="space-y-4">
          <div class="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-3">
                <span class="text-lg">📊</span>
                <span class="text-white/90 font-medium">Net ROI</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="font-bold text-emerald-300 text-xl">{{ data.netRoi }}</span>
                <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
                  
          <div class="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="flex justify-between items-center">
              <span class="text-white/80 font-medium">🏦 Kosten Mod.kredit p.a.</span>
              <span class="font-bold text-white">{{ data.modernizationCreditCosts }}</span>
            </div>
          </div>
                  
          <div class="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="flex justify-between items-center">
              <span class="text-white/80 font-medium">⚡ Modernisierungsumläge p.a.</span>
              <span class="font-bold text-emerald-300">{{ data.modernizationSurcharge }}</span>
            </div>
          </div>
                  
          <div class="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="flex justify-between items-center">
              <span class="text-white/80 font-medium">💰 Einnahmen Stromverkauf p.a.</span>
              <span class="font-bold text-emerald-300">{{ data.electricityRevenue }}</span>
            </div>
          </div>
          
          <div class="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="flex justify-between items-center">
              <span class="text-white/80 font-medium">🌱 Einsparung CO2-Steuer p.a.</span>
              <span class="font-bold text-emerald-300">{{ data.co2TaxSavings }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./roi-economics.component.css']
})
export class RoiEconomicsComponent {
  @Input() mounted = false;
  @Input() data!: RoiEconomicsData;
}