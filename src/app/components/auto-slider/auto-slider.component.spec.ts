import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSliderComponent } from './auto-slider.component';

describe('AutoSliderComponent', () => {
  let component: AutoSliderComponent;
  let fixture: ComponentFixture<AutoSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
