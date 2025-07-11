import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyVisualizationComponent } from './strategy-visualization.component';

describe('StrategyVisualizationComponent', () => {
  let component: StrategyVisualizationComponent;
  let fixture: ComponentFixture<StrategyVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategyVisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategyVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
