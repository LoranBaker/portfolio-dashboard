// metric-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metric-card',
  template: `
    <div 
      class="group relative overflow-hidden backdrop-blur-2xl bg-gradient-to-br rounded-3xl border border-white/30 hover:border-white/50 transition-all duration-700 hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl h-32 min-h-[8rem]"
      [class]="gradient + ' ' + (mounted ? 'animate-fade-in-up' : 'opacity-0')"
      [style.animation-delay.ms]="delay"
      (mouseenter)="onHover(true)"
      (mouseleave)="onHover(false)">
      
      <!-- Animated background gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <!-- Floating particles effect -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute w-2 h-2 bg-white/30 rounded-full animate-float-1 opacity-0 group-hover:opacity-100"></div>
        <div class="absolute w-1 h-1 bg-white/40 rounded-full animate-float-2 opacity-0 group-hover:opacity-100"></div>
        <div class="absolute w-3 h-3 bg-white/20 rounded-full animate-float-3 opacity-0 group-hover:opacity-100"></div>
      </div>

      <div class="relative p-4 h-full flex flex-col justify-between">
        <div class="flex items-start justify-between mb-2">
          <div class="text-xs font-medium text-white/90 leading-tight">{{ title }}</div>
          <div *ngIf="icon" class="text-white/70 text-lg">{{ icon }}</div>
        </div>
        <div class="space-y-1">
          <div class="text-xl font-bold text-white tracking-tight">{{ value }}</div>
          <div *ngIf="subtitle" class="text-xs text-white/70 font-medium">{{ subtitle }}</div>
          <div *ngIf="trend" 
               class="text-xs font-semibold px-2 py-1 rounded-full inline-block"
               [class]="trend.startsWith('+') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'">
            {{ trend }}
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./metric-card.component.css'],
  imports: [CommonModule]
})
export class MetricCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() subtitle = '';
  @Input() gradient = '';
  @Input() icon = '';
  @Input() trend = '';
  @Input() mounted = false;
  @Input() delay = 0;

  onHover(isHovered: boolean): void {
    // Handle hover events if needed
  }
}
