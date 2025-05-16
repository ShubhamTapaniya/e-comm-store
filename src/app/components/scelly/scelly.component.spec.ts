import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScellyComponent } from './scelly.component';

describe('ScellyComponent', () => {
  let component: ScellyComponent;
  let fixture: ComponentFixture<ScellyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScellyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScellyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
