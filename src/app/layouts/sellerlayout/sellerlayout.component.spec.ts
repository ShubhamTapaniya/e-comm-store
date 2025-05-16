import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerlayoutComponent } from './sellerlayout.component';

describe('SellerlayoutComponent', () => {
  let component: SellerlayoutComponent;
  let fixture: ComponentFixture<SellerlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerlayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
