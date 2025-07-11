import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonTaxTimelineComponent } from './carbon-tax-timeline.component';

describe('CarbonTaxTimelineComponent', () => {
  let component: CarbonTaxTimelineComponent;
  let fixture: ComponentFixture<CarbonTaxTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarbonTaxTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbonTaxTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
