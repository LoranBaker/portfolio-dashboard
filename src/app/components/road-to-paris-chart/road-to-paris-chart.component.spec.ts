import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadToParisChartComponent } from './road-to-paris-chart.component';

describe('RoadToParisChartComponent', () => {
  let component: RoadToParisChartComponent;
  let fixture: ComponentFixture<RoadToParisChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadToParisChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadToParisChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
