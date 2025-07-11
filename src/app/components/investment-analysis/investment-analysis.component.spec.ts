import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentAnalysisComponent } from './investment-analysis.component';

describe('InvestmentAnalysisComponent', () => {
  let component: InvestmentAnalysisComponent;
  let fixture: ComponentFixture<InvestmentAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
