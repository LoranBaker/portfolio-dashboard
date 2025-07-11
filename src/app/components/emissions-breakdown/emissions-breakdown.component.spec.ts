import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionsBreakdownComponent } from './emissions-breakdown.component';

describe('EmissionsBreakdownComponent', () => {
  let component: EmissionsBreakdownComponent;
  let fixture: ComponentFixture<EmissionsBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionsBreakdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmissionsBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
