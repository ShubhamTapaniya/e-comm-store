import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOrderComponent } from './order-list.component';

describe('TrackOrderComponent', () => {
  let component: TrackOrderComponent;
  let fixture: ComponentFixture<TrackOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
