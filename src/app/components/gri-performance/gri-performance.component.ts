// gri-performance.component.ts
import { Component, Input } from '@angular/core';
import { GriPerformanceItem } from '../../interfaces/porfolio.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gri-performance',
  template: `
    <div [class]="'backdrop-blur-3xl bg-white/10 rounded-[2rem] border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 ' + (mounted ? 'animate-fade-in-right' : 'opacity-0')" 
         style="animation-delay: 1600ms;">
      <div class="p-8">
        <div class="flex items-center mb-8">
          <span class="text-2xl mr-4">📊</span>
          <div>
            <h3 class="text-2xl font-bold text-white">GRI Annual Report</h3>
            <p class="text-white/60 text-sm">Key performance indicators</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div *ngFor="let item of data" 
               class="group p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-3">
                <span class="text-lg">{{ item.icon }}</span>
                <span class="text-white/80 font-medium">{{ item.label }}</span>
              </div>
              <div class="flex items-center space-x-4">
                <span class="font-bold text-white text-lg">{{ item.value }}</span>
                <span [class]="'px-3 py-1 rounded-full text-xs font-bold ' + (item.positive ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 'bg-red-500/20 text-red-300 border border-red-400/30')">
                  {{ item.change }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./gri-performance.component.css'],
  imports:[CommonModule],

})
export class GriPerformanceComponent {
  @Input() data: GriPerformanceItem[] = [];
  @Input() mounted = false;
}
