import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { protectorGuard } from './protector.guard';

describe('protectorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => protectorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
