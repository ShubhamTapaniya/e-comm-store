import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userloggedin = localStorage.getItem('userloginkey');
  if(userloggedin){
    return true;
  }else{
    alert('You must login to access this page');
    router.navigate(['/login']);
    return false;
  }
};
