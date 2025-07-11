import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoiEconomicsComponent } from './roi-economics.component';

describe('RoiEconomicsComponent', () => {
  let component: RoiEconomicsComponent;
  let fixture: ComponentFixture<RoiEconomicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoiEconomicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoiEconomicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
