import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AddtocartService } from '../services/addtocart.service';
import { map } from 'rxjs';

export const protectorGuard: CanActivateFn = (route, state) => {
  let cartservice = inject(AddtocartService);
  let router = inject(Router);
  return cartservice.get_cart().pipe(
    map((data) => {
      if (data.length > 0) {
        return true;
      } else {
        alert('🛒 Add products in cart first.');
        router.navigate(['/cart']);
        return false;
      }
    })
  );
};
