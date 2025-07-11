// carbon-tax-timeline.component.ts
import { Component, Input } from '@angular/core';
import { CarbonTaxItem } from '../../interfaces/porfolio.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carbon-tax-timeline',
  template: `
    <div [class]="'backdrop-blur-3xl bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 ' + (mounted ? 'animate-fade-in-up' : 'opacity-0')"
          style="animation-delay: 2000ms;">
      <div class="p-8">
        <div class="flex items-center mb-8">
          <span class="text-2xl mr-4">📈</span>
          <div>
            <h3 class="text-2xl font-bold text-white">CO₂-Steuer / Jahr</h3>
            <p class="text-white/60 text-sm">Projected tax burden timeline</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div *ngFor="let item of data"
                [class]="'p-4 bg-gradient-to-r ' + item.color + ' rounded-2xl border border-white/20'">
            <div class="flex justify-between items-center">
              <div>
                <span class="text-white/90 font-bold">{{ item.year }}</span>
                <div class="text-white/60 text-xs">{{ item.rate }}</div>
              </div>
              <span class="font-bold text-white text-lg">{{ item.amount }}</span>
            </div>
          </div>
        </div>
        
        <div class="mt-6 p-4 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-2xl border border-red-300/50">
          <div class="text-center">
            <div class="text-red-200 text-sm mb-1">*freler Handel (Schutzung)</div>
            <div class="text-red-200 text-sm">**Schätzung nach ifa</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./carbon-tax-timeline.component.css'],
  imports:[CommonModule],
})
export class CarbonTaxTimelineComponent {
  @Input() data: CarbonTaxItem[] = [];
  @Input() mounted = false;
}