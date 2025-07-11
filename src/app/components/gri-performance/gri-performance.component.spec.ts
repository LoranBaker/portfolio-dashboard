import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GriPerformanceComponent } from './gri-performance.component';

describe('GriPerformanceComponent', () => {
  let component: GriPerformanceComponent;
  let fixture: ComponentFixture<GriPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GriPerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GriPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
