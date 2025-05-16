import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const sellerLoggedIn = localStorage.getItem('sellerloginkey');
    if (sellerLoggedIn) {
      return true;
    } else {
      alert('You must login to access this page');
      this.router.navigate(['/seller-login']);
      return false;
    }
  }
}
